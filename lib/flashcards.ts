import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { newSrsState, schedule, todayStr, type Grade, type SrsState } from "./srs";

export { todayStr } from "./srs";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "flashcards.json");

export interface Card {
  id: string;
  lesson: string;
  front: string; // inglés
  back: string; // español
  example: string;
  createdAt: string;
  srs: SrsState;
}

export interface ReviewLogEntry {
  id: string;
  cardId: string;
  date: string; // yyyy-mm-dd
  grade: Grade;
  createdAt: string;
}

export interface FlashcardsData {
  cards: Card[];
  reviews: ReviewLogEntry[];
}

export const KNOWN_LESSONS = [
  "Lesson 1 - Let's Warm Up",
  "Lesson 2 - Introductions",
  "Lesson 3",
  "Lesson 4 - My Activities",
  "Lesson 5 - Revision",
  "Lesson 7 - Food II",
  "Lesson 8 - Money",
  "Lesson 9 - Home",
];

const EMPTY_DATA: FlashcardsData = { cards: [], reviews: [] };

async function readData(): Promise<FlashcardsData> {
  if (!existsSync(DATA_FILE)) {
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(DATA_FILE, `${JSON.stringify(EMPTY_DATA, null, 2)}\n`, "utf-8");
    return structuredClone(EMPTY_DATA);
  }
  const raw = JSON.parse(await readFile(DATA_FILE, "utf-8")) as Partial<FlashcardsData>;
  return { cards: raw.cards ?? [], reviews: raw.reviews ?? [] };
}

async function writeData(data: FlashcardsData): Promise<void> {
  await writeFile(DATA_FILE, `${JSON.stringify(data, null, 2)}\n`, "utf-8");
}

// Cola en memoria para serializar toda lectura-modificación-escritura de
// flashcards.json contra otras -- sin esto, dos pedidos casi simultáneos (ej.
// calificar una tarjeta mientras se agrega otra) pueden leer el mismo estado
// antes de que ninguno haya escrito, y el segundo en escribir pisa el
// archivo entero con su copia vieja, perdiendo el cambio del primero.
let colaFlashcards: Promise<unknown> = Promise.resolve();
function actualizarFlashcards<T>(mutar: (data: FlashcardsData) => T): Promise<T> {
  const tarea = colaFlashcards.then(async () => {
    const data = await readData();
    const resultado = mutar(data);
    await writeData(data);
    return resultado;
  });
  colaFlashcards = tarea.catch(() => {});
  return tarea;
}

export async function getFlashcardsData(): Promise<FlashcardsData> {
  return readData();
}

// ---------- Cards ----------

export interface CardInput {
  lesson: string;
  front: string;
  back: string;
  example?: string;
}

export async function createCard(input: CardInput): Promise<Card> {
  const lesson = input.lesson.trim();
  const front = input.front.trim();
  const back = input.back.trim();
  if (!lesson) throw new Error("Elegí o escribí una lección.");
  if (!front) throw new Error("Falta la palabra o frase en inglés.");
  if (!back) throw new Error("Falta la traducción.");

  return actualizarFlashcards((data) => {
    const card: Card = {
      id: randomUUID(),
      lesson,
      front,
      back,
      example: input.example?.trim() ?? "",
      createdAt: new Date().toISOString(),
      srs: newSrsState(todayStr()),
    };
    data.cards.push(card);
    return card;
  });
}

export interface CardUpdateInput {
  lesson?: string;
  front?: string;
  back?: string;
  example?: string;
}

export async function updateCard(id: string, input: CardUpdateInput): Promise<Card> {
  return actualizarFlashcards((data) => {
    const card = data.cards.find((c) => c.id === id);
    if (!card) throw new Error("La tarjeta no existe.");

    if (input.lesson !== undefined) {
      const lesson = input.lesson.trim();
      if (!lesson) throw new Error("Elegí o escribí una lección.");
      card.lesson = lesson;
    }
    if (input.front !== undefined) {
      const front = input.front.trim();
      if (!front) throw new Error("Falta la palabra o frase en inglés.");
      card.front = front;
    }
    if (input.back !== undefined) {
      const back = input.back.trim();
      if (!back) throw new Error("Falta la traducción.");
      card.back = back;
    }
    if (input.example !== undefined) {
      card.example = input.example.trim();
    }

    return card;
  });
}

export async function deleteCard(id: string): Promise<void> {
  await actualizarFlashcards((data) => {
    if (!data.cards.some((c) => c.id === id)) throw new Error("La tarjeta no existe.");
    data.cards = data.cards.filter((c) => c.id !== id);
    data.reviews = data.reviews.filter((r) => r.cardId !== id);
  });
}

// ---------- Reviews ----------

export async function recordReview(cardId: string, grade: Grade): Promise<Card> {
  return actualizarFlashcards((data) => {
    const card = data.cards.find((c) => c.id === cardId);
    if (!card) throw new Error("La tarjeta no existe.");

    const today = todayStr();
    card.srs = schedule(card.srs, grade, today);

    const entry: ReviewLogEntry = {
      id: randomUUID(),
      cardId,
      date: today,
      grade,
      createdAt: new Date().toISOString(),
    };
    data.reviews.push(entry);

    return card;
  });
}

// ---------- Derived helpers ----------

export function dueCards(cards: Card[], today = todayStr()): Card[] {
  return cards.filter((c) => c.srs.dueDate <= today);
}

export function isNewCard(card: Card): boolean {
  return card.srs.repetitions === 0 && card.srs.lastReviewed === null;
}

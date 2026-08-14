"use client";

// Guardado 100% en el navegador (localStorage), sin servidor ni base de
// datos: antes esto vivía en el filesystem (data/flashcards.json, leído y
// escrito por 3 rutas de API), pero un hosting serverless (Vercel) no da un
// filesystem escritible persistente entre pedidos -- las tarjetas se
// "guardaban" y se perdían al toque. Este proyecto es de un solo usuario, así
// que localStorage alcanza: sin red, sin carrera entre pedidos concurrentes
// (todo corre en la misma pestaña, sincrónico), sin necesidad de la cola en
// memoria que tenía la versión de archivo. Contra: el progreso queda por
// navegador/dispositivo, no se sincroniza entre varios.
import { newSrsState, schedule, todayStr, type Grade } from "./srs";
import type { Card, CardInput, CardUpdateInput, FlashcardsData } from "./flashcards";

const STORAGE_KEY = "ingles-flashcards:data:v1";

const EMPTY_DATA: FlashcardsData = { cards: [], reviews: [] };

function readData(): FlashcardsData {
  if (typeof window === "undefined") return structuredClone(EMPTY_DATA);
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(EMPTY_DATA);
    const parsed = JSON.parse(raw) as Partial<FlashcardsData>;
    return { cards: parsed.cards ?? [], reviews: parsed.reviews ?? [] };
  } catch {
    // localStorage corrupto/inaccesible (modo privado en algunos navegadores
    // puede tirar SecurityError al leer): se sigue como si no hubiera datos
    // en vez de romper la página entera.
    return structuredClone(EMPTY_DATA);
  }
}

function writeData(data: FlashcardsData): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getFlashcardsData(): FlashcardsData {
  return readData();
}

// ---------- Cards ----------

export function createCard(input: CardInput): Card {
  const lesson = input.lesson.trim();
  const front = input.front.trim();
  const back = input.back.trim();
  if (!lesson) throw new Error("Elegí o escribí una lección.");
  if (!front) throw new Error("Falta la palabra o frase en inglés.");
  if (!back) throw new Error("Falta la traducción.");

  const data = readData();
  const card: Card = {
    id: crypto.randomUUID(),
    lesson,
    front,
    back,
    example: input.example?.trim() ?? "",
    createdAt: new Date().toISOString(),
    srs: newSrsState(todayStr()),
  };
  data.cards.push(card);
  writeData(data);
  return card;
}

export function updateCard(id: string, input: CardUpdateInput): Card {
  const data = readData();
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

  writeData(data);
  return card;
}

export function deleteCard(id: string): void {
  const data = readData();
  if (!data.cards.some((c) => c.id === id)) throw new Error("La tarjeta no existe.");
  data.cards = data.cards.filter((c) => c.id !== id);
  data.reviews = data.reviews.filter((r) => r.cardId !== id);
  writeData(data);
}

// ---------- Reviews ----------

export function recordReview(cardId: string, grade: Grade): Card {
  const data = readData();
  const card = data.cards.find((c) => c.id === cardId);
  if (!card) throw new Error("La tarjeta no existe.");

  const today = todayStr();
  card.srs = schedule(card.srs, grade, today);

  const entry = {
    id: crypto.randomUUID(),
    cardId,
    date: today,
    grade,
    createdAt: new Date().toISOString(),
  };
  data.reviews.push(entry);

  writeData(data);
  return card;
}

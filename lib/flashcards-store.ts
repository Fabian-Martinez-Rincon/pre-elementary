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
import { useSyncExternalStore } from "react";
import { newSrsState, schedule, todayStr, type Grade } from "./srs";
import type { Card, CardInput, CardUpdateInput, FlashcardsData } from "./flashcards";
import seedData from "@/data/flashcards.json";

const STORAGE_KEY = "ingles-flashcards:data:v1";
const EMPTY_DATA: FlashcardsData = { cards: [], reviews: [] };
// Vocabulario real de las clases (lecciones 1, 2, 3, 7, 8, 9 y 10), extraído
// de los materiales de ICLP School of English. Solo se usa como punto de
// partida la primera vez que se abre la app en un navegador sin datos
// guardados todavía -- nunca pisa progreso real ya existente (ver
// loadFromStorage: el fallback al seed ocurre únicamente cuando no hay nada
// en localStorage).
const SEED_DATA = seedData as FlashcardsData;

function loadFromStorage(): FlashcardsData {
  if (typeof window === "undefined") return EMPTY_DATA;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return SEED_DATA;
    const parsed = JSON.parse(raw) as Partial<FlashcardsData>;
    return { cards: parsed.cards ?? [], reviews: parsed.reviews ?? [] };
  } catch {
    // localStorage corrupto/inaccesible (modo privado en algunos navegadores
    // puede tirar SecurityError al leer): se sigue como si no hubiera datos
    // en vez de romper la página entera.
    return EMPTY_DATA;
  }
}

// Fuente de verdad en memoria (single-tab, ver comentario de arriba),
// persistida en localStorage en cada mutación. useSyncExternalStore la
// expone a React sin el clásico "useState(null) + useEffect para cargar":
// durante SSR y la primera pasada de hidratación siempre se ve EMPTY_DATA
// (getServerSnapshot), y recién después del mount React pasa a leer `state`
// en vivo -- sin warning de mismatch, y con TODAS las secciones (que ahora
// viven juntas en una sola página, ver app/page.tsx) re-renderizando solas
// cuando cualquiera de ellas escribe.
let state: FlashcardsData = loadFromStorage();
const listeners = new Set<() => void>();

function setState(next: FlashcardsData): void {
  state = next;
  if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): FlashcardsData {
  return state;
}

function getServerSnapshot(): FlashcardsData {
  return EMPTY_DATA;
}

export function useFlashcardsData(): FlashcardsData {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function getFlashcardsData(): FlashcardsData {
  return state;
}

// ---------- Cards ----------

export function createCard(input: CardInput): Card {
  const lesson = input.lesson.trim();
  const front = input.front.trim();
  const back = input.back.trim();
  if (!lesson) throw new Error("Elegí o escribí una lección.");
  if (!front) throw new Error("Falta la palabra o frase en inglés.");
  if (!back) throw new Error("Falta la traducción.");

  const card: Card = {
    id: crypto.randomUUID(),
    lesson,
    front,
    back,
    example: input.example?.trim() ?? "",
    createdAt: new Date().toISOString(),
    srs: newSrsState(todayStr()),
  };
  setState({ ...state, cards: [...state.cards, card] });
  return card;
}

export function updateCard(id: string, input: CardUpdateInput): Card {
  const existing = state.cards.find((c) => c.id === id);
  if (!existing) throw new Error("La tarjeta no existe.");

  const updated: Card = { ...existing };
  if (input.lesson !== undefined) {
    const lesson = input.lesson.trim();
    if (!lesson) throw new Error("Elegí o escribí una lección.");
    updated.lesson = lesson;
  }
  if (input.front !== undefined) {
    const front = input.front.trim();
    if (!front) throw new Error("Falta la palabra o frase en inglés.");
    updated.front = front;
  }
  if (input.back !== undefined) {
    const back = input.back.trim();
    if (!back) throw new Error("Falta la traducción.");
    updated.back = back;
  }
  if (input.example !== undefined) {
    updated.example = input.example.trim();
  }

  setState({ ...state, cards: state.cards.map((c) => (c.id === id ? updated : c)) });
  return updated;
}

export function deleteCard(id: string): void {
  if (!state.cards.some((c) => c.id === id)) throw new Error("La tarjeta no existe.");
  setState({
    cards: state.cards.filter((c) => c.id !== id),
    reviews: state.reviews.filter((r) => r.cardId !== id),
  });
}

// ---------- Reviews ----------

export function recordReview(cardId: string, grade: Grade): Card {
  const existing = state.cards.find((c) => c.id === cardId);
  if (!existing) throw new Error("La tarjeta no existe.");

  const today = todayStr();
  const updated: Card = { ...existing, srs: schedule(existing.srs, grade, today) };
  const entry = {
    id: crypto.randomUUID(),
    cardId,
    date: today,
    grade,
    createdAt: new Date().toISOString(),
  };

  setState({
    cards: state.cards.map((c) => (c.id === cardId ? updated : c)),
    reviews: [...state.reviews, entry],
  });
  return updated;
}

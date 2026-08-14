import { todayStr, type Grade, type SrsState } from "./srs";

export { todayStr } from "./srs";

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
  "Lesson 10 - Review",
];

export interface CardInput {
  lesson: string;
  front: string;
  back: string;
  example?: string;
}

export interface CardUpdateInput {
  lesson?: string;
  front?: string;
  back?: string;
  example?: string;
}

// ---------- Derived helpers ----------
// Puras (sin I/O): usadas tanto por lib/flashcards-store.ts (localStorage,
// solo cliente) como por lib/stats.ts.

export function dueCards(cards: Card[], today = todayStr()): Card[] {
  return cards.filter((c) => c.srs.dueDate <= today);
}

export function isNewCard(card: Card): boolean {
  return card.srs.repetitions === 0 && card.srs.lastReviewed === null;
}

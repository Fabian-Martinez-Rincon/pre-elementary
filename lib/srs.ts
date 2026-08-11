export type Grade = "again" | "hard" | "good" | "easy";

export interface SrsState {
  dueDate: string; // yyyy-mm-dd
  interval: number; // days
  repetitions: number;
  easeFactor: number;
  lastReviewed: string | null; // yyyy-mm-dd
}

const GRADE_QUALITY: Record<Grade, number> = {
  again: 0,
  hard: 3,
  good: 4,
  easy: 5,
};

export const DEFAULT_EASE_FACTOR = 2.5;
export const MIN_EASE_FACTOR = 1.3;

export function newSrsState(today: string): SrsState {
  return { dueDate: today, interval: 0, repetitions: 0, easeFactor: DEFAULT_EASE_FACTOR, lastReviewed: null };
}

export function addDays(date: string, days: number): string {
  const d = new Date(`${date}T00:00:00`);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

// SM-2 (SuperMemo 2), the algorithm behind Anki-style spaced repetition.
export function schedule(state: SrsState, grade: Grade, today: string): SrsState {
  const quality = GRADE_QUALITY[grade];

  let { repetitions, easeFactor } = state;
  let interval: number;

  if (quality < 3) {
    repetitions = 0;
    interval = 1;
  } else {
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else interval = Math.round(state.interval * easeFactor);
    repetitions += 1;
  }

  easeFactor = Math.max(MIN_EASE_FACTOR, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));

  return {
    dueDate: addDays(today, interval),
    interval,
    repetitions,
    easeFactor: Math.round(easeFactor * 100) / 100,
    lastReviewed: today,
  };
}

export const GRADE_LABELS: Record<Grade, string> = {
  again: "De nuevo",
  hard: "Difícil",
  good: "Bien",
  easy: "Fácil",
};

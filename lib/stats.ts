import type { Card, ReviewLogEntry } from "./flashcards";
import { addDays, todayStr } from "./srs";

export interface DayCount {
  date: string;
  count: number;
}

export function reviewsPerDay(reviews: ReviewLogEntry[], days: number): DayCount[] {
  const today = todayStr();
  const counts = new Map<string, number>();
  for (const r of reviews) counts.set(r.date, (counts.get(r.date) ?? 0) + 1);

  const out: DayCount[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = addDays(today, -i);
    out.push({ date, count: counts.get(date) ?? 0 });
  }
  return out;
}

export function retentionRate(reviews: ReviewLogEntry[]): number | null {
  if (reviews.length === 0) return null;
  const remembered = reviews.filter((r) => r.grade !== "again").length;
  return Math.round((remembered / reviews.length) * 100);
}

export function computeStreak(reviews: ReviewLogEntry[]): { current: number; longest: number } {
  const days = Array.from(new Set(reviews.map((r) => r.date))).sort();
  if (days.length === 0) return { current: 0, longest: 0 };

  let longest = 1;
  let run = 1;
  for (let i = 1; i < days.length; i++) {
    if (addDays(days[i - 1], 1) === days[i]) {
      run += 1;
      longest = Math.max(longest, run);
    } else {
      run = 1;
    }
  }

  const today = todayStr();
  const daySet = new Set(days);
  let current = 0;
  let cursor = daySet.has(today) ? today : addDays(today, -1);
  while (daySet.has(cursor)) {
    current += 1;
    cursor = addDays(cursor, -1);
  }

  return { current, longest };
}

export interface LessonSummary {
  lesson: string;
  total: number;
  due: number;
  learned: number; // repetitions > 0
}

export function cardsByLesson(cards: Card[], today = todayStr()): LessonSummary[] {
  const map = new Map<string, LessonSummary>();
  for (const c of cards) {
    const entry = map.get(c.lesson) ?? { lesson: c.lesson, total: 0, due: 0, learned: 0 };
    entry.total += 1;
    if (c.srs.dueDate <= today) entry.due += 1;
    if (c.srs.repetitions > 0) entry.learned += 1;
    map.set(c.lesson, entry);
  }
  return Array.from(map.values()).sort((a, b) => a.lesson.localeCompare(b.lesson, "es"));
}

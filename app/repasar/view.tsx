"use client";

import { useState } from "react";
import type { Card as CardType } from "@/lib/flashcards";
import { GRADE_LABELS, type Grade } from "@/lib/srs";
import { Button, Card } from "@/app/_components/ui";

const GRADE_ORDER: Grade[] = ["again", "hard", "good", "easy"];
const GRADE_COLOR: Record<Grade, string> = {
  again: "var(--danger)",
  hard: "var(--gold)",
  good: "var(--line-strong)",
  easy: "var(--success)",
};

export function RepasarView({ initialCards }: { initialCards: CardType[] }) {
  // Barajamos una sola vez, en el cliente, para no repasar siempre en el mismo orden.
  const [queue] = useState(() => [...initialCards].sort(() => Math.random() - 0.5));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [reviewed, setReviewed] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const card = queue[index];
  const done = index >= queue.length;

  async function grade(g: Grade) {
    if (!card || submitting) return;
    setSubmitting(true);
    try {
      await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardId: card.id, grade: g }),
      });
    } finally {
      setReviewed((n) => n + 1);
      setFlipped(false);
      setIndex((i) => i + 1);
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <Card>
        <div className="flex flex-col items-center gap-2 py-6 text-center">
          <span className="text-3xl">✅</span>
          <p className="text-base font-semibold text-foreground">¡Sesión terminada!</p>
          <p className="text-sm text-(--ink-faint)">Repasaste {reviewed} tarjeta{reviewed === 1 ? "" : "s"}.</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="text-xs text-(--ink-faint)">
        {index + 1} / {queue.length} · {card.lesson}
      </div>

      <div className={`flip-card h-56 cursor-pointer ${flipped ? "flipped" : ""}`} onClick={() => setFlipped((f) => !f)}>
        <div className="flip-card-inner relative h-full w-full">
          <div className="flip-card-face absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-(--radius) border border-(--line) bg-(--bg-elevated) p-6 text-center shadow-(--shadow)">
            <span className="text-2xl font-semibold text-foreground">{card.front}</span>
            <span className="text-xs text-(--ink-faint)">Tocá para ver la traducción</span>
          </div>
          <div className="flip-card-face flip-card-back absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-(--radius) border border-(--brand) bg-(--bg-elevated) p-6 text-center shadow-(--shadow)">
            <span className="text-2xl font-semibold text-foreground">{card.back}</span>
            {card.example && <span className="text-sm italic text-(--ink-dim)">&ldquo;{card.example}&rdquo;</span>}
          </div>
        </div>
      </div>

      {flipped ? (
        <div className="grid grid-cols-4 gap-2">
          {GRADE_ORDER.map((g) => (
            <Button
              key={g}
              type="button"
              variant="secondary"
              disabled={submitting}
              onClick={() => grade(g)}
              style={{ borderColor: GRADE_COLOR[g], color: GRADE_COLOR[g] }}
            >
              {GRADE_LABELS[g]}
            </Button>
          ))}
        </div>
      ) : (
        <Button type="button" onClick={() => setFlipped(true)} className="w-fit self-center">
          Mostrar traducción
        </Button>
      )}
    </div>
  );
}

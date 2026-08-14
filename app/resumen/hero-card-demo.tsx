"use client";

import { useState } from "react";
import { useFlashcardsData } from "@/lib/flashcards-store";

// Deja probar el mecanismo central de la app (dar vuelta una tarjeta) en el
// primer segundo, sin scrollear a Repasar -- "mostrar, no contar".
export function HeroCardDemo() {
  const data = useFlashcardsData();
  const [seed] = useState(() => Math.floor(Math.random() * 100000));
  const [flipped, setFlipped] = useState(false);

  const pool = data.cards.filter((c) => c.example);
  const card = pool.length > 0 ? pool[seed % pool.length] : null;

  if (!card) return null;

  function toggle() {
    setFlipped((f) => !f);
  }

  return (
    <div className="w-full max-w-[17rem] shrink-0">
      <div
        role="button"
        tabIndex={0}
        aria-label={flipped ? `Traducción: ${card!.back}` : `Tarjeta: ${card!.front}. Tocá para ver la traducción.`}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        }}
        className={`flip-card h-44 cursor-pointer outline-none ${flipped ? "flipped" : ""}`}
      >
        <div className="flip-card-inner relative h-full w-full">
          <div className="flip-card-face absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-(--radius) border border-(--line) bg-(--bg-elevated) p-5 text-center shadow-(--shadow)">
            <span className="text-xl font-semibold text-foreground">{card.front}</span>
            <span className="text-xs text-(--ink-faint)">Tocá para ver la traducción</span>
          </div>
          <div className="flip-card-face flip-card-back absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-(--radius) border border-(--brand) bg-(--bg-elevated) p-5 text-center shadow-(--shadow)">
            <span className="text-xl font-semibold text-foreground">{card.back}</span>
            {card.example && <span className="text-xs text-(--ink-dim) italic">&ldquo;{card.example}&rdquo;</span>}
          </div>
        </div>
      </div>
      <p className="mt-2 text-center text-xs text-(--ink-faint)">Así se repasa una tarjeta — probala vos.</p>
    </div>
  );
}

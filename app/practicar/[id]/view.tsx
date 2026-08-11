"use client";

import { useState } from "react";
import Link from "next/link";
import type { Scenario } from "@/lib/scenarios";
import { Button, Card, Field, inputClass } from "@/app/_components/ui";

export function PracticarView({ scenario }: { scenario: Scenario }) {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);

  const step = scenario.steps[index];
  const isLast = index === scenario.steps.length - 1;

  function next() {
    if (isLast) {
      setDone(true);
      return;
    }
    setIndex((i) => i + 1);
    setAnswer("");
    setRevealed(false);
  }

  function restart() {
    setIndex(0);
    setAnswer("");
    setRevealed(false);
    setDone(false);
  }

  if (done) {
    return (
      <Card>
        <div className="flex flex-col items-center gap-3 py-6 text-center">
          <span className="text-3xl">🎉</span>
          <p className="text-base font-semibold text-foreground">¡Terminaste el simulacro!</p>
          <p className="text-sm text-(--ink-faint)">Practicá de nuevo cuando quieras, o volvé a la lista de simulacros.</p>
          <div className="flex gap-2">
            <Button onClick={restart}>Practicar de nuevo</Button>
            <Link href="/practicar">
              <Button variant="secondary">Volver</Button>
            </Link>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="text-xs text-(--ink-faint)">
        Paso {index + 1} / {scenario.steps.length}
      </div>

      <Card>
        <div className="flex flex-col gap-1">
          <span className="text-xl font-semibold text-foreground">{step.prompt}</span>
          <span className="text-sm text-(--ink-faint)">{step.promptTranslation}</span>
        </div>

        <div className="mt-4">
          <Field label="Tu respuesta">
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={2}
              className={inputClass}
              placeholder="Escribí tu respuesta en inglés…"
            />
          </Field>
        </div>

        {revealed ? (
          <div className="mt-3 rounded-(--radius) border border-(--brand) bg-(--bg-sunken) p-3 text-sm">
            <div className="text-(--ink-faint)">{step.hint}</div>
            <div className="mt-1 font-medium text-foreground">&ldquo;{step.example}&rdquo;</div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="-mx-2 mt-3 w-fit rounded-md px-2 py-2 text-xs font-medium text-(--brand) hover:underline"
          >
            Ver respuesta modelo
          </button>
        )}
      </Card>

      <Button onClick={next} className="w-fit self-end">
        {isLast ? "Terminar" : "Siguiente"}
      </Button>
    </div>
  );
}

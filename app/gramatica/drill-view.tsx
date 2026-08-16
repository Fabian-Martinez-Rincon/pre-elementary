"use client";

import { useState } from "react";
import type { Drill, DrillQuestion } from "@/lib/drills";
import { Button, Card, ProgressBar } from "@/app/_components/ui";

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

export function DrillView({ drill, onBack }: { drill: Drill; onBack: () => void }) {
  const [questions] = useState<DrillQuestion[]>(() => shuffle(drill.questions));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);

  const question = questions[index];
  const isLast = index === questions.length - 1;
  const isCorrect = selected === question?.answer;

  function choose(option: string) {
    if (selected) return; // ya respondió esta pregunta
    setSelected(option);
    if (option === question.answer) setCorrectCount((n) => n + 1);
  }

  function next() {
    if (isLast) {
      setDone(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setCorrectCount(0);
    setDone(false);
  }

  if (done) {
    return (
      <Card>
        <div className="flex flex-col items-center gap-3 py-6 text-center">
          <span className="text-3xl">{correctCount === questions.length ? "🎉" : "💪"}</span>
          <p className="text-base font-semibold text-foreground">
            {correctCount} / {questions.length} correctas
          </p>
          <div className="flex gap-2">
            <Button onClick={restart}>Practicar de nuevo</Button>
            <Button variant="secondary" onClick={onBack}>
              Volver
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <div className="text-xs text-(--ink-faint)">
          Pregunta {index + 1} / {questions.length} · {correctCount} correctas
        </div>
        <ProgressBar pct={((index + 1) / questions.length) * 100} />
      </div>

      <Card>
        <div className="flex flex-col gap-1">
          <span className="text-xl font-semibold text-foreground">{question.prompt}</span>
          <span className="text-sm text-(--ink-faint)">{question.translation}</span>
        </div>

        <div className={`mt-4 grid gap-2 ${question.options.length > 3 ? "grid-cols-2" : "grid-cols-3"}`}>
          {question.options.map((opt) => {
            const isSelected = selected === opt;
            const showAsCorrect = selected && opt === question.answer;
            const showAsWrong = isSelected && opt !== question.answer;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => choose(opt)}
                disabled={!!selected}
                className="rounded-(--radius) border px-3 py-3 text-sm font-semibold transition disabled:cursor-not-allowed"
                style={{
                  borderColor: showAsCorrect ? "var(--success)" : showAsWrong ? "var(--danger)" : "var(--line)",
                  backgroundColor: showAsCorrect ? "var(--success-bg)" : showAsWrong ? "var(--danger-bg)" : "var(--bg-elevated)",
                  color: showAsCorrect ? "var(--success)" : showAsWrong ? "var(--danger)" : "var(--ink)",
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {selected && (
          <p className="mt-3 text-sm" style={{ color: isCorrect ? "var(--success)" : "var(--danger)" }}>
            {isCorrect ? "¡Correcto!" : `Incorrecto — la respuesta es "${question.answer}".`}
          </p>
        )}
      </Card>

      {selected && (
        <Button onClick={next} className="w-fit self-end">
          {isLast ? "Terminar" : "Siguiente"}
        </Button>
      )}
    </div>
  );
}

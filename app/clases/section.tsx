"use client";

import { KNOWN_LESSONS, todayStr } from "@/lib/flashcards";
import { useFlashcardsData } from "@/lib/flashcards-store";
import { cardsByLesson } from "@/lib/stats";
import { Card, EmptyState } from "@/app/_components/ui";

export function ClasesSection({ onSelectLesson }: { onSelectLesson: (lesson: string) => void }) {
  const data = useFlashcardsData();
  const today = todayStr();
  const summaries = cardsByLesson(data.cards, today);
  const summaryMap = new Map(summaries.map((s) => [s.lesson, s]));

  // Mostramos primero las lecciones conocidas en su orden natural, y después
  // cualquier lección "custom" que el usuario haya escrito a mano.
  const extraLessons = summaries.map((s) => s.lesson).filter((l) => !KNOWN_LESSONS.includes(l));
  const orderedLessons = [...KNOWN_LESSONS, ...extraLessons];

  return (
    <div className="mx-auto max-w-4xl px-3 lg:px-4">
      <h2 className="mb-1 text-xl font-bold text-foreground">Clases</h2>
      <p className="mb-4 text-sm text-(--ink-faint)">Vocabulario cargado por cada clase.</p>

      {data.cards.length === 0 ? (
        <EmptyState>
          Todavía no cargaste tarjetas.{" "}
          <a href="#tarjetas" className="font-medium text-(--brand) hover:underline">
            Empezá por acá
          </a>
          .
        </EmptyState>
      ) : (
        <div className="flex flex-col gap-2">
          {orderedLessons.map((lesson) => {
            const s = summaryMap.get(lesson);
            const total = s?.total ?? 0;
            return (
              <button key={lesson} type="button" onClick={() => onSelectLesson(lesson)} className="w-full text-left">
                <Card>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-foreground">{lesson}</span>
                    {total > 0 ? (
                      <span className="text-xs text-(--ink-faint)">
                        {s!.learned}/{s!.total} aprendidas · {s!.due} para repasar
                      </span>
                    ) : (
                      <span className="text-xs text-(--ink-faint)">Sin tarjetas todavía</span>
                    )}
                  </div>
                </Card>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

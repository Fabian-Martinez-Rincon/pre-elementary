"use client";

import { KNOWN_LESSONS, todayStr } from "@/lib/flashcards";
import { useFlashcardsData } from "@/lib/flashcards-store";
import { cardsByLesson } from "@/lib/stats";
import { Card, ChevronIcon, EmptyState, ProgressBar, SectionHeading } from "@/app/_components/ui";

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
      <SectionHeading
        eyebrow="Por clase"
        eyebrowColor="var(--accent-clases)"
        title="Clases"
        subtitle="Vocabulario cargado por cada clase."
      />

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
            const pct = total > 0 ? Math.round((s!.learned / s!.total) * 100) : 0;
            return (
              <button
                key={lesson}
                type="button"
                onClick={() => onSelectLesson(lesson)}
                className={`w-full text-left ${total === 0 ? "opacity-60" : ""}`}
              >
                <Card interactive>
                  <div className="flex items-center gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-foreground">{lesson}</span>
                        <span className="shrink-0 text-xs text-(--ink-faint)">
                          {total > 0 ? `${s!.learned}/${s!.total} aprendidas · ${s!.due} para repasar` : "Sin tarjetas todavía"}
                        </span>
                      </div>
                      {total > 0 && <ProgressBar pct={pct} className="mt-2" />}
                    </div>
                    <ChevronIcon className="-rotate-90" />
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

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { KNOWN_LESSONS, todayStr, type FlashcardsData } from "@/lib/flashcards";
import { getFlashcardsData } from "@/lib/flashcards-store";
import { cardsByLesson } from "@/lib/stats";
import { Card, EmptyState } from "@/app/_components/ui";

export default function ClasesPage() {
  const [data, setData] = useState<FlashcardsData | null>(null);

  useEffect(() => {
    setData(getFlashcardsData());
  }, []);

  if (!data) return null;

  const today = todayStr();
  const summaries = cardsByLesson(data.cards, today);
  const summaryMap = new Map(summaries.map((s) => [s.lesson, s]));

  // Mostramos primero las lecciones conocidas en su orden natural, y después
  // cualquier lección "custom" que el usuario haya escrito a mano.
  const extraLessons = summaries.map((s) => s.lesson).filter((l) => !KNOWN_LESSONS.includes(l));
  const orderedLessons = [...KNOWN_LESSONS, ...extraLessons];

  return (
    <div className="mx-auto max-w-4xl px-3 py-4 lg:px-4">
      <h1 className="mb-1 text-xl font-bold text-foreground">Clases</h1>
      <p className="mb-4 text-sm text-(--ink-faint)">Vocabulario cargado por cada clase.</p>

      {data.cards.length === 0 ? (
        <EmptyState>
          Todavía no cargaste tarjetas.{" "}
          <Link href="/tarjetas" className="font-medium text-(--brand) hover:underline">
            Empezá por acá
          </Link>
          .
        </EmptyState>
      ) : (
        <div className="flex flex-col gap-2">
          {orderedLessons.map((lesson) => {
            const s = summaryMap.get(lesson);
            const total = s?.total ?? 0;
            return (
              <Link key={lesson} href={`/tarjetas?lesson=${encodeURIComponent(lesson)}`}>
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
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

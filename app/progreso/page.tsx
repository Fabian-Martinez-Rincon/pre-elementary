"use client";

import { useEffect, useState } from "react";
import type { FlashcardsData } from "@/lib/flashcards";
import { getFlashcardsData } from "@/lib/flashcards-store";
import { cardsByLesson, computeStreak, retentionRate, reviewsPerDay } from "@/lib/stats";
import { Card, EmptyState, StatTile } from "@/app/_components/ui";
import { BarChart } from "@/components/charts/BarChart";

export default function ProgresoPage() {
  const [data, setData] = useState<FlashcardsData | null>(null);

  useEffect(() => {
    setData(getFlashcardsData());
  }, []);

  if (!data) return null;

  const streak = computeStreak(data.reviews);
  const retention = retentionRate(data.reviews);
  const perDay = reviewsPerDay(data.reviews, 30);
  const lessons = cardsByLesson(data.cards);

  const chartData = perDay.map((d) => ({
    label: new Date(`${d.date}T00:00:00`).toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit" }),
    value: d.count,
  }));

  return (
    <div className="mx-auto max-w-4xl px-3 py-4 lg:px-4">
      <h1 className="mb-1 text-xl font-bold text-foreground">Progreso</h1>
      <p className="mb-4 text-sm text-(--ink-faint)">Cuánto repasaste y cuánto vas dominando cada lección.</p>

      {data.reviews.length === 0 ? (
        <EmptyState>Repasá tarjetas en la sección Repasar para empezar a ver estadísticas acá.</EmptyState>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatTile label="Racha actual" value={`${streak.current}d`} sub={`Récord: ${streak.longest}d`} />
            <StatTile label="Retención" value={retention !== null ? `${retention}%` : "—"} />
            <StatTile label="Repasos totales" value={String(data.reviews.length)} />
            <StatTile label="Tarjetas totales" value={String(data.cards.length)} />
          </div>

          <Card title="Repasos por día (últimos 30 días)">
            <BarChart data={chartData} valueFormat={(v) => String(Math.round(v))} />
          </Card>

          <Card title="Dominio por lección">
            {lessons.length === 0 ? (
              <p className="text-sm text-(--ink-faint)">Sin tarjetas todavía.</p>
            ) : (
              <ul className="flex flex-col gap-2">
                {lessons.map((l) => {
                  const pct = l.total > 0 ? Math.round((l.learned / l.total) * 100) : 0;
                  return (
                    <li key={l.lesson}>
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="text-foreground">{l.lesson}</span>
                        <span className="text-(--ink-faint)">
                          {l.learned}/{l.total}
                        </span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-(--bg-sunken)">
                        <div className="h-full rounded-full bg-(--brand)" style={{ width: `${pct}%` }} />
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}

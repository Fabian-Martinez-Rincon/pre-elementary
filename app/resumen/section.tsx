"use client";

import { dueCards, todayStr } from "@/lib/flashcards";
import { useFlashcardsData } from "@/lib/flashcards-store";
import { cardsByLesson, computeStreak, retentionRate } from "@/lib/stats";
import { Card, EmptyState, LinkButton, SectionHeading, StatTile } from "@/app/_components/ui";
import { HeroCardDemo } from "./hero-card-demo";

export function ResumenSection() {
  const data = useFlashcardsData();
  const today = todayStr();
  const due = dueCards(data.cards, today);
  const streak = computeStreak(data.reviews);
  const retention = retentionRate(data.reviews);
  const lessons = cardsByLesson(data.cards, today);

  return (
    <div className="mx-auto max-w-4xl px-3 lg:px-4">
      <div className="mb-10 flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex max-w-2xl flex-col gap-4">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-(--brand)">Proyecto personal</span>
          <h1 className="font-display max-w-2xl text-4xl leading-tight font-medium text-foreground italic sm:text-5xl">
            Aprendé inglés con el vocabulario real de tus propias clases.
          </h1>
          <p className="max-w-xl text-sm text-(--ink-dim) sm:text-base">
            Repetición espaciada (SM-2), simulacros de conversación, drills de gramática y seguimiento de progreso — todo en una sola página.
          </p>
          <div className="mt-1 flex flex-wrap gap-2">
            <LinkButton href={due.length > 0 ? "#repasar" : "#tarjetas"}>
              {due.length > 0 ? `Repasar ${due.length} tarjeta${due.length === 1 ? "" : "s"}` : "Agregar tarjetas"}
            </LinkButton>
            <LinkButton href="#progreso" variant="secondary">
              Ver progreso
            </LinkButton>
          </div>
        </div>
        <HeroCardDemo />
      </div>

      <SectionHeading
        eyebrow="De un vistazo"
        eyebrowColor="var(--brand)"
        title="Resumen"
        subtitle="Tu progreso de inglés, de un vistazo."
      />

      {data.cards.length === 0 ? (
        <EmptyState>
          Todavía no cargaste tarjetas.{" "}
          <a href="#tarjetas" className="font-medium text-(--brand) hover:underline">
            Agregá tu primera tarjeta
          </a>{" "}
          desde una de tus clases.
        </EmptyState>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatTile label="Para repasar hoy" value={String(due.length)} />
            <StatTile label="Tarjetas totales" value={String(data.cards.length)} />
            <StatTile label="Racha actual" value={`${streak.current}d`} sub={`Récord: ${streak.longest}d`} />
            <StatTile label="Retención" value={retention !== null ? `${retention}%` : "—"} sub={`${data.reviews.length} repasos`} />
          </div>

          <Card
            title={due.length > 0 ? `${due.length} tarjeta${due.length === 1 ? "" : "s"} lista${due.length === 1 ? "" : "s"} para repasar` : "Estás al día"}
          >
            {due.length > 0 ? (
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm text-(--ink-dim)">Dedicá unos minutos a repasar y afianzar lo que ya aprendiste.</p>
                <LinkButton href="#repasar">Repasar ahora</LinkButton>
              </div>
            ) : (
              <p className="text-sm text-(--ink-faint)">No tenés tarjetas pendientes por ahora. Volvé más tarde o agregá contenido nuevo.</p>
            )}
          </Card>

          <Card
            title="Lecciones"
            action={
              <a href="#clases" className="-my-2 -mr-2 rounded-md px-2 py-2 text-xs font-medium text-(--brand) hover:underline">
                Ver todas
              </a>
            }
          >
            <ul className="flex flex-col gap-2">
              {lessons.slice(0, 5).map((l) => (
                <li key={l.lesson} className="flex items-center justify-between gap-2 text-sm">
                  <span className="text-foreground">{l.lesson}</span>
                  <span className="tabular-nums text-(--ink-faint)">
                    {l.learned}/{l.total} aprendidas
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
}

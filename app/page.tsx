import Link from "next/link";
import { dueCards, getFlashcardsData, todayStr } from "@/lib/flashcards";
import { cardsByLesson, computeStreak, retentionRate } from "@/lib/stats";
import { Button, Card, EmptyState, StatTile } from "@/app/_components/ui";

export const dynamic = "force-dynamic";

export default async function ResumenPage() {
  const data = await getFlashcardsData();
  const today = todayStr();
  const due = dueCards(data.cards, today);
  const streak = computeStreak(data.reviews);
  const retention = retentionRate(data.reviews);
  const lessons = cardsByLesson(data.cards, today);

  return (
    <div className="mx-auto max-w-4xl px-3 py-4 lg:px-4">
      <h1 className="mb-1 text-xl font-bold text-foreground">Resumen</h1>
      <p className="mb-4 text-sm text-(--ink-faint)">Tu progreso de inglés, de un vistazo.</p>

      {data.cards.length === 0 ? (
        <EmptyState>
          Todavía no cargaste tarjetas.{" "}
          <Link href="/tarjetas" className="font-medium text-(--brand) hover:underline">
            Agregá tu primera tarjeta
          </Link>{" "}
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

          <Card title={due.length > 0 ? `${due.length} tarjeta${due.length === 1 ? "" : "s"} lista${due.length === 1 ? "" : "s"} para repasar` : "Estás al día"}>
            {due.length > 0 ? (
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm text-(--ink-dim)">Dedicá unos minutos a repasar y afianzar lo que ya aprendiste.</p>
                <Link href="/repasar">
                  <Button>Repasar ahora</Button>
                </Link>
              </div>
            ) : (
              <p className="text-sm text-(--ink-faint)">No tenés tarjetas pendientes por ahora. Volvé más tarde o agregá contenido nuevo.</p>
            )}
          </Card>

          <Card
            title="Lecciones"
            action={
              <Link href="/clases" className="text-xs font-medium text-(--brand) hover:underline">
                Ver todas
              </Link>
            }
          >
            <ul className="flex flex-col gap-2">
              {lessons.slice(0, 5).map((l) => (
                <li key={l.lesson} className="flex items-center justify-between gap-2 text-sm">
                  <span className="text-foreground">{l.lesson}</span>
                  <span className="text-(--ink-faint)">
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

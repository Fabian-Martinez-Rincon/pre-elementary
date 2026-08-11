import { dueCards, getFlashcardsData, todayStr } from "@/lib/flashcards";
import { EmptyState } from "@/app/_components/ui";
import { RepasarView } from "./view";

export const dynamic = "force-dynamic";

export default async function RepasarPage() {
  const data = await getFlashcardsData();
  const due = dueCards(data.cards, todayStr());

  return (
    <div className="mx-auto max-w-2xl px-3 py-4 lg:px-4">
      <h1 className="mb-1 text-xl font-bold text-foreground">Repasar</h1>
      <p className="mb-4 text-sm text-(--ink-faint)">Mirá el inglés, pensá la respuesta, dá vuelta la tarjeta y calificá qué tan bien te salió.</p>

      {data.cards.length === 0 ? (
        <EmptyState>Todavía no cargaste tarjetas. Andá a Tarjetas para agregar vocabulario de tus clases.</EmptyState>
      ) : due.length === 0 ? (
        <EmptyState>No tenés tarjetas pendientes por hoy. ¡Buen trabajo! Volvé mañana.</EmptyState>
      ) : (
        <RepasarView initialCards={due} />
      )}
    </div>
  );
}

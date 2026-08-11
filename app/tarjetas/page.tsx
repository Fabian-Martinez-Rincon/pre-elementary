import { getFlashcardsData, KNOWN_LESSONS } from "@/lib/flashcards";
import { TarjetasView } from "./view";

export const dynamic = "force-dynamic";

export default async function TarjetasPage({ searchParams }: { searchParams: Promise<{ lesson?: string }> }) {
  const { lesson } = await searchParams;
  const data = await getFlashcardsData();
  const usedLessons = Array.from(new Set(data.cards.map((c) => c.lesson)));
  const knownLessons = Array.from(new Set([...KNOWN_LESSONS, ...usedLessons]));
  const cards = [...data.cards].sort((a, b) => a.lesson.localeCompare(b.lesson, "es") || a.front.localeCompare(b.front, "en"));

  return (
    <div className="mx-auto max-w-4xl px-3 py-4 lg:px-4">
      <h1 className="mb-1 text-xl font-bold text-foreground">Tarjetas</h1>
      <p className="mb-4 text-sm text-(--ink-faint)">Agregá vocabulario y frases de tus clases. Cada tarjeta entra al repaso con repetición espaciada.</p>
      <TarjetasView initialCards={cards} knownLessons={knownLessons} initialLessonFilter={typeof lesson === "string" ? lesson : ""} />
    </div>
  );
}

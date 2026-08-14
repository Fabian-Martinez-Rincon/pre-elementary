import { TarjetasView } from "./view";

export function TarjetasSection({ lessonFilter, onLessonFilterChange }: { lessonFilter: string; onLessonFilterChange: (lesson: string) => void }) {
  return (
    <div className="mx-auto max-w-4xl px-3 lg:px-4">
      <h2 className="mb-1 text-xl font-bold text-foreground">Tarjetas</h2>
      <p className="mb-4 text-sm text-(--ink-faint)">Agregá vocabulario y frases de tus clases. Cada tarjeta entra al repaso con repetición espaciada.</p>
      <TarjetasView lessonFilter={lessonFilter} onLessonFilterChange={onLessonFilterChange} />
    </div>
  );
}

import { SectionHeading } from "@/app/_components/ui";
import { TarjetasView } from "./view";

export function TarjetasSection({ lessonFilter, onLessonFilterChange }: { lessonFilter: string; onLessonFilterChange: (lesson: string) => void }) {
  return (
    <div className="mx-auto max-w-4xl px-3 lg:px-4">
      <SectionHeading
        eyebrow="Tu vocabulario"
        eyebrowColor="var(--accent-tarjetas)"
        title="Tarjetas"
        subtitle="Agregá vocabulario y frases de tus clases. Cada tarjeta entra al repaso con repetición espaciada."
      />
      <TarjetasView lessonFilter={lessonFilter} onLessonFilterChange={onLessonFilterChange} />
    </div>
  );
}

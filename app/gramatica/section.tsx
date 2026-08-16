import { SectionHeading } from "@/app/_components/ui";
import { DRILLS } from "@/lib/drills";
import { DrillAccordionItem } from "./drill-accordion-item";

export function GramaticaSection() {
  return (
    <div className="mx-auto max-w-4xl px-3 lg:px-4">
      <div className="max-w-2xl">
        <SectionHeading
          eyebrow="Reglas en contexto"
          eyebrowColor="var(--accent-gramatica)"
          title="Gramática"
          subtitle="Elegí un tema y practicalo con preguntas de opción múltiple y corrección inmediata."
        />

        <div className="flex flex-col gap-2">
          {DRILLS.map((d) => (
            <DrillAccordionItem key={d.id} drill={d} />
          ))}
        </div>
      </div>
    </div>
  );
}

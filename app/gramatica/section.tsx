import { DRILLS } from "@/lib/drills";
import { DrillAccordionItem } from "./drill-accordion-item";

export function GramaticaSection() {
  return (
    <div className="mx-auto max-w-4xl px-3 lg:px-4">
      <div className="max-w-2xl">
        <h2 className="mb-1 text-xl font-bold text-foreground">Gramática</h2>
        <p className="mb-4 text-sm text-(--ink-faint)">
          Elegí un tema y practicalo con preguntas de opción múltiple y corrección inmediata.
        </p>

        <div className="flex flex-col gap-2">
          {DRILLS.map((d) => (
            <DrillAccordionItem key={d.id} drill={d} />
          ))}
        </div>
      </div>
    </div>
  );
}

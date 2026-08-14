import { SCENARIOS } from "@/lib/scenarios";
import { ScenarioAccordionItem } from "./scenario-accordion-item";

export function PracticarSection() {
  return (
    <div className="mx-auto max-w-4xl px-3 lg:px-4">
      <div className="max-w-2xl">
        <h2 className="mb-1 text-xl font-bold text-foreground">Practicar</h2>
        <p className="mb-4 text-sm text-(--ink-faint)">
          Simulacros de conversación guiados: respondé con tus propias palabras y después compará con una respuesta modelo.
        </p>

        <div className="flex flex-col gap-2">
          {SCENARIOS.map((s) => (
            <ScenarioAccordionItem key={s.id} scenario={s} />
          ))}
        </div>
      </div>
    </div>
  );
}

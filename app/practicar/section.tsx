import { SectionHeading } from "@/app/_components/ui";
import { SCENARIOS } from "@/lib/scenarios";
import { ScenarioAccordionItem } from "./scenario-accordion-item";

export function PracticarSection() {
  return (
    <div className="mx-auto max-w-4xl px-3 lg:px-4">
      <div className="max-w-2xl">
        <SectionHeading
          eyebrow="Conversación guiada"
          eyebrowColor="var(--accent-practicar)"
          title="Practicar"
          subtitle="Simulacros de conversación guiados: respondé con tus propias palabras y después compará con una respuesta modelo."
        />

        <div className="flex flex-col gap-2">
          {SCENARIOS.map((s) => (
            <ScenarioAccordionItem key={s.id} scenario={s} />
          ))}
        </div>
      </div>
    </div>
  );
}

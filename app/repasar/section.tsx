import { SectionHeading } from "@/app/_components/ui";
import { RepasarView } from "./view";

export function RepasarSection() {
  return (
    <div className="mx-auto max-w-4xl px-3 lg:px-4">
      <div className="max-w-2xl">
        <SectionHeading
          eyebrow="Repaso espaciado"
          eyebrowColor="var(--accent-repasar)"
          title="Repasar"
          subtitle="Mirá el inglés, pensá la respuesta, dá vuelta la tarjeta y calificá qué tan bien te salió."
        />
        <RepasarView />
      </div>
    </div>
  );
}

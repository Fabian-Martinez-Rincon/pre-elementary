import Image from "next/image";
import { notFound } from "next/navigation";
import { getScenario } from "@/lib/scenarios";
import { PracticarView } from "./view";

export default async function ScenarioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const scenario = getScenario(id);
  if (!scenario) notFound();

  return (
    <div className="mx-auto max-w-2xl px-3 py-4 lg:px-4">
      <h1 className="mb-1 text-xl font-bold text-foreground">{scenario.title}</h1>
      <p className="mb-4 text-sm text-(--ink-faint)">{scenario.description}</p>

      {scenario.images && scenario.images.length > 0 && (
        <details open className="mb-4 rounded-(--radius) border border-(--line) bg-(--bg-elevated) p-3 shadow-(--shadow)">
          <summary className="cursor-pointer text-sm font-semibold text-foreground">Slides de la clase</summary>
          <div className="mt-3 flex flex-col gap-3">
            {scenario.images.map((img) => (
              <div key={img.src} className="overflow-hidden rounded-md border border-(--line)">
                <Image src={img.src} alt={img.alt} width={1600} height={900} className="h-auto w-full" />
              </div>
            ))}
          </div>
        </details>
      )}

      <PracticarView scenario={scenario} />
    </div>
  );
}

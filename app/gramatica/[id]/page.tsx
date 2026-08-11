import Image from "next/image";
import { notFound } from "next/navigation";
import { getDrill } from "@/lib/drills";
import { DrillView } from "./view";

export default async function DrillPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const drill = getDrill(id);
  if (!drill) notFound();

  return (
    <div className="mx-auto max-w-2xl px-3 py-4 lg:px-4">
      <h1 className="mb-1 text-xl font-bold text-foreground">{drill.title}</h1>
      <p className="mb-4 text-sm text-(--ink-faint)">{drill.description}</p>

      {drill.image && (
        <div className="mb-4 overflow-hidden rounded-(--radius) border border-(--line) shadow-(--shadow)">
          <Image
            src={drill.image.src}
            alt={drill.image.alt}
            width={1600}
            height={900}
            sizes="(min-width: 672px) 672px, 100vw"
            className="h-auto w-full"
            preload
          />
        </div>
      )}

      <DrillView drill={drill} />
    </div>
  );
}

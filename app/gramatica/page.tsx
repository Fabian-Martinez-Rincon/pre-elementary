import Link from "next/link";
import { DRILLS } from "@/lib/drills";
import { Card } from "@/app/_components/ui";

export default function GramaticaPage() {
  return (
    <div className="mx-auto max-w-4xl px-3 py-4 lg:px-4">
      <h1 className="mb-1 text-xl font-bold text-foreground">Gramática</h1>
      <p className="mb-4 text-sm text-(--ink-faint)">
        Elegí un tema y practicalo con preguntas de opción múltiple y corrección inmediata.
      </p>

      <div className="flex flex-col gap-2">
        {DRILLS.map((d) => (
          <Link key={d.id} href={`/gramatica/${d.id}`}>
            <Card>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="text-sm font-semibold text-foreground">{d.title}</div>
                  <div className="text-xs text-(--ink-faint)">{d.description}</div>
                  <div className="mt-1 text-xs text-(--ink-faint)">{d.lesson}</div>
                </div>
                <span className="shrink-0 text-xs text-(--ink-faint)">{d.questions.length} preguntas</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

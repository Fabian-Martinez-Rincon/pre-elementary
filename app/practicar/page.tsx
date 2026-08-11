import Link from "next/link";
import { SCENARIOS } from "@/lib/scenarios";
import { Card } from "@/app/_components/ui";

export default function PracticarPage() {
  return (
    <div className="mx-auto max-w-4xl px-3 py-4 lg:px-4">
      <h1 className="mb-1 text-xl font-bold text-foreground">Practicar</h1>
      <p className="mb-4 text-sm text-(--ink-faint)">
        Simulacros de conversación guiados: respondé con tus propias palabras y después compará con una respuesta modelo.
      </p>

      <div className="flex flex-col gap-2">
        {SCENARIOS.map((s) => (
          <Link key={s.id} href={`/practicar/${s.id}`}>
            <Card>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="text-sm font-semibold text-foreground">{s.title}</div>
                  <div className="text-xs text-(--ink-faint)">{s.description}</div>
                </div>
                <span className="shrink-0 text-xs text-(--ink-faint)">{s.steps.length} pasos</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

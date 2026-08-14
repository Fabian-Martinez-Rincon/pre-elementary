"use client";

import { useState } from "react";
import Image from "next/image";
import type { Scenario } from "@/lib/scenarios";
import { Card } from "@/app/_components/ui";
import { PracticarView } from "./view";

export function ScenarioAccordionItem({ scenario }: { scenario: Scenario }) {
  const [open, setOpen] = useState(false);

  return (
    <Card className={open ? "" : "transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-lg"}>
      <button type="button" onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between gap-2 text-left">
        <div>
          <div className="text-sm font-semibold text-foreground">{scenario.title}</div>
          <div className="text-xs text-(--ink-faint)">{scenario.description}</div>
        </div>
        <span className="shrink-0 text-xs font-medium text-(--ink-faint)">{open ? "Cerrar ↑" : `${scenario.steps.length} pasos`}</span>
      </button>

      {open && (
        <div className="mt-4 border-t border-(--line) pt-4">
          {scenario.images && scenario.images.length > 0 && (
            <details className="mb-4 rounded-(--radius) border border-(--line) bg-(--bg-sunken) p-3">
              <summary className="cursor-pointer text-sm font-semibold text-foreground">Slides de la clase</summary>
              <div className="mt-3 flex flex-col gap-3">
                {scenario.images.map((img) => (
                  <div key={img.src} className="overflow-hidden rounded-md border border-(--line)">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={1600}
                      height={900}
                      sizes="(min-width: 672px) 672px, 100vw"
                      className="h-auto w-full"
                    />
                  </div>
                ))}
              </div>
            </details>
          )}

          <PracticarView key={scenario.id} scenario={scenario} onBack={() => setOpen(false)} />
        </div>
      )}
    </Card>
  );
}

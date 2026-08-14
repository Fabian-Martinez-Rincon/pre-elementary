"use client";

import { useState } from "react";
import Image from "next/image";
import type { Drill } from "@/lib/drills";
import { Card } from "@/app/_components/ui";
import { DrillView } from "./drill-view";

export function DrillAccordionItem({ drill }: { drill: Drill }) {
  const [open, setOpen] = useState(false);

  return (
    <Card className={open ? "" : "transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-lg"}>
      <button type="button" onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between gap-2 text-left">
        <div>
          <div className="text-sm font-semibold text-foreground">{drill.title}</div>
          <div className="text-xs text-(--ink-faint)">{drill.description}</div>
          <div className="mt-1 text-xs text-(--ink-faint)">{drill.lesson}</div>
        </div>
        <span className="shrink-0 text-xs font-medium text-(--ink-faint)">
          {open ? "Cerrar ↑" : `${drill.questions.length} preguntas`}
        </span>
      </button>

      {open && (
        <div className="mt-4 border-t border-(--line) pt-4">
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
          <DrillView key={drill.id} drill={drill} onBack={() => setOpen(false)} />
        </div>
      )}
    </Card>
  );
}

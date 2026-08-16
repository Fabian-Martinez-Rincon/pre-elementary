"use client";

import { useState } from "react";
import Image from "next/image";
import type { Drill } from "@/lib/drills";
import { Badge, Card, ChevronIcon, IconCircle } from "@/app/_components/ui";
import { DrillView } from "./drill-view";

function PencilIcon() {
  return (
    <svg aria-hidden viewBox="0 0 20 20" fill="none" className="h-4.5 w-4.5">
      <path
        d="m13.5 3.5 3 3L7.5 15.5 4 16.5l1-3.5 8.5-9.5Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DrillAccordionItem({ drill }: { drill: Drill }) {
  const [open, setOpen] = useState(false);

  return (
    <Card interactive={!open}>
      <button type="button" onClick={() => setOpen((o) => !o)} className="flex w-full items-center gap-3 text-left">
        <IconCircle color="var(--accent-gramatica)">
          <PencilIcon />
        </IconCircle>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold text-foreground">{drill.title}</div>
          <div className="text-xs text-(--ink-faint)">{drill.description}</div>
          <div className="mt-1 text-xs text-(--ink-faint)">{drill.lesson}</div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Badge>{drill.questions.length} preguntas</Badge>
          <ChevronIcon open={open} />
        </div>
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

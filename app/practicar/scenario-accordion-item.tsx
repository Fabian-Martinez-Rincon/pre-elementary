"use client";

import { useState } from "react";
import Image from "next/image";
import type { Scenario } from "@/lib/scenarios";
import { Badge, Card, ChevronIcon, IconCircle } from "@/app/_components/ui";
import { PracticarView } from "./view";

function ChatIcon() {
  return (
    <svg aria-hidden viewBox="0 0 20 20" fill="none" className="h-4.5 w-4.5">
      <path
        d="M3 9.5c0-3.31 3.13-6 7-6s7 2.69 7 6-3.13 6-7 6c-.77 0-1.51-.1-2.2-.3L4 17l1.06-3.18C3.77 12.7 3 11.17 3 9.5Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ScenarioAccordionItem({ scenario }: { scenario: Scenario }) {
  const [open, setOpen] = useState(false);

  return (
    <Card interactive={!open}>
      <button type="button" onClick={() => setOpen((o) => !o)} className="flex w-full items-center gap-3 text-left">
        <IconCircle color="var(--accent-practicar)">
          <ChatIcon />
        </IconCircle>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold text-foreground">{scenario.title}</div>
          <div className="text-xs text-(--ink-faint)">{scenario.description}</div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Badge>{scenario.steps.length} pasos</Badge>
          <ChevronIcon open={open} />
        </div>
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

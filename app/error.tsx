"use client";

import { Button, Card } from "@/app/_components/ui";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto max-w-2xl px-3 py-4 lg:px-4">
      <Card>
        <div className="flex flex-col items-center gap-3 py-6 text-center">
          <span className="text-3xl">⚠️</span>
          <p className="text-base font-semibold text-foreground">Algo salió mal.</p>
          <p className="text-sm text-(--ink-faint)">
            No se pudieron cargar tus datos. Puede ser un problema temporal — probá de nuevo.
          </p>
          <Button onClick={reset}>Reintentar</Button>
        </div>
      </Card>
    </div>
  );
}

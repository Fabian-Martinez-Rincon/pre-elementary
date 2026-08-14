import { TarjetasView } from "./view";

export default async function TarjetasPage({ searchParams }: { searchParams: Promise<{ lesson?: string }> }) {
  const { lesson } = await searchParams;

  return (
    <div className="mx-auto max-w-4xl px-3 py-4 lg:px-4">
      <h1 className="mb-1 text-xl font-bold text-foreground">Tarjetas</h1>
      <p className="mb-4 text-sm text-(--ink-faint)">Agregá vocabulario y frases de tus clases. Cada tarjeta entra al repaso con repetición espaciada.</p>
      <TarjetasView initialLessonFilter={typeof lesson === "string" ? lesson : ""} />
    </div>
  );
}

import { RepasarView } from "./view";

export function RepasarSection() {
  return (
    <div className="mx-auto max-w-4xl px-3 lg:px-4">
      <div className="max-w-2xl">
        <h2 className="mb-1 text-xl font-bold text-foreground">Repasar</h2>
        <p className="mb-4 text-sm text-(--ink-faint)">Mirá el inglés, pensá la respuesta, dá vuelta la tarjeta y calificá qué tan bien te salió.</p>
        <RepasarView />
      </div>
    </div>
  );
}

import { RepasarView } from "./view";

export default function RepasarPage() {
  return (
    <div className="mx-auto max-w-2xl px-3 py-4 lg:px-4">
      <h1 className="mb-1 text-xl font-bold text-foreground">Repasar</h1>
      <p className="mb-4 text-sm text-(--ink-faint)">Mirá el inglés, pensá la respuesta, dá vuelta la tarjeta y calificá qué tan bien te salió.</p>
      <RepasarView />
    </div>
  );
}

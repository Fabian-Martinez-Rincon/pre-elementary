import { recordReview } from "@/lib/flashcards";
import type { Grade } from "@/lib/srs";

export const runtime = "nodejs";

const VALID_GRADES: Grade[] = ["again", "hard", "good", "easy"];

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "No se pudo leer el cuerpo del pedido." }, { status: 400 });
  }
  const { cardId, grade } = (body ?? {}) as Record<string, unknown>;
  if (typeof cardId !== "string" || typeof grade !== "string" || !VALID_GRADES.includes(grade as Grade)) {
    return Response.json({ error: "Faltan datos del repaso." }, { status: 400 });
  }

  try {
    const card = await recordReview(cardId, grade as Grade);
    return Response.json({ card });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido.";
    return Response.json({ error: message }, { status: 400 });
  }
}

import { createCard } from "@/lib/flashcards";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "No se pudo leer el cuerpo del pedido." }, { status: 400 });
  }
  const { lesson, front, back, example } = (body ?? {}) as Record<string, unknown>;
  if (typeof lesson !== "string" || typeof front !== "string" || typeof back !== "string") {
    return Response.json({ error: "Faltan datos de la tarjeta." }, { status: 400 });
  }

  try {
    const card = await createCard({
      lesson,
      front,
      back,
      example: typeof example === "string" ? example : undefined,
    });
    return Response.json({ card });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido.";
    return Response.json({ error: message }, { status: 400 });
  }
}

import { deleteCard, updateCard } from "@/lib/flashcards";

export const runtime = "nodejs";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "No se pudo leer el cuerpo del pedido." }, { status: 400 });
  }
  const { lesson, front, back, example } = (body ?? {}) as Record<string, unknown>;

  try {
    const card = await updateCard(id, {
      lesson: typeof lesson === "string" ? lesson : undefined,
      front: typeof front === "string" ? front : undefined,
      back: typeof back === "string" ? back : undefined,
      example: typeof example === "string" ? example : undefined,
    });
    return Response.json({ card });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido.";
    return Response.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await deleteCard(id);
    return Response.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido.";
    return Response.json({ error: message }, { status: 400 });
  }
}

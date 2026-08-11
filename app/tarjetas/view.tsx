"use client";

import { useMemo, useState } from "react";
import type { Card as CardType } from "@/lib/flashcards";
import { Button, Card, EmptyState, Field, inputClass } from "@/app/_components/ui";

interface Draft {
  lesson: string;
  front: string;
  back: string;
  example: string;
}

function emptyDraft(lesson: string): Draft {
  return { lesson, front: "", back: "", example: "" };
}

export function TarjetasView({
  initialCards,
  knownLessons,
  initialLessonFilter,
}: {
  initialCards: CardType[];
  knownLessons: string[];
  initialLessonFilter: string;
}) {
  const [cards, setCards] = useState(initialCards);
  const [draft, setDraft] = useState<Draft>(emptyDraft(knownLessons[0] ?? ""));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<Draft | null>(null);
  const [lessonFilter, setLessonFilter] = useState(initialLessonFilter);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return cards.filter((c) => {
      if (lessonFilter && c.lesson !== lessonFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!c.front.toLowerCase().includes(q) && !c.back.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [cards, lessonFilter, search]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!draft.lesson.trim() || !draft.front.trim() || !draft.back.trim()) {
      setError("Completá lección, inglés y traducción.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "No se pudo guardar.");
      setCards((prev) => [...prev, json.card]);
      setDraft(emptyDraft(draft.lesson));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    const prev = cards;
    setCards((cs) => cs.filter((c) => c.id !== id));
    const res = await fetch(`/api/cards/${id}`, { method: "DELETE" });
    if (!res.ok) setCards(prev);
    setDeletingId(null);
  }

  function startEdit(card: CardType) {
    setEditingId(card.id);
    setEditDraft({ lesson: card.lesson, front: card.front, back: card.back, example: card.example });
  }

  async function saveEdit(id: string) {
    if (!editDraft) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/cards/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editDraft),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "No se pudo guardar.");
      setCards((prev) => prev.map((c) => (c.id === id ? json.card : c)));
      setEditingId(null);
      setEditDraft(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <Card title="Nueva tarjeta">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Field label="Lección">
            <input
              list="lesson-names"
              value={draft.lesson}
              onChange={(e) => setDraft({ ...draft, lesson: e.target.value })}
              placeholder="Ej: Lesson 1 - Let's Warm Up"
              className={inputClass}
            />
          </Field>
          <datalist id="lesson-names">
            {knownLessons.map((l) => (
              <option key={l} value={l} />
            ))}
          </datalist>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Inglés">
              <input
                value={draft.front}
                onChange={(e) => setDraft({ ...draft, front: e.target.value })}
                placeholder="Nice to meet you"
                className={inputClass}
              />
            </Field>
            <Field label="Traducción">
              <input
                value={draft.back}
                onChange={(e) => setDraft({ ...draft, back: e.target.value })}
                placeholder="Mucho gusto"
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Ejemplo (opcional)">
            <input
              value={draft.example}
              onChange={(e) => setDraft({ ...draft, example: e.target.value })}
              placeholder="Hi, I'm Sarah. Nice to meet you!"
              className={inputClass}
            />
          </Field>

          {error && <p className="text-sm text-(--danger)">{error}</p>}

          <Button type="submit" disabled={submitting} className="w-fit">
            {submitting ? "Guardando…" : "Agregar tarjeta"}
          </Button>
        </form>
      </Card>

      <div className="flex flex-wrap items-center gap-2">
        <select value={lessonFilter} onChange={(e) => setLessonFilter(e.target.value)} className={inputClass}>
          <option value="">Todas las lecciones</option>
          {knownLessons.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar…"
          className={`${inputClass} flex-1 min-w-[160px]`}
        />
      </div>

      <div>
        <h2 className="mb-2 text-sm font-semibold text-foreground">
          {filtered.length} tarjeta{filtered.length === 1 ? "" : "s"}
        </h2>
        {filtered.length === 0 ? (
          <EmptyState>No hay tarjetas que coincidan.</EmptyState>
        ) : (
          <div className="flex flex-col gap-2">
            {filtered.map((c) =>
              editingId === c.id && editDraft ? (
                <Card key={c.id}>
                  <div className="flex flex-col gap-2">
                    <input
                      list="lesson-names"
                      value={editDraft.lesson}
                      onChange={(e) => setEditDraft({ ...editDraft, lesson: e.target.value })}
                      className={inputClass}
                    />
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      <input value={editDraft.front} onChange={(e) => setEditDraft({ ...editDraft, front: e.target.value })} className={inputClass} />
                      <input value={editDraft.back} onChange={(e) => setEditDraft({ ...editDraft, back: e.target.value })} className={inputClass} />
                    </div>
                    <input value={editDraft.example} onChange={(e) => setEditDraft({ ...editDraft, example: e.target.value })} className={inputClass} />
                    <div className="flex gap-2">
                      <Button type="button" disabled={submitting} onClick={() => saveEdit(c.id)}>
                        Guardar
                      </Button>
                      <Button type="button" variant="secondary" onClick={() => setEditingId(null)}>
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card key={c.id}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-xs text-(--ink-faint)">{c.lesson}</div>
                      <div className="text-sm font-semibold text-foreground">{c.front}</div>
                      <div className="text-sm text-(--ink-dim)">{c.back}</div>
                      {c.example && <div className="mt-1 text-xs italic text-(--ink-faint)">&ldquo;{c.example}&rdquo;</div>}
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <Button type="button" variant="secondary" onClick={() => startEdit(c)}>
                        Editar
                      </Button>
                      <Button type="button" variant="danger" disabled={deletingId === c.id} onClick={() => handleDelete(c.id)}>
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </Card>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

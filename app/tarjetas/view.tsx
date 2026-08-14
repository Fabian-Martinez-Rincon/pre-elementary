"use client";

import { useMemo, useState } from "react";
import { KNOWN_LESSONS, type Card as CardType } from "@/lib/flashcards";
import { createCard, deleteCard, updateCard, useFlashcardsData } from "@/lib/flashcards-store";
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
  lessonFilter,
  onLessonFilterChange,
}: {
  lessonFilter: string;
  onLessonFilterChange: (lesson: string) => void;
}) {
  const data = useFlashcardsData();
  const cards = data.cards;
  const knownLessons = useMemo(() => Array.from(new Set([...KNOWN_LESSONS, ...cards.map((c) => c.lesson)])), [cards]);

  const [draft, setDraft] = useState<Draft>(() => emptyDraft(""));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<Draft | null>(null);
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(20);

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

  // Nada de useEffect para "resetear" esto cuando cambia el filtro: al
  // acotar con slice, si el filtro nuevo tiene menos tarjetas que
  // visibleCount simplemente se muestran todas, y "Mostrar más" reaparece
  // solo si hace falta.
  const shown = filtered.slice(0, visibleCount);
  const remaining = filtered.length - shown.length;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!draft.lesson.trim() || !draft.front.trim() || !draft.back.trim()) {
      setError("Completá lección, inglés y traducción.");
      return;
    }
    setSubmitting(true);
    try {
      createCard(draft);
      setDraft(emptyDraft(draft.lesson));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleDelete(id: string) {
    setDeletingId(id);
    try {
      deleteCard(id);
    } catch {
      // la tarjeta ya no existía -- nada que revertir, el store sigue siendo la verdad.
    } finally {
      setDeletingId(null);
    }
  }

  function startEdit(card: CardType) {
    setEditingId(card.id);
    setEditDraft({ lesson: card.lesson, front: card.front, back: card.back, example: card.example });
  }

  function saveEdit(id: string) {
    if (!editDraft) return;
    setSubmitting(true);
    try {
      updateCard(id, editDraft);
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
        <select value={lessonFilter} onChange={(e) => onLessonFilterChange(e.target.value)} className={inputClass}>
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
        <h3 className="mb-2 text-sm font-semibold text-foreground">
          {filtered.length} tarjeta{filtered.length === 1 ? "" : "s"}
        </h3>
        {filtered.length === 0 ? (
          <EmptyState>No hay tarjetas que coincidan.</EmptyState>
        ) : (
          <>
            <div className="flex flex-col divide-y divide-(--line) overflow-hidden rounded-(--radius) border border-(--line) bg-(--bg-elevated)">
              {shown.map((c) =>
                editingId === c.id && editDraft ? (
                  <div key={c.id} className="flex flex-col gap-2 p-3">
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
                ) : (
                  <div key={c.id} className="group flex items-center justify-between gap-3 px-3 py-2 text-sm transition-colors hover:bg-(--bg-sunken)">
                    <div className="min-w-0 flex-1 truncate" title={c.example || undefined}>
                      <span className="font-medium text-foreground">{c.front}</span>
                      <span className="mx-1.5 text-(--ink-faint)">→</span>
                      <span className="text-(--ink-dim)">{c.back}</span>
                      <span className="ml-2 hidden text-xs text-(--ink-faint) sm:inline">{c.lesson}</span>
                    </div>
                    <div className="flex shrink-0 gap-1 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
                      <button
                        type="button"
                        onClick={() => startEdit(c)}
                        className="rounded-md px-2 py-1 text-xs font-medium text-(--ink-dim) hover:text-foreground"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        disabled={deletingId === c.id}
                        onClick={() => handleDelete(c.id)}
                        className="rounded-md px-2 py-1 text-xs font-medium text-(--danger) hover:bg-(--danger-bg) disabled:opacity-50"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
            {remaining > 0 && (
              <Button
                type="button"
                variant="secondary"
                onClick={() => setVisibleCount((n) => n + 20)}
                className="mt-3 w-full"
              >
                Mostrar {Math.min(20, remaining)} más ({remaining} restantes)
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

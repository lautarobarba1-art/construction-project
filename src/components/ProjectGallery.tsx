"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  PROJECT_CATEGORIES,
  PROJECT_PHOTOS,
  type ProjectCategory,
} from "@/data/projects";

const INITIAL = 6;

type Filter = "Todo" | ProjectCategory;

export function ProjectGallery() {
  const [filter, setFilter] = useState<Filter>("Todo");
  const [showAll, setShowAll] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const filtered =
    filter === "Todo"
      ? PROJECT_PHOTOS
      : PROJECT_PHOTOS.filter((p) => p.category === filter);
  const visible = showAll ? filtered : filtered.slice(0, INITIAL);
  const hidden = filtered.length - visible.length;

  const counts = (f: Filter) =>
    f === "Todo"
      ? PROJECT_PHOTOS.length
      : PROJECT_PHOTOS.filter((p) => p.category === f).length;

  const select = (f: Filter) => {
    setFilter(f);
    setShowAll(false);
  };

  // Visor: abre y cierra el <dialog> nativo según el estado
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open !== null && !d.open) d.showModal();
    if (open === null && d.open) d.close();
  }, [open]);

  const step = useCallback(
    (dir: 1 | -1) => {
      setOpen((i) =>
        i === null ? i : (i + dir + filtered.length) % filtered.length,
      );
    },
    [filtered.length],
  );

  const current = open !== null ? filtered[open] : null;

  return (
    <div>
      <div
        role="group"
        aria-label="Filtrar por tipo de obra"
        className="mb-8 flex flex-wrap gap-2"
      >
        {(["Todo", ...PROJECT_CATEGORIES] as Filter[]).map((f) => {
          const on = f === filter;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={on}
              onClick={() => select(f)}
              className={`label rounded-full border px-4 py-2 transition-colors duration-200 ${
                on
                  ? "border-papel bg-papel text-grafito"
                  : "border-white/25 text-gris hover:border-white hover:text-white"
              }`}
            >
              {f} <span className="opacity-60">{counts(f)}</span>
            </button>
          );
        })}
      </div>

      <ul key={filter} className="columns-2 gap-3 lg:columns-3">
        {visible.map((p, i) => (
          <li
            key={p.src}
            className="anim-fade-up mb-3 break-inside-avoid"
            style={{ "--d": `${i * 50}ms` } as React.CSSProperties}
          >
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Ver foto ampliada: ${p.alt}`}
              className="group relative block w-full overflow-hidden rounded-[6px] bg-grafito-2"
            >
              <Image
                src={p.src}
                alt={p.alt}
                width={p.width}
                height={p.height}
                sizes="(min-width: 1024px) 28vw, 48vw"
                className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <span className="label absolute bottom-3 left-3 bg-grafito/80 px-2 py-1 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                {p.category}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {hidden > 0 && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="btn btn-primary"
          >
            Ver las {hidden} fotos restantes <span className="arr arr-down" aria-hidden>↓</span>
          </button>
        </div>
      )}

      <dialog
        ref={dialogRef}
        aria-label="Foto ampliada"
        onClose={() => setOpen(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) setOpen(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 text-white backdrop:bg-grafito/95"
      >
        {current && (
          <div className="flex h-full flex-col items-center justify-center gap-4 p-4 md:p-10">
            <div className="flex w-full max-w-5xl items-center justify-between">
              <p className="label text-gris">
                {current.category} · {(open ?? 0) + 1} / {filtered.length}
              </p>
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label="Cerrar"
                className="grid h-10 w-10 place-items-center rounded-full bg-papel text-xl leading-none text-grafito transition-colors hover:bg-teal hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="relative flex w-full max-w-5xl flex-1 items-center justify-center overflow-hidden">
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                sizes="100vw"
                className="anim-fade-in max-h-full w-auto max-w-full rounded-[6px] object-contain"
              />
            </div>

            <div className="flex w-full max-w-5xl items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Foto anterior"
                className="grid h-11 w-11 flex-none place-items-center rounded-full border border-white/30 text-xl transition-colors hover:bg-white hover:text-grafito"
              >
                ←
              </button>
              <p className="text-center text-sm text-gris">{current.alt}</p>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Foto siguiente"
                className="grid h-11 w-11 flex-none place-items-center rounded-full border border-white/30 text-xl transition-colors hover:bg-white hover:text-grafito"
              >
                →
              </button>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}

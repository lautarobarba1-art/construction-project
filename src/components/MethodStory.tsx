"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { InView } from "./InView";

/** Títulos del catálogo de Pala; las descripciones son un primer borrador. */
const STEPS = [
  {
    title: "Relevamiento y análisis del proyecto",
    description:
      "Visitamos el lugar, escuchamos lo que necesitás y analizamos el proyecto.",
  },
  {
    title: "Elaboración de presupuesto",
    description:
      "Armamos un presupuesto claro, con el alcance de la obra bien definido.",
  },
  {
    title: "Planificación y ejecución",
    description:
      "Organizamos las etapas y llevamos adelante la obra, con seguimiento en cada una.",
  },
  {
    title: "Seguimiento y entrega final",
    description:
      "Controlamos cada detalle y te entregamos la obra terminada.",
  },
];

const INK = "#1f2124";
const TEAL = "#0f766e";
const GHOST = "#a6a6a6";

type State = { show: boolean; color: string };
type Part = {
  id: string;
  d: string;
  w?: number;
  dash?: string;
  /** Estado de la línea según la etapa activa (0 a 3). */
  rule: (a: number) => State;
};

const hide: State = { show: false, color: INK };
const on = (color: string): State => ({ show: true, color });

/** Marcas del terreno: estacas y medidas. Teal al aparecer, luego grafito y gris. */
const survey = (a: number): State =>
  a === 0 ? on(TEAL) : a === 1 ? on(INK) : a === 2 ? on(GHOST) : hide;
/** Lo construido: teal en la etapa en que se levanta, grafito después. */
const built = (from: number) => (a: number): State =>
  a < from ? hide : a === from ? on(TEAL) : on(INK);

const PARTS: Part[] = [
  { id: "ground", d: "M10 140H230", w: 2.5, rule: () => on(INK) },
  {
    id: "stakes",
    d: "M30 140V122M30 122L42 127L30 132M210 140V122M210 122L198 127L210 132",
    rule: survey,
  },
  {
    id: "dim",
    d: "M30 154H210M30 150V158M210 150V158M38 151L30 154L38 157M202 151L210 154L202 157",
    w: 1.5,
    rule: survey,
  },
  {
    id: "ghost",
    d: "M36 140V64H204V140M32 56H208V64H32ZM56 88H126V140M140 96H158V140M170 88H192V112H170Z",
    w: 1.8,
    dash: "4 4",
    rule: (a) => (a === 1 ? on(TEAL) : hide),
  },
  {
    id: "vdim",
    d: "M222 56V140M217 56H227M217 140H227M219 64L222 56L225 64M219 132L222 140L225 132",
    w: 1.5,
    rule: (a) => (a === 1 ? on(TEAL) : a === 2 ? on(GHOST) : hide),
  },
  { id: "walls", d: "M36 140V64H204V140", w: 2.2, rule: built(2) },
  {
    id: "openings",
    d: "M52 86H130M136 94H162M166 86H196M56 88V140M126 88V140M140 96V140M158 96V140M170 88H192V112H170Z",
    rule: built(2),
  },
  {
    id: "scaffold",
    d: "M16 140V48M28 140V48M12 48H32M16 70H28M16 90H28M16 110H28M16 128H28M16 140L28 118M16 118L28 96",
    w: 1.8,
    rule: (a) => (a === 2 ? on(TEAL) : hide),
  },
  { id: "cornice", d: "M32 56H208V64H32Z", w: 2.4, rule: built(3) },
  {
    id: "doors",
    d: "M56 88H90V140H56ZM92 88H126V140H92ZM60 100H86M96 100H122M140 96H158V140H140ZM170 88H192V112H170ZM181 88V112M170 100H192",
    rule: built(3),
  },
  { id: "knob", d: "M154 120H154.1", w: 4, rule: built(3) },
  {
    id: "tree",
    d: "M224 140V114M211 102a13 13 0 1 0 26 0a13 13 0 1 0-26 0",
    rule: (a) => (a >= 3 ? on(INK) : hide),
  },
];

function House({ active, label }: { active: number; label: string }) {
  return (
    <svg
      viewBox="0 0 240 170"
      role="img"
      aria-label={label}
      className="mx-auto block h-[132px] w-auto md:h-auto md:w-full"
    >
      <defs>
        <pattern id="story-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="#e4e4e1" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="240" height="170" fill="url(#story-grid)" />

      {PARTS.map((p, i) => {
        const s = p.rule(active);
        const common: CSSProperties = {
          stroke: s.color,
          opacity: s.show ? 1 : 0,
          transition:
            "stroke-dashoffset .9s cubic-bezier(.65,0,.35,1), stroke .5s, opacity .5s",
          transitionDelay: s.show ? `${i * 55}ms` : "0ms",
        };
        return p.dash ? (
          <path
            key={p.id}
            d={p.d}
            fill="none"
            strokeWidth={p.w ?? 2}
            strokeDasharray={p.dash}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={common}
          />
        ) : (
          <path
            key={p.id}
            d={p.d}
            pathLength={1}
            fill="none"
            strokeWidth={p.w ?? 2}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              ...common,
              strokeDasharray: 1,
              strokeDashoffset: s.show ? 0 : 1,
            }}
          />
        );
      })}

      <g
        style={{
          transformBox: "fill-box",
          transformOrigin: "center",
          transform: active >= 3 ? "scale(1)" : "scale(0)",
          opacity: active >= 3 ? 1 : 0,
          transition:
            "transform .55s cubic-bezier(.34,1.56,.64,1) .7s, opacity .3s .7s",
        }}
      >
        <circle cx="206" cy="28" r="12" fill={TEAL} />
        <path
          d="M200 28.5L204.5 33L212.5 23.5"
          stroke="#fff"
          strokeWidth="2.6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export function MethodStory() {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;

    // Etapa activa = la más cercana a una línea horizontal al 55% de la pantalla.
    const update = () => {
      raf = 0;
      const target = window.innerHeight * 0.55;
      let best = 0;
      let bestDist = Infinity;
      items.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - target);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const label = `Dibujo de una vivienda, etapa ${active + 1} de ${STEPS.length}: ${STEPS[active].title}`;

  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-16">
      <div className="sticky top-[72px] z-10 -mx-[var(--gutter)] border-b border-grafito/15 bg-papel px-[var(--gutter)] py-3 md:top-[104px] md:mx-0 md:self-start md:border-0 md:bg-transparent md:p-0">
        <div className="overflow-hidden rounded-[6px] border border-grafito/15 bg-papel">
          <House active={active} label={label} />
          <div className="flex items-center justify-between gap-4 border-t border-grafito/15 px-4 py-3">
            <p className="label" aria-hidden>
              Etapa {String(active + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
            </p>
            <div className="flex gap-1.5" aria-hidden>
              {STEPS.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-7 rounded-full transition-colors duration-500 ${
                    i <= active ? "bg-teal" : "bg-hormigon"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <ol className="flex flex-col">
        {STEPS.map((s, i) => {
          const isActive = i === active;
          return (
            <li
              key={s.title}
              ref={(el) => {
                items.current[i] = el;
              }}
              aria-current={isActive ? "step" : undefined}
              className={`flex flex-col justify-center border-l-2 py-8 pl-6 transition-colors duration-500 md:min-h-[42vh] md:pl-10 ${
                isActive ? "border-teal" : "border-grafito/15"
              }`}
            >
              <InView className="flex flex-col">
                <p
                  aria-hidden
                  className={`fade text-[clamp(56px,7vw,96px)] font-medium leading-none tracking-display tabular-nums transition-colors duration-500 ${
                    isActive ? "text-teal" : "text-grafito"
                  }`}
                  style={{ "--d": "0ms" } as CSSProperties}
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3
                  className="fade mt-4 text-[clamp(22px,2.4vw,32px)] font-medium leading-[1.1] tracking-tight2"
                  style={{ "--d": "140ms" } as CSSProperties}
                >
                  <span className="sr-only">Etapa {i + 1}: </span>
                  {s.title}
                </h3>
                <p
                  className="fade mt-3 max-w-[36ch] text-piedra"
                  style={{ "--d": "280ms" } as CSSProperties}
                >
                  {s.description}
                </p>
              </InView>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

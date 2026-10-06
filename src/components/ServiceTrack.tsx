"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * En mobile: carrusel con snap y puntos de avance.
 * Desde md: grilla normal (los controles se ocultan).
 */
export function ServiceTrack({ children, count }: { children: ReactNode; count: number }) {
  const ref = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const items = Array.from(el.children) as HTMLElement[];
      if (!items.length) return;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 2) {
        setActive(items.length - 1);
        return;
      }
      const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
      let best = 0;
      let bestDist = Infinity;
      items.forEach((it, i) => {
        const d = Math.abs(it.offsetLeft - pad - el.scrollLeft);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActive(best);
    };

    el.addEventListener("scroll", update, { passive: true });
    update();
    return () => el.removeEventListener("scroll", update);
  }, []);

  const goTo = useCallback((i: number) => {
    const el = ref.current;
    const item = el?.children[i] as HTMLElement | undefined;
    if (!el || !item) return;
    const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: item.offsetLeft - pad, behavior: reduce ? "auto" : "smooth" });
  }, []);

  return (
    <>
      <ul
        ref={ref}
        aria-label="Servicios. Deslizá para ver más."
        className="relative -mx-[var(--gutter)] flex snap-x snap-mandatory gap-3 overflow-x-auto px-[var(--gutter)] pb-1 [scrollbar-width:none] scroll-pl-[var(--gutter)] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:snap-none md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-12"
      >
        {children}
      </ul>

      <div className="mt-5 flex items-center justify-between md:hidden">
        <div className="flex items-center gap-1.5">
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ir al servicio ${i + 1} de ${count}`}
              aria-current={i === active ? "true" : undefined}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-teal" : "w-1.5 bg-gris"
              }`}
            />
          ))}
        </div>
        <span className="label tabular-nums text-piedra" aria-hidden>
          {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
      </div>
    </>
  );
}

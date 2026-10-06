"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Entrada por scroll. `armed` es true solo si el JS ya está listo y el elemento
 * todavía no se vio: sin JS, con reduced-motion o si ya está a la vista, el
 * contenido nunca se oculta.
 */
export function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    // ya visible, o fuera de pantalla en horizontal (carrusel): no se oculta
    if (r.top < window.innerHeight * 0.9 || r.left >= window.innerWidth) return;

    setArmed(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setArmed(false);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, armed };
}

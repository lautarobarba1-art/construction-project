"use client";

import { useEffect, useState } from "react";

/** Botón flotante para volver al inicio de la página. Aparece al bajar. */
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={goTop}
      aria-label="Volver al inicio de la página"
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      className={`fixed bottom-[calc(16px+env(safe-area-inset-bottom,0px))] right-4 z-10 grid h-14 w-14 place-items-center rounded-full border border-grafito/10 bg-papel text-teal shadow-[0_6px_20px_rgba(0,0,0,0.28)] transition-[opacity,transform,background-color,color] duration-300 hover:bg-teal hover:text-white md:bottom-6 md:right-6 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}

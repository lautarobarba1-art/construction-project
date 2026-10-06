"use client";

import type { ReactNode } from "react";
import { useReveal } from "@/lib/useReveal";

/**
 * Agrupa elementos que se animan juntos al entrar en pantalla.
 * Los hijos usan las clases `.fade`, `.iv-line` y `.word-in` (ver globals.css).
 */
export function InView({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { ref, armed } = useReveal<HTMLDivElement>(0.2);

  return (
    <div
      ref={ref}
      data-armed={armed ? "true" : "false"}
      className={`iv ${className}`}
    >
      {children}
    </div>
  );
}

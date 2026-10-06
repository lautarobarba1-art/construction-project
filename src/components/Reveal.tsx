"use client";

import type { ReactNode } from "react";
import { useReveal } from "@/lib/useReveal";

/** Aparece subiendo y con fundido cuando entra en pantalla. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, armed } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      data-armed={armed ? "true" : "false"}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

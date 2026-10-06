"use client";

import { useState } from "react";

export function CopyButton({ text, label = "Copiar" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    } catch {
      /* sin permiso de portapapeles: el número igual está visible y es un enlace */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="label rounded border border-grafito/40 px-2.5 py-1.5 transition-colors duration-200 hover:bg-grafito hover:text-white"
    >
      <span aria-live="polite">{done ? "Copiado" : label}</span>
    </button>
  );
}

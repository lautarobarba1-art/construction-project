import type { ReactNode } from "react";
import { InView } from "./InView";
import { Words } from "./Words";

/** Encabezado de sección: la línea se dibuja, el rótulo aparece y el título sube palabra por palabra. */
export function SectionHead({
  label,
  title,
  dark = false,
  children,
}: {
  label: string;
  title: string;
  dark?: boolean;
  children?: ReactNode;
}) {
  return (
    <InView className="relative mb-[clamp(32px,5vw,64px)] grid gap-3 pt-4 md:grid-cols-[200px_1fr] md:gap-6">
      <span
        aria-hidden
        className={`iv-line absolute inset-x-0 top-0 h-px ${dark ? "bg-white/20" : "bg-grafito"}`}
      />
      <p className={`label fade ${dark ? "text-gris" : ""}`}>{label}</p>
      <div className="flex flex-col gap-5">
        <h2 className="max-w-[18ch] text-balance text-[clamp(34px,5vw,72px)] font-medium leading-none tracking-tight2">
          <Words text={title} />
        </h2>
        {children && (
          <div className="fade" style={{ "--d": "420ms" } as React.CSSProperties}>
            {children}
          </div>
        )}
      </div>
    </InView>
  );
}

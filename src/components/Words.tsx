import { Fragment, type ReactNode } from "react";

/**
 * Título partido en palabras: cada una sube desde una máscara, en cascada.
 * Debe estar dentro de un <InView>. `accent` se pega a la última palabra
 * (ej. el punto final en otro color).
 */
export function Words({
  text,
  accent,
  start = 0,
}: {
  text: string;
  accent?: ReactNode;
  start?: number;
}) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => {
        const last = i === words.length - 1;
        return (
          <Fragment key={i}>
            <span className="word-mask">
              <span
                className="word-in"
                style={{ "--i": start + i } as React.CSSProperties}
              >
                {w}
                {last && accent}
              </span>
            </span>
            {!last && " "}
          </Fragment>
        );
      })}
    </>
  );
}

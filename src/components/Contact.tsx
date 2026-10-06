import Link from "next/link";
import { InView } from "./InView";
import { Words } from "./Words";

/**
 * Degradé papel → teal con paradas suavizadas (curva smoothstep),
 * para que el paso desde "Cómo trabajamos" no se vea como un corte.
 */
const FADE =
  "linear-gradient(to bottom, #f6f6f4 0%, #dee9e6 20%, #a5c9c5 40%, #60a39d 60%, #27837c 80%, #0f766e 100%)";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/** Cierre de la home: una frase y un botón hacia la página de contacto. */
export function Contact() {
  return (
    <section id="contacto" className="scroll-mt-[72px] bg-teal text-white">
      <div
        aria-hidden
        className="h-[clamp(120px,20vw,280px)]"
        style={{ backgroundImage: FADE }}
      />
      <div className="wrap pb-[clamp(64px,9vw,128px)] pt-[clamp(8px,2vw,24px)]">
        <InView className="relative pt-4">
          <span aria-hidden className="iv-line absolute inset-x-0 top-0 h-px bg-white/30" />
          <p className="label fade mb-6">Contacto</p>
          <h2 className="max-w-[14ch] text-balance text-[clamp(52px,10vw,148px)] font-medium leading-[0.92] tracking-display">
            <Words
              text="Tu obra empieza con una conversación"
              accent={<span className="text-grafito">.</span>}
            />
          </h2>
        </InView>

        <InView className="mt-[clamp(32px,5vw,64px)] grid items-end gap-8 md:grid-cols-[1fr_auto] md:gap-12">
          <p className="fade max-w-[42ch] text-[clamp(18px,2vw,22px)] leading-snug" style={d(300)}>
            Contanos qué querés construir. Coordinamos una visita, relevamos
            el proyecto y te pasamos un presupuesto claro.
          </p>
          <div className="fade" style={d(480)}>
            <Link href="/contacto" className="btn btn-primary">
              Pedir presupuesto <span className="arr" aria-hidden>↗</span>
            </Link>
          </div>
        </InView>
      </div>
    </section>
  );
}

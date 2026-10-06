import type { CSSProperties } from "react";
import { HeroSlides, type Slide } from "./HeroSlides";
import { WHATSAPP_URL } from "@/lib/contact";

/**
 * Titular, una línea por entrada. El punto final lleva el color de acento.
 * "Tu obra, de principio a fin": el catálogo habla de cuidar la obra desde el inicio hasta la entrega.
 */
const TITLE_LINES = ["Tu obra,", "de principio", "a fin"];

/** Fotos reales de obras de Pala (de /public/images/proyectos). */
const SLIDES: Slide[] = [
  {
    src: "/images/proyectos/vivienda-frente-terminado.jpg",
    alt: "Frente de una vivienda terminada por Pala, con portón de garaje blanco",
    position: "28% 62%",
  },
  {
    src: "/images/proyectos/vivienda-dos-plantas.jpg",
    alt: "Vivienda de dos plantas terminada, con frente gris y detalles en piedra",
    position: "72% 40%",
  },
  {
    src: "/images/proyectos/escalera-revestida.jpg",
    alt: "Escalera con revestimiento símil madera junto a una ventana",
    position: "32% 55%",
  },
  {
    src: "/images/proyectos/vivienda-obra-gris.jpg",
    alt: "Vivienda en obra con revoque grueso, lista para las terminaciones",
    position: "40% 55%",
  },
];

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[calc(100svh-72px)] flex-col justify-end overflow-hidden bg-grafito text-white"
    >
      <HeroSlides slides={SLIDES} />

      <div className="wrap relative z-10 pb-[clamp(48px,7vw,88px)] pt-[clamp(48px,6vw,80px)]">
        <div className="relative mb-[clamp(20px,3vw,36px)] pt-3.5">
          <span
            className="anim-draw absolute inset-x-0 top-0 h-px bg-white/30"
            style={delay(0)}
            aria-hidden
          />
          <p className="label anim-fade-in text-white/85" style={delay(500)}>
            Rafaela, Santa Fe
          </p>
        </div>

        <h1 className="max-w-[14ch] text-balance text-[clamp(52px,min(15vw,14svh),140px)] font-medium leading-[0.94] tracking-display">
          <span className="sr-only">
            Construcción de casas, departamentos y reformas en Rafaela.{" "}
          </span>
          {TITLE_LINES.map((line, i) => {
            const last = i === TITLE_LINES.length - 1;
            return (
              <span
                key={line}
                className="-my-[0.06em] block overflow-hidden py-[0.06em]"
              >
                <span className="anim-rise block" style={delay(150 + i * 130)}>
                  {line}
                  {last && (
                    <span
                      className="anim-pop text-teal-light"
                      style={delay(150 + i * 130 + 650)}
                    >
                      .
                    </span>
                  )}
                </span>
              </span>
            );
          })}
        </h1>

        <div className="mt-[clamp(24px,4vw,44px)] flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p
            className="anim-fade-up max-w-[36ch] text-[clamp(18px,2vw,22px)] leading-snug text-white/90"
            style={delay(750)}
          >
            Casas, departamentos y reformas, con relevamiento, presupuesto y
            seguimiento en cada etapa.
          </p>
          <div
            className="anim-fade-up flex flex-wrap items-center gap-x-8 gap-y-4"
            style={delay(900)}
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener"
              className="btn btn-primary"
            >
              Pedir presupuesto <span className="arr" aria-hidden>↗</span>
            </a>
            <a href="#proyectos" className="link-slide label pb-1 text-white">
              Ver proyectos ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

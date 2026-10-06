"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export type Slide = { src: string; alt: string; position?: string };

const INTERVAL = 6500;

/** Fotos a pantalla completa que se alternan con fundido y un zoom lento. */
export function HeroSlides({ slides }: { slides: Slide[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (paused) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % slides.length),
      INTERVAL,
    );
    return () => window.clearInterval(id);
  }, [slides.length, paused]);

  // No avanza con la pestaña en segundo plano
  useEffect(() => {
    const onVis = () => setPaused(document.visibilityState === "hidden");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <>
      <div className="absolute inset-0 -z-10">
        {slides.map((s, i) => (
          <div
            key={s.src}
            aria-hidden={i !== active}
            className={`absolute inset-0 transition-opacity duration-[1600ms] ease-in-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={s.src}
              alt={i === active ? s.alt : ""}
              fill
              priority={i === 0}
              sizes="100vw"
              style={{ objectPosition: s.position ?? "center" }}
              className={`object-cover [filter:saturate(.75)_contrast(1.05)] transition-transform duration-[9000ms] ease-out ${
                i === active ? "scale-100" : "scale-[1.1]"
              }`}
            />
          </div>
        ))}
        {/* Degradé para que el texto blanco se lea sobre cualquier foto */}
        <div className="absolute inset-0 bg-gradient-to-t from-grafito/95 via-grafito/55 to-grafito/25" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-grafito/60 via-grafito/10 to-transparent md:block" />
      </div>

      {slides.length > 1 && (
        <div
          role="group"
          aria-label="Fotos de obras"
          className="absolute bottom-6 right-[var(--gutter)] z-10 flex items-center gap-2"
        >
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ver foto ${i + 1} de ${slides.length}`}
              aria-current={i === active ? "true" : undefined}
              className="group grid h-6 w-8 place-items-center"
            >
              <span
                className={`block h-[3px] w-full rounded-full transition-colors duration-300 ${
                  i === active ? "bg-white" : "bg-white/35 group-hover:bg-white/70"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </>
  );
}

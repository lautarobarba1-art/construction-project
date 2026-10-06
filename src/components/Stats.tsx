"use client";

import { useEffect, useRef, useState } from "react";

type Stat = { value: number; suffix?: string; label: string; short: string };

const STATS: Stat[] = [
  { value: 16, suffix: "+", label: "Años en el rubro", short: "Años en el rubro" },
  { value: 7, label: "Especialidades de obra", short: "Especialidades" },
  { value: 4, label: "Etapas, del relevamiento a la entrega", short: "Etapas por obra" },
];

const DURATION = 1400;

function useCountUp(target: number, run: boolean) {
  const [n, setN] = useState(target);

  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / DURATION, 1);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    setN(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target]);

  return n;
}

function StatItem({ stat, run, index }: { stat: Stat; run: boolean; index: number }) {
  const n = useCountUp(stat.value, run);
  return (
    <li
      className="stat-item border-l border-grafito/15 px-3 py-6 first:border-l-0 first:pl-0 md:px-8 md:py-10"
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <p
        className="text-[clamp(38px,12vw,56px)] font-medium leading-none tracking-display tabular-nums md:text-[clamp(56px,8vw,112px)]"
        aria-label={`${stat.value}${stat.suffix ?? ""}`}
      >
        <span aria-hidden>{n}</span>
        {stat.suffix && (
          <span className="ml-1 align-top text-[0.5em] text-teal" aria-hidden>
            {stat.suffix}
          </span>
        )}
      </p>
      <p className="label mt-3 text-[10px] leading-snug tracking-[0.06em] text-piedra md:mt-4 md:text-xs md:tracking-label">
        <span className="md:hidden">{stat.short}</span>
        <span className="hidden md:inline">{stat.label}</span>
      </p>
    </li>
  );
}

export function Stats() {
  const ref = useRef<HTMLElement>(null);
  const [armed, setArmed] = useState(false); // oculto solo si el JS está listo y falta verlo
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.65) {
      setRun(true);
    } else {
      setArmed(true);
      io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-label="Pala en cifras"
      data-armed={armed && !run ? "true" : "false"}
      className="stats bg-papel"
    >
      <div className="wrap py-[clamp(24px,4vw,56px)]">
        <ul className="grid grid-cols-3">
          {STATS.map((s, i) => (
            <StatItem key={s.label} stat={s} run={run} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

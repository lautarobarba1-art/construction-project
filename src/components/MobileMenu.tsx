"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { whatsappLink } from "@/lib/contact";
import { LogoMark } from "./Logo";

type NavLink = { href: string; label: string };

const PHONE_DISPLAY = "3492 526640";
const PHONE_TEL = "+543492526640";

/**
 * Menú para pantallas chicas: un panel lateral con enlaces numerados.
 * Al pasar el dedo o el mouse por uno, los demás se atenúan.
 */
export function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const openRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelId = "menu-movil";

  const close = useCallback((returnFocus = false) => {
    document.body.style.overflow = "";
    setOpen(false);
    if (returnFocus) openRef.current?.focus();
  }, []);

  // Bloquea el scroll de la página mientras el menú está abierto y enfoca "Cerrar"
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape cierra el menú; si la pantalla pasa a escritorio, también
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(true);
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => mq.matches && close();
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open, close]);

  const tab = open ? 0 : -1;

  return (
    <div className="md:hidden">
      <button
        ref={openRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label="Abrir menú"
        className="relative grid h-11 w-11 place-items-center rounded border border-white/25 transition-colors hover:border-white"
      >
        <span aria-hidden className="absolute h-[2px] w-5 -translate-y-[5px] bg-white" />
        <span aria-hidden className="absolute h-[2px] w-5 translate-y-[5px] bg-white" />
      </button>

      <div
        id={panelId}
        aria-hidden={!open}
        className={`fixed inset-0 z-50 transition-[visibility] duration-0 ${
          open ? "visible delay-0" : "invisible delay-500"
        }`}
      >
        {/* Fondo: al tocarlo se cierra el menú */}
        <div
          onClick={() => close(true)}
          aria-hidden
          className={`absolute inset-0 bg-black/60 transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          className={`relative flex h-full w-[calc(100%-56px)] max-w-[520px] flex-col overflow-y-auto rounded-r-[20px] bg-grafito px-6 pb-8 pt-5 text-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/15 pb-5">
            <LogoMark size={44} />
            <button
              ref={closeRef}
              type="button"
              onClick={() => close(true)}
              tabIndex={tab}
              className="label tracking-[0.2em] text-gris transition-colors hover:text-white focus-visible:text-white"
            >
              Cerrar
            </button>
          </div>

          <nav aria-label="Principal (móvil)" className="mt-12">
            <ul className="group/list grid gap-1">
              {links.map((l, i) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => close()}
                    tabIndex={tab}
                    className="group/item flex items-baseline gap-3 text-white transition-colors duration-300 group-hover/list:text-white/30 hover:!text-white focus-visible:!text-white"
                    style={{
                      transitionDelay: open ? `${120 + i * 70}ms` : "0ms",
                      opacity: open ? undefined : 0,
                    }}
                  >
                    <span
                      aria-hidden
                      className="w-7 flex-none font-mono text-[11px] tracking-[0.08em] opacity-60"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="py-2 text-[clamp(40px,12.5vw,58px)] font-normal leading-none tracking-tight2">
                      {l.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto grid gap-5 pt-12">
            <div className="grid gap-1">
              <a
                href={`tel:${PHONE_TEL}`}
                tabIndex={tab}
                className="text-2xl font-medium tabular-nums"
              >
                {PHONE_DISPLAY}
              </a>
              <p className="label text-gris">Rafaela, Santa Fe</p>
            </div>
            <a
              href={whatsappLink("Hola, quiero pedir presupuesto.")}
              target="_blank"
              rel="noopener"
              tabIndex={tab}
              className="btn btn-primary justify-between"
            >
              Escribir por WhatsApp <span className="arr" aria-hidden>↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

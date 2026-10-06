import Link from "next/link";
import { Logo } from "./Logo";
import { WHATSAPP_URL } from "@/lib/contact";
import { MAP_URL, PHONE_DISPLAY, PHONE_E164 } from "@/lib/site";

const explore = [
  { href: "/#servicios", label: "Servicios" },
  { href: "/#proyectos", label: "Proyectos" },
  { href: "/#metodo", label: "Método" },
  { href: "/contacto", label: "Contacto" },
];

const heading = "label mb-5 font-bold tracking-[0.22em] text-teal-light";
const item =
  "link-slide inline-block py-2 text-[17px] text-papel/85 transition-colors hover:text-white md:py-1.5";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t-2 border-teal bg-grafito text-papel">
      <div className="wrap pt-[clamp(40px,6vw,72px)]">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr] md:gap-8">
          <div className="grid content-start gap-5">
            <Logo size={84} />
            <p className="text-gris">
              Rafaela, Santa Fe · Argentina
              <br />
              {PHONE_DISPLAY}
            </p>
          </div>

          <nav aria-label="Explorar">
            <p className={heading}>Explorar</p>
            <ul>
              {explore.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={item}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Escribinos">
            <p className={heading}>Escribinos</p>
            <ul>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener" className={item}>
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`tel:${PHONE_E164}`} className={item}>
                  Llamar
                </a>
              </li>
              <li>
                <a href={MAP_URL} target="_blank" rel="noopener" className={item}>
                  Cómo llegar
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-[clamp(40px,6vw,64px)] grid gap-3 border-t border-white/15 pb-24 pt-8 md:grid-cols-3 md:items-center md:pb-10">
          <p className="label tracking-[0.18em] text-gris/90">
            © {year} Pala Construcciones · Rafaela, Santa Fe
          </p>
          <p className="font-mono text-xs tracking-[0.12em] text-gris/90 md:text-center">
            Desarrollado por <b className="font-bold text-papel/90">TARO Estudio.</b>
          </p>
        </div>
      </div>
    </footer>
  );
}

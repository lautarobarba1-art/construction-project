import Link from "next/link";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

const links = [
  { href: "/#servicios", label: "Servicios" },
  { href: "/#proyectos", label: "Proyectos" },
  { href: "/#metodo", label: "Método" },
  { href: "/contacto", label: "Contacto" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/15 bg-grafito text-white">
      <div className="wrap flex h-[72px] items-center justify-between gap-4">
        <Logo priority />
        <nav aria-label="Principal" className="hidden gap-8 text-sm text-gris md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="link-slide hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>
        <MobileMenu links={links} />
      </div>
    </header>
  );
}

import Image from "next/image";
import { SERVICES, type Service } from "@/data/services";
import { whatsappLink } from "@/lib/contact";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";
import { ServiceTrack } from "./ServiceTrack";

type Tone = "dark" | "brand" | "stone" | "outline" | "accent";

/** Disposición bento: una entrada por servicio, en el mismo orden que SERVICES. */
const LAYOUT: { span: string; tone: Tone; big?: boolean }[] = [
  { span: "md:col-span-2 lg:col-span-6 lg:row-span-2", tone: "dark", big: true }, // casas
  { span: "lg:col-span-3", tone: "brand" }, // departamentos
  { span: "lg:col-span-3", tone: "stone" }, // reformas
  { span: "lg:col-span-3", tone: "outline" }, // terminaciones
  { span: "lg:col-span-3", tone: "dark" }, // durlock
  { span: "lg:col-span-5", tone: "brand" }, // pintura
  { span: "md:col-span-2 lg:col-span-7", tone: "accent", big: true }, // steel framing
];

const TONES: Record<Tone, { card: string; text: string }> = {
  dark: { card: "bg-grafito text-papel", text: "text-gris" },
  brand: { card: "bg-gris text-grafito", text: "text-grafito" },
  stone: { card: "bg-hormigon text-grafito", text: "text-piedra" },
  outline: { card: "border border-grafito/20 bg-papel text-grafito", text: "text-piedra" },
  accent: { card: "bg-teal text-white", text: "text-white" },
};

/** Foto apagada que recupera el color al pasar el mouse. */
const PHOTO =
  "object-cover transition-[filter,transform] duration-700 [filter:saturate(.4)_contrast(1.05)] group-hover:scale-[1.04] group-hover:[filter:saturate(1)_contrast(1.05)]";

function Arrow({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`grid h-9 w-9 place-items-center rounded-full bg-papel text-lg leading-none text-grafito transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:bg-teal group-hover:text-white ${className}`}
    >
      ↗
    </span>
  );
}

function BigCard({ s, tone }: { s: Service; tone: Tone }) {
  const overlay =
    tone === "accent"
      ? "bg-gradient-to-t from-teal-dark via-teal/70 to-teal/20"
      : "bg-gradient-to-t from-grafito via-grafito/60 to-grafito/15";
  return (
    <>
      <Image
        src={s.image.src}
        alt={s.image.alt}
        fill
        sizes="(min-width: 1024px) 60vw, 100vw"
        className={PHOTO}
        style={{ objectPosition: s.image.position }}
      />
      <div className={`absolute inset-0 ${overlay}`} aria-hidden />
      <div className="relative z-10 flex items-start justify-between gap-4">
        <span className="label bg-grafito/75 px-2 py-1 text-white">{s.group}</span>
        <Arrow />
      </div>
      <div className="relative z-10 flex flex-col gap-3 text-white">
        <h3 className="max-w-[14ch] text-[clamp(34px,4.4vw,64px)] font-medium leading-[1.05] tracking-tight2">
          {s.title}
        </h3>
        <p className="max-w-[44ch] text-[15px] leading-snug text-white/90">
          {s.description}
        </p>
      </div>
    </>
  );
}

function SmallCard({ s, tone }: { s: Service; tone: Tone }) {
  const t = TONES[tone];
  return (
    <>
      <div className="relative h-[150px] shrink-0 overflow-hidden">
        <Image
          src={s.image.src}
          alt={s.image.alt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
          className={PHOTO}
        style={{ objectPosition: s.image.position }}
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
          <span className="label bg-grafito/75 px-2 py-1 text-white">{s.group}</span>
          <Arrow />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
        <h3 className="text-[clamp(24px,2.2vw,30px)] font-medium leading-[1.05] tracking-tight2">
          {s.title}
        </h3>
        <p className={`text-[15px] leading-snug ${t.text}`}>{s.description}</p>
      </div>
    </>
  );
}

export function Services() {
  return (
    <section id="servicios" className="scroll-mt-[72px] bg-papel">
      <div className="wrap py-[clamp(64px,9vw,128px)]">
        <SectionHead
          label="Servicios"
          title="Siete rubros para llevar tu obra de principio a fin."
        />

        <ServiceTrack count={SERVICES.length}>
          {SERVICES.map((s, i) => {
            const l = LAYOUT[i];
            const t = TONES[l.tone];
            return (
              <li
                key={s.title}
                className={`flex shrink-0 basis-[82%] snap-start md:basis-auto ${l.span}`}
              >
                <Reveal delay={i * 70} className="flex w-full">
                  <a
                    href={whatsappLink(`Hola, quiero pedir presupuesto de: ${s.title}.`)}
                    target="_blank"
                    rel="noopener"
                    aria-label={`${s.title}. Pedir presupuesto por WhatsApp`}
                    className={`group relative flex w-full flex-col overflow-hidden rounded-[6px] transition-transform duration-300 hover:-translate-y-1 ${t.card} ${
                      l.big ? "min-h-[420px] justify-between gap-10 p-6 md:p-8" : ""
                    }`}
                  >
                    {l.big ? (
                      <BigCard s={s} tone={l.tone} />
                    ) : (
                      <SmallCard s={s} tone={l.tone} />
                    )}
                  </a>
                </Reveal>
              </li>
            );
          })}
        </ServiceTrack>
      </div>
    </section>
  );
}

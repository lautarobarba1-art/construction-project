import { WHATSAPP_URL } from "@/lib/contact";
import { ContactForm } from "./ContactForm";
import { CopyButton } from "./CopyButton";
import { InView } from "./InView";
import { Reveal } from "./Reveal";
import { Words } from "./Words";

const PHONE_DISPLAY = "3492 526640";
const PHONE_TEL = "+543492526640";
const MAP_URL = "https://www.google.com/maps/search/?api=1&query=Rafaela,+Santa+Fe";

const row =
  "flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-t border-grafito/25 py-5";

export function ContactPageContent() {
  return (
    <section className="bg-gris text-grafito md:min-h-[calc(100vh-72px)]">
      <div className="wrap py-[clamp(64px,9vw,128px)]">
        <InView className="relative pt-4">
          <span aria-hidden className="iv-line absolute inset-x-0 top-0 h-px bg-grafito/25" />
          <p className="label fade mb-6">Contacto</p>
          <h1 className="mb-[clamp(40px,6vw,80px)] max-w-[12ch] text-balance text-[clamp(52px,10vw,148px)] font-medium leading-[0.92] tracking-display">
            <Words
              text="Hablemos de tu obra"
              accent={<span className="text-teal-dark">.</span>}
            />
          </h1>
        </InView>

        <div className="grid gap-[clamp(40px,6vw,96px)] md:grid-cols-2">
          <Reveal>
            <div>
              <div className={row}>
                <span className="label">Teléfono</span>
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="text-[clamp(22px,2.4vw,28px)] font-medium tabular-nums hover:text-teal-dark"
                >
                  {PHONE_DISPLAY}
                </a>
                <CopyButton text={PHONE_DISPLAY} />
              </div>
              <div className={row}>
                <span className="label">WhatsApp</span>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener"
                  className="text-[clamp(22px,2.4vw,28px)] font-medium hover:text-teal-dark"
                >
                  Abrir el chat <span aria-hidden>↗</span>
                </a>
              </div>
              <div className={`${row} border-b`}>
                <span className="label">Ubicación</span>
                <span className="text-[clamp(22px,2.4vw,28px)] font-medium">
                  Rafaela, Santa Fe
                </span>
                <a
                  href={MAP_URL}
                  target="_blank"
                  rel="noopener"
                  className="label rounded border border-grafito/40 px-2.5 py-1.5 transition-colors duration-200 hover:bg-grafito hover:text-white"
                >
                  Ver mapa ↗
                </a>
              </div>
              <p className="mt-6 max-w-[34ch]">
                Contanos qué querés construir y te respondemos para coordinar el
                relevamiento.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

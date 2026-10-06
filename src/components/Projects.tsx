import { whatsappLink } from "@/lib/contact";
import { ProjectGallery } from "./ProjectGallery";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

export function Projects() {
  return (
    <section id="proyectos" className="scroll-mt-[72px] bg-grafito text-papel">
      <div className="wrap py-[clamp(64px,9vw,128px)]">
        <SectionHead dark label="Proyectos" title="Proyectos realizados.">
          <p className="max-w-[48ch] text-gris">
            Fotos reales de obras de Pala: viviendas, escaleras, baños y
            estructuras en steel framing.
          </p>
        </SectionHead>

        <Reveal>
          <ProjectGallery />
        </Reveal>

        <Reveal>
          <div className="mt-[clamp(48px,7vw,96px)] flex flex-col gap-6 border-t border-white/20 pt-8 md:flex-row md:items-center md:justify-between">
            <p className="max-w-[28ch] text-[clamp(24px,3vw,36px)] font-medium leading-tight tracking-tight2">
              ¿Tenés una obra en mente?
            </p>
            <a
              href={whatsappLink("Hola, me gustaría contarles mi proyecto.")}
              target="_blank"
              rel="noopener"
              className="btn btn-primary self-start"
            >
              Contanos tu proyecto <span className="arr" aria-hidden>↗</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

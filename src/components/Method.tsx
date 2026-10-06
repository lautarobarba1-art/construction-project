import { MethodStory } from "./MethodStory";
import { SectionHead } from "./SectionHead";

export function Method() {
  return (
    <section id="metodo" className="scroll-mt-[72px] bg-papel">
      <div className="wrap py-[clamp(64px,9vw,128px)]">
        <SectionHead
          label="Cómo trabajamos"
          title="Cuatro etapas, del primer relevamiento a la entrega."
        />

        <MethodStory />
      </div>
    </section>
  );
}

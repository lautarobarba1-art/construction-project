export type ServiceGroup = "Obra nueva" | "Intervención" | "Terminación" | "Sistema";

export type Service = {
  group: ServiceGroup;
  title: string;
  description: string;
  /** Foto real de Pala (de /public/images/proyectos). */
  image: { src: string; alt: string; position?: string };
};

const photo = (name: string) => `/images/proyectos/${name}.jpg`;

/** Textos tomados del catálogo de Pala. */
export const SERVICES: Service[] = [
  {
    group: "Obra nueva",
    title: "Construcción de casas",
    description:
      "Realizamos proyectos de viviendas adaptados a cada necesidad, cuidando cada etapa de la obra desde el inicio hasta la entrega final.",
    image: {
      src: photo("vivienda-dos-plantas"),
      alt: "Vivienda de dos plantas terminada, con frente gris y detalles en piedra",
      position: "center 45%",
    },
  },
  {
    group: "Obra nueva",
    title: "Construcción de departamentos",
    description:
      "Desarrollamos proyectos de departamentos con planificación y seguimiento en cada etapa, garantizando una ejecución eficiente y ordenada.",
    image: {
      src: photo("escalera-revestida"),
      alt: "Escalera con revestimiento símil madera junto a una ventana",
      position: "center 55%",
    },
  },
  {
    group: "Intervención",
    title: "Reformas y ampliaciones",
    description:
      "Llevamos adelante reformas y ampliaciones, optimizando espacios y mejorando la funcionalidad de cada proyecto.",
    image: {
      src: photo("vivienda-muro-ladrillo"),
      alt: "Muro de ladrillo visto con una abertura, en etapa de obra",
      position: "center 35%",
    },
  },
  {
    group: "Terminación",
    title: "Terminaciones de obra",
    description:
      "Cerramos cada proyecto con terminaciones prolijas y atención al detalle, hasta la entrega final.",
    image: {
      src: photo("bano-madera-2"),
      alt: "Ducha con grifería negra y revestimiento símil madera",
      position: "center 35%",
    },
  },
  {
    group: "Terminación",
    title: "Colocación de durlock",
    description:
      "Ejecutamos trabajos en durlock para divisiones, cielorrasos y terminaciones, logrando espacios funcionales y prolijos.",
    image: {
      src: photo("escalera-hormigon"),
      alt: "Escalera de hormigón con paredes lisas en etapa de terminación",
      position: "center 30%",
    },
  },
  {
    group: "Terminación",
    title: "Pintura interior y exterior",
    description:
      "Realizamos trabajos de pintura cuidando la preparación de superficies y los detalles, para un acabado uniforme y duradero.",
    image: {
      src: photo("vivienda-obra-gris"),
      alt: "Vivienda con revoque grueso, lista para la preparación de superficies",
      position: "center 60%",
    },
  },
  {
    group: "Sistema",
    title: "Construcción en steel framing",
    description:
      "Desarrollamos proyectos mediante el sistema steel framing, una alternativa moderna que permite una construcción más ágil, eficiente y de alta calidad.",
    image: {
      src: photo("steel-framing-nave"),
      alt: "Estructura de steel framing armada dentro de una nave",
      position: "center 55%",
    },
  },
];

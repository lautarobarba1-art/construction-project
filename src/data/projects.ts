export type ProjectCategory = "Viviendas" | "Escaleras" | "Baños" | "Steel framing";

export type ProjectPhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
  category: ProjectCategory;
};

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "Viviendas",
  "Escaleras",
  "Baños",
  "Steel framing",
];

const dir = "/images/proyectos";

/**
 * Fotos reales de obras de Pala, tomadas del catálogo.
 * El orden es el de la galería: las primeras seis son las que se ven al inicio.
 */
export const PROJECT_PHOTOS: ProjectPhoto[] = [
  {
    src: `${dir}/vivienda-frente-terminado.jpg`,
    width: 1600,
    height: 900,
    alt: "Frente de una vivienda terminado, con portón de garaje blanco y puerta lateral",
    category: "Viviendas",
  },
  {
    src: `${dir}/bano-madera-2.jpg`,
    width: 960,
    height: 1280,
    alt: "Ducha con grifería negra y revestimiento símil madera",
    category: "Baños",
  },
  {
    src: `${dir}/escalera-madera.jpg`,
    width: 1080,
    height: 1440,
    alt: "Peldaños de escalera con revestimiento símil madera",
    category: "Escaleras",
  },
  {
    src: `${dir}/vivienda-dos-plantas.jpg`,
    width: 1600,
    height: 1200,
    alt: "Vivienda de dos plantas terminada, con frente gris y detalles en piedra",
    category: "Viviendas",
  },
  {
    src: `${dir}/steel-framing-nave.jpg`,
    width: 1200,
    height: 1600,
    alt: "Estructura de steel framing armada dentro de una nave",
    category: "Steel framing",
  },
  {
    src: `${dir}/vivienda-muro-ladrillo.jpg`,
    width: 1200,
    height: 1600,
    alt: "Muro de ladrillo visto con una abertura, en etapa de obra",
    category: "Viviendas",
  },
  {
    src: `${dir}/vivienda-obra-gris.jpg`,
    width: 1600,
    height: 940,
    alt: "Vivienda en obra con revoque grueso y una escalera apoyada en la pared",
    category: "Viviendas",
  },
  {
    src: `${dir}/escalera-revestida.jpg`,
    width: 1440,
    height: 1080,
    alt: "Escalera con revestimiento símil madera junto a una ventana",
    category: "Escaleras",
  },
  {
    src: `${dir}/bano-marmolado-1.jpg`,
    width: 900,
    height: 1600,
    alt: "Baño con revestimiento y piso símil mármol blanco",
    category: "Baños",
  },
  {
    src: `${dir}/escalera-hormigon.jpg`,
    width: 1080,
    height: 1440,
    alt: "Escalera de hormigón en etapa de terminación",
    category: "Escaleras",
  },
  {
    src: `${dir}/bano-madera-1.jpg`,
    width: 960,
    height: 1280,
    alt: "Ducha con revestimientos símil madera y hormigón",
    category: "Baños",
  },
  {
    src: `${dir}/steel-framing-placas.jpg`,
    width: 1200,
    height: 1600,
    alt: "Módulo de steel framing con placas de cierre",
    category: "Steel framing",
  },
  {
    src: `${dir}/bano-marmolado-2.jpg`,
    width: 900,
    height: 1600,
    alt: "Pared de baño con revestimiento símil mármol oscuro con vetas",
    category: "Baños",
  },
  {
    src: `${dir}/bano-madera-3.jpg`,
    width: 960,
    height: 1280,
    alt: "Baño terminado con inodoro y revestimiento símil madera",
    category: "Baños",
  },
];

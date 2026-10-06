/**
 * URL pública del sitio. Se define al publicar con NEXT_PUBLIC_SITE_URL
 * (ej. https://palaconstrucciones.com.ar). Sin ella, usa el servidor local.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3340"
).replace(/\/$/, "");

export const SITE_NAME = "Pala Construcciones";

export const SITE_TITLE =
  "Pala Construcciones | Construcción de casas y reformas en Rafaela";

export const SITE_DESCRIPTION =
  "Construimos casas, departamentos, reformas y ampliaciones en Rafaela, Santa Fe. Durlock, pintura y steel framing. Pedí tu presupuesto.";

export const PHONE_E164 = "+543492526640";

export const PHONE_DISPLAY = "3492 526640";
export const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Rafaela,+Santa+Fe";

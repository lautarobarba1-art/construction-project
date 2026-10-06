import { SERVICES } from "@/data/services";
import { PHONE_E164, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

/** Datos estructurados (schema.org) para que Google entienda qué es Pala y dónde trabaja. */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${SITE_URL}/#empresa`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    logo: `${SITE_URL}/brand/logo.png`,
    image: `${SITE_URL}/og.png`,
    telephone: PHONE_E164,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rafaela",
      addressRegion: "Santa Fe",
      addressCountry: "AR",
    },
    areaServed: { "@type": "City", name: "Rafaela" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de construcción",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.description,
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      // "<" escapado para que ningún texto pueda cerrar la etiqueta
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

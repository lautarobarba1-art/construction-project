import type { Metadata } from "next";
import { ContactPageContent } from "@/components/ContactPageContent";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contanos tu proyecto y pedí tu presupuesto. Pala Construcciones, Rafaela, Santa Fe.",
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: "Contacto | Pala Construcciones",
    description:
      "Contanos tu proyecto y pedí tu presupuesto. Pala Construcciones, Rafaela, Santa Fe.",
    url: "/contacto",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
};

export default function ContactoPage() {
  return (
    <>
      <Header />
      <main>
        <ContactPageContent />
      </main>
      <Footer />
    </>
  );
}

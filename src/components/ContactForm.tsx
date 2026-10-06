"use client";

import { useRef, useState } from "react";
import { SERVICES } from "@/data/services";
import { whatsappLink } from "@/lib/contact";

const OTHER = "Otro / no estoy seguro";

const field =
  "w-full border-0 border-b border-grafito/40 bg-transparent px-0 py-2.5 text-[18px] font-medium text-grafito outline-none transition-colors placeholder:font-normal placeholder:text-grafito/60 focus:border-teal-dark focus:ring-0 rounded-none";

export function ContactForm() {
  const nameRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [link, setLink] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("nombre") ?? "").trim();
    const type = String(data.get("tipo") ?? OTHER);
    const message = String(data.get("mensaje") ?? "").trim();

    if (!name) {
      setError("Escribí tu nombre para que sepamos cómo llamarte.");
      nameRef.current?.focus();
      return;
    }
    setError("");

    const text =
      `Hola, soy ${name}. Quiero consultar por: ${type}.` +
      (message ? `\n\n${message}` : "");
    const url = whatsappLink(text);
    setLink(url);
    window.open(url, "_blank", "noopener");
  };

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-7">
      <div className="grid gap-2">
        <label htmlFor="nombre" className="label">
          Nombre
        </label>
        <input
          ref={nameRef}
          id="nombre"
          name="nombre"
          type="text"
          autoComplete="name"
          placeholder="Tu nombre"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "nombre-error" : undefined}
          onChange={() => error && setError("")}
          className={field}
        />
        {error && (
          <p id="nombre-error" role="alert" className="text-sm font-medium text-grafito">
            {error}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <label htmlFor="tipo" className="label">
          Qué necesitás
        </label>
        <select id="tipo" name="tipo" defaultValue={SERVICES[0].title} className={field}>
          {SERVICES.map((s) => (
            <option key={s.title} value={s.title}>
              {s.title}
            </option>
          ))}
          <option value={OTHER}>{OTHER}</option>
        </select>
      </div>

      <div className="grid gap-2">
        <label htmlFor="mensaje" className="label">
          Mensaje <span className="normal-case tracking-normal opacity-70">(opcional)</span>
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={3}
          placeholder="Contanos qué querés hacer, en qué zona y para cuándo."
          className={`${field} resize-none`}
        />
      </div>

      <div className="grid gap-3">
        <div>
          <button type="submit" className="btn btn-dark">
            Enviar por WhatsApp <span className="arr" aria-hidden>↗</span>
          </button>
        </div>
        {link && (
          <p role="status" className="text-sm">
            Se abrió WhatsApp con tu mensaje. Si no se abrió,{" "}
            <a href={link} target="_blank" rel="noopener" className="font-medium underline underline-offset-4">
              tocá acá
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}

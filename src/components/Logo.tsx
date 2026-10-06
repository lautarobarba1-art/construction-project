import Image from "next/image";
import Link from "next/link";

/**
 * Logo de Pala (círculo gris con la diagonal PA/LA).
 * Archivo: /public/brand/logo.png. Para cambiarlo, reemplazar ese archivo
 * (cuadrado, con fondo transparente) sin tocar el código.
 */
const LOGO_SRC = "/brand/logo.png";
const INTRINSIC = 240; // tamaño real del archivo, para pantallas de alta densidad

/** Solo la imagen, sin enlace. */
export function LogoMark({
  size = 52,
  alt = "Pala Construcciones",
  priority = false,
}: {
  size?: number;
  alt?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={LOGO_SRC}
      alt={alt}
      width={INTRINSIC}
      height={INTRINSIC}
      sizes={`${size}px`}
      priority={priority}
      className="flex-none rounded-full"
      style={{ width: size, height: size }}
    />
  );
}

/** Logo con enlace a la home. */
export function Logo({ size = 52, priority = false }: { size?: number; priority?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Pala Construcciones, inicio"
      className="inline-flex items-center"
    >
      <LogoMark size={size} alt="" priority={priority} />
    </Link>
  );
}

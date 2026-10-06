# PALA Construcciones · Design System

Estado: **paleta cerrada** (gris de marca + teal). Logo, tipografía final y estructura siguen en revisión, paso a paso.

## Color (tokens en `tailwind.config.ts`)
| Token | Hex | Rol |
|---|---|---|
| `gris` | `#A6A6A6` | **Color de marca**, tomado del logo del catálogo. Superficies grandes (hero, bloques) |
| `grafito` | `#1F2124` | Tinta y secciones oscuras |
| `piedra` | `#5F6368` | Texto secundario sobre claro |
| `hormigon` | `#E4E4E1` | Divisores |
| `papel` | `#F6F6F4` | Fondo claro |
| `teal` | `#0F766E` | Único acento: botones y detalles. `teal-dark #0B5F59` hover, `teal-light #4FBFB0` sobre oscuro |

### Reglas de contraste (medidas)
- Texto `grafito` sobre `gris`: 6,6:1. Es el par base para superficies de marca.
- `gris` como texto sobre papel: 2,3:1, no se usa. Texto secundario va en `piedra` (5,6:1).
- Texto blanco sobre `gris`: no cumple, no se usa.
- Teal como texto sobre `gris`: 2,3:1, no se usa. Sobre `gris` el teal solo va como relleno de botón con texto blanco (5,5:1).
- Sobre `grafito`, el teal pasa a `teal-light` (7,2:1).
- Proporción orientativa: 50% neutros claros y gris, 35% grafito, 15% teal.

## Logo
Círculo gris (`#A6A6A6`) con "PA/LA" en serif y la diagonal, más "CONSTRUCCIONES" debajo. Archivo: `public/brand/logo.png` (240 x 240, fondo transparente), usado en el menú, el panel de mobile, el footer, el favicon y los datos para Google.
Salió de una captura de pantalla, así que es de baja resolución: se ve bien hasta unos 90 px. Para reemplazarlo por el original, sobrescribir ese archivo (cuadrado, fondo transparente, idealmente de 600 px o más) sin tocar código. `LogoMark` y `Logo` están en `src/components/Logo.tsx`.

## Pendiente (próximos pasos)
1. Estructura y contenido de la página, luego componentes.
2. Datos a confirmar: WhatsApp (`+54 9 3492 526640`), cantidad de obras, fotos reales.

## SEO local
- Metadatos, Open Graph, Twitter y canonical en `src/app/layout.tsx` (y propios en `src/app/contacto/page.tsx`).
- Datos estructurados `GeneralContractor` (schema.org) en `src/components/JsonLd.tsx`, con los 7 servicios y Rafaela como zona.
- `robots.ts` y `sitemap.ts` generan `/robots.txt` y `/sitemap.xml`.
- Imagen para compartir: `public/og.png` (1200x630). Ícono: `src/app/icon.png` y `apple-icon.png`. **Provisorios**: regenerar con el logo definitivo.
- **Al publicar:** definir `NEXT_PUBLIC_SITE_URL` (ver `.env.example`) con el dominio real; si no, canonical, sitemap y Open Graph apuntan a localhost.
- Fuera del código: crear el perfil de Google Business Profile, verificar el sitio en Google Search Console y enviar el sitemap.

## Botones
Pastilla con círculo (`.btn` en `src/app/globals.css`): texto a la izquierda y la flecha en un círculo a la derecha. Al pasar el mouse la pastilla se llena y el círculo gira 45°.
Color: el gris del logo (`gris #A6A6A6`) con texto grafito (6,6:1).
Variantes: `btn-primary` (gris, sobre fotos y fondos oscuros o teal) y `btn-dark` (grafito, solo para fondos grises, donde el gris no se vería, como `/contacto`). La flecha lleva siempre `<span className="arr">`; para flecha hacia abajo, `arr arr-down`.
El menú superior no lleva botón: la acción principal está en el hero y en el cierre.

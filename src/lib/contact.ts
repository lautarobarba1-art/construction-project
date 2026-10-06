export const WHATSAPP_NUMBER = "5493492526640";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

/** Link a WhatsApp con un mensaje pre-armado. */
export function whatsappLink(message: string) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}

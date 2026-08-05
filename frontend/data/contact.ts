import type { ContactChannel } from "@/types/api/contact";

export const CONTACT_CHANNELS: ContactChannel[] = [
  { icon: "📧", title: "Email", desc: "soporte@nexamarket.com", href: "mailto:soporte@nexamarket.com" },
  { icon: "📞", title: "Teléfono", desc: "+56 9101 2456", href: "tel:+34910123456" },
  { icon: "💬", title: "WhatsApp", desc: "Atención 24/7", href: "#" },
  { icon: "📍", title: "Oficina", desc: "Calle Mayor 123, Madrid", href: "#" },
];

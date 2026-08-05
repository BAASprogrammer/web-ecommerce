import { Truck, Lock, RotateCcw, MessageCircle } from "lucide-react";
import type { TrustSignal, WhyUsFeature, FooterColumn, CountdownItem } from "@/types/content/home";

export const TRUST_SIGNALS: TrustSignal[] = [
  { icon: Truck, label: "Envío gratis" },
  { icon: Lock, label: "Pago seguro" },
  { icon: RotateCcw, label: "30 días devolución" },
];

export const WHY_US_FEATURES: WhyUsFeature[] = [
  { icon: Truck, title: "Envío Rápido", desc: "Recibe tu pedido en 24-48 horas en todo el país" },
  { icon: Lock, title: "Pago 100% Seguro", desc: "Tus datos protegidos con encriptación SSL" },
  { icon: RotateCcw, title: "Devolución Fácil", desc: "30 días para devolver sin preguntas" },
  { icon: MessageCircle, title: "Soporte 24/7", desc: "Expertos disponibles para ayudarte siempre" },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  { title: "Productos", links: ["Electrónica", "Moda", "Deporte", "Hogar", "Tecnología"] },
  { title: "Empresa", links: ["Sobre Nosotros", "Trabaja con Nosotros", "Blog", "Prensa"] },
  { title: "Soporte", links: ["Centro de Ayuda", "Seguimiento", "Devoluciones", "Contacto"] },
];

export const COUNTDOWN: CountdownItem[] = [
  { val: "12", label: "Horas" },
  { val: "34", label: "Min" },
  { val: "57", label: "Seg" },
];

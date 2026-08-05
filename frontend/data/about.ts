import type { AboutValue, AboutMilestone, TeamMember } from "@/types/content/about";

export const ABOUT_STATS = [
  { value: "2018", label: "Desde" },
  { value: "50K+", label: "Productos" },
  { value: "200K+", label: "Clientes" },
  { value: "4.9★", label: "Valoración" },
];

export const ABOUT_VALUES: AboutValue[] = [
  { icon: "🤝", title: "Confianza", desc: "Construimos relaciones duraderas con nuestros clientes y socios" },
  { icon: "⚡", title: "Rapidez", desc: "Entregas ágiles y atención inmediata en todo momento" },
  { icon: "🛡️", title: "Calidad", desc: "Seleccionamos cada producto con los más altos estándares" },
  { icon: "🌱", title: "Sostenibilidad", desc: "Embalajes reciclables y envíos responsables" },
];

export const ABOUT_MILESTONES: AboutMilestone[] = [
  { year: "2018", title: "Nace NexaMarket", desc: "Empezamos como una pequeña tienda online con solo 100 productos." },
  { year: "2020", title: "100K clientes", desc: "Superamos los 100.000 clientes en todo el país." },
  { year: "2022", title: "Expansión", desc: "Ampliamos el catálogo a más de 50.000 productos." },
  { year: "2024", title: "Logística propia", desc: "Implementamos nuestra red de envíos con entrega en 24-48h." },
];

export const TEAM_MEMBERS: TeamMember[] = [
  { name: "María González", role: "CEO & Fundadora", photo: "/hero-banner.png" },
  { name: "Carlos Ruiz", role: "CTO", photo: "/hero-banner.png" },
  { name: "Lucía Fernández", role: "Directora de Operaciones", photo: "/hero-banner.png" },
];

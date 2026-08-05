import type { Category, Stat, SortOption } from "@/types/api/product";
import { BRAND_COLORS } from "@/constants/colors";

export const CATEGORIES: Category[] = [
  { label: "Electrónica", icon: "💻", color: "#EEF2FF", border: "#818CF8", count: 1240 },
  { label: "Moda",        icon: "👗", color: "#FDF2F8", border: "#E879F9", count: 3850 },
  { label: "Deporte",     icon: "⚽", color: "#ECFDF5", border: "#34D399", count: 920  },
  { label: "Hogar",       icon: "🏠", color: "#FFFBEB", border: "#FCD34D", count: 2100 },
  { label: "Tecnología",  icon: "📱", color: BRAND_COLORS.primaryXLight, border: BRAND_COLORS.primary, count: 780  },
  { label: "Libros",      icon: "📚", color: "#F0F9FF", border: "#38BDF8", count: 5300 },
];

export const SORT_OPTIONS: SortOption[] = [
  { value: "featured",   label: "Destacados" },
  { value: "price-asc",  label: "Precio: Menor a Mayor" },
  { value: "price-desc", label: "Precio: Mayor a Menor" },
  { value: "rating",     label: "Mejor Valorados" },
];

export const STATS: Stat[] = [
  { value: "50K+",  label: "Productos disponibles" },
  { value: "200K+", label: "Clientes satisfechos" },
  { value: "99%",   label: "Entregas a tiempo" },
  { value: "24/7",  label: "Soporte al cliente" },
];

"use client";
import { Package, Tags, MessageSquare } from "lucide-react";

export type AdminSection = "productos" | "categorias" | "mensajes";

const ITEMS: { id: AdminSection; label: string; icon: React.ReactNode }[] = [
  { id: "productos", label: "Productos", icon: <Package size={18} /> },
  { id: "categorias", label: "Categorías", icon: <Tags size={18} /> },
  { id: "mensajes", label: "Mensajes de Contacto", icon: <MessageSquare size={18} /> },
];

export default function AdminSidebar({
  activeSection,
  onSelect,
}: {
  activeSection: AdminSection;
  onSelect: (section: AdminSection) => void;
}) {
  return (
    <aside className="w-full lg:w-64 shrink-0 bg-white rounded-2xl border border-gray-200 p-3">
      <nav className="flex lg:flex-col gap-1">
        {ITEMS.map((item) => {
          const active = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              aria-pressed={active}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[0.9rem] font-semibold transition-all duration-200 border-none cursor-pointer w-full text-left ${
                active
                  ? "bg-brand text-white"
                  : "text-gray-600 hover:bg-brand-xlight hover:text-brand"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

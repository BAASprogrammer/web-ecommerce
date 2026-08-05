"use client";
import Link from "next/link";
import { FOOTER_COLUMNS } from "@/data/home";
import Nexalogo from "@/public/nexalogo.png";
import { useLegalModal } from "@/components/ui/LegalModal";

export default function Footer() {
  const { openTerms, openPrivacy } = useLegalModal();
  return (
    <footer className="bg-gray-900 text-gray-400 pt-12 pb-6 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 pb-8 border-b border-gray-700">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <img src={Nexalogo.src} alt="Logo" />
            </div>
            <span className="text-xl font-extrabold text-white">
              Nexa<span className="text-brand">Market</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed max-w-[280px]">
            Tu tienda online de confianza. Más de 50.000 productos con
            los mejores precios y entrega rápida.
          </p>
        </div>
        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="text-white font-bold mb-4 text-[0.9375rem]">
              {col.title}
            </h4>
            <ul className="list-none flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-sm transition-colors duration-200 hover:text-brand"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto pt-6 flex items-center justify-between text-[0.8125rem] flex-wrap gap-2">
        <p>© 2026 NexaMarket. Todos los derechos reservados.</p>
        <div className="flex gap-6">
          {(["Términos", "Privacidad"] as const).map((item) => (
            <button
              key={item}
              id={`footer-${item.toLowerCase()}`}
              type="button"
              onClick={item === "Términos" ? openTerms : openPrivacy}
              className="transition-colors duration-200 hover:text-brand"
            >
              {item}
            </button>
          ))}
          <Link
            href="#"
            className="transition-colors duration-200 hover:text-brand"
          >
            Cookies
          </Link>
          <Link
            href="/admin"
            className="transition-colors duration-200 hover:text-brand"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}

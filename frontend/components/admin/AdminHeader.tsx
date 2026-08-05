"use client";
import Link from "next/link";
import Nexalogo from "@/public/nexalogo.png";

export default function AdminHeader() {
  return (
    <header className="sticky top-0 z-50 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-6">
        <Link href="/" id="admin-header-logo" className="flex items-center gap-2">
          <div className="w-10 h-10">
            <img src={Nexalogo.src} alt="Logo NexaMarket" />
          </div>
          <span className="text-lg font-extrabold tracking-tight">
            Nexa<span className="text-brand-light">Market</span>
            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-md bg-brand text-white text-[0.65rem] font-bold uppercase tracking-wider align-middle">
              Admin
            </span>
          </span>
        </Link>
        <Link
          href="/"
          id="admin-header-back"
          className="px-4 py-2 rounded-lg text-[0.85rem] font-semibold text-gray-300 bg-white/8 transition-all duration-200 hover:bg-white/15 hover:text-white"
        >
          ← Volver a la tienda
        </Link>
      </div>
    </header>
  );
}

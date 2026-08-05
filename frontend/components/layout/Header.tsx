"use client";
import Link from "next/link";
import { useState } from "react";
import { LogOut, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { NAV_ITEMS } from "@/data/navigation";
import { useAuth } from "@/context/AuthContext";
import Nexalogo from "@/public/nexalogo.png";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartCount] = useState(3);
    const { user, isAdmin, logout } = useAuth();
    const router = useRouter();

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            {/* Top bar */}
            <div className="bg-gray-900 text-gray-100 text-[0.8rem] text-center py-1.5 px-4 font-medium">
                🎉 Envío gratis en compras mayores a $50.000 —{" "}
                <Link href="/products" className="text-brand underline">
                    Ver productos
                </Link>
            </div>

            {/* Main nav */}
            <div className="max-w-7xl mx-auto flex items-center justify-between py-3.5 px-6">
                {/* Logo */}
                <Link
                    href="/"
                    id="header-logo"
                    className="flex items-center gap-2"
                >
                    <div className="w-16 h-16">
                        <img src={Nexalogo.src} alt="Logo" />
                    </div>
                    <span className="text-[1.375rem] font-extrabold text-gray-900 tracking-tight">
                        Nexa<span className="text-brand">Market</span>
                    </span>
                </Link>

                {/* Nav links — desktop */}
                <nav
                    id="header-nav"
                    className="hidden md:flex items-center gap-1"
                >
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="px-4 py-2 rounded-lg text-[0.9375rem] font-medium text-gray-700 transition-all duration-200 hover:text-brand hover:bg-brand-xlight"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Right actions */}
                <div className="flex items-center gap-3">
                    {/* Cart */}
                    <button
                        id="header-cart-btn"
                        aria-label="Carrito de compras"
                        className="relative bg-gray-100 border-none rounded-[10px] w-[42px] h-[42px] flex items-center justify-center text-lg transition-colors duration-200 hover:bg-brand-light"
                    >
                        <ShoppingCart size={20} />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-brand text-white text-[0.65rem] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-white">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    {/* Auth buttons — desktop */}
                    <div className="hidden md:flex items-center gap-2">
                        {user ? (
                            <>
                                {isAdmin && (
                                    <Link
                                        id="header-admin-btn"
                                        href="/admin"
                                        className="px-[1.125rem] py-2 border-[1.5px] border-gray-200 rounded-[10px] text-[0.9rem] font-semibold text-gray-700 bg-white transition-all duration-200 hover:border-brand hover:text-brand"
                                    >
                                        Admin
                                    </Link>
                                )}
                                <span className="px-1 text-[0.9rem] font-semibold text-gray-700 max-w-[120px] truncate">
                                    {user.name}
                                </span>
                                <button
                                    id="header-logout-btn"
                                    type="button"
                                    onClick={() => {
                                        logout();
                                        router.push("/");
                                    }}
                                    className="inline-flex items-center gap-2 px-[1.125rem] py-2 border-[1.5px] border-gray-200 rounded-[10px] text-[0.9rem] font-semibold text-gray-700 bg-white transition-all duration-200 hover:border-red-300 hover:text-red-500"
                                >
                                    <LogOut size={16} />
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    id="header-login-btn"
                                    href="/login"
                                    className="px-[1.125rem] py-2 border-[1.5px] border-gray-200 rounded-[10px] text-[0.9rem] font-semibold text-gray-700 bg-white transition-all duration-200 hover:border-brand hover:text-brand"
                                >
                                    Iniciar Sesión
                                </Link>
                                <Link
                                    id="header-register-btn"
                                    href="/register"
                                    className="px-[1.125rem] py-2 border-[1.5px] border-brand rounded-[10px] text-[0.9rem] font-semibold text-white bg-brand transition-all duration-200 hover:bg-brand-dark hover:border-brand-dark"
                                >
                                    Registrarse
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Hamburger — mobile */}
                    <button
                        id="header-menu-toggle"
                        aria-label="Menú"
                        className="md:hidden bg-gray-100 border-none rounded-[10px] w-[42px] h-[42px] flex flex-col items-center justify-center gap-[5px]"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <span
                            className={`w-5 h-0.5 bg-gray-700 rounded-sm transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""
                                }`}
                        />
                        <span
                            className={`w-5 h-0.5 bg-gray-700 rounded-sm transition-opacity duration-200 ${menuOpen ? "opacity-0" : "opacity-100"
                                }`}
                        />
                        <span
                            className={`w-5 h-0.5 bg-gray-700 rounded-sm transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                                }`}
                        />
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="bg-white border-t border-gray-200 px-6 py-4 flex flex-col gap-2">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMenuOpen(false)}
                            className="px-4 py-3 rounded-lg text-base font-medium text-gray-700 bg-gray-50 block"
                        >
                            {item.label}
                        </Link>
                    ))}
                    <hr className="border-none border-t border-gray-200 my-2" />
                    {user ? (
                        <>
                            {isAdmin && (
                                <Link
                                    href="/admin"
                                    onClick={() => setMenuOpen(false)}
                                    className="px-4 py-3 rounded-lg text-base font-semibold text-gray-700 border-[1.5px] border-gray-200 text-center block"
                                >
                                    Panel de Administración
                                </Link>
                            )}
                            <span className="px-4 py-2 rounded-lg text-base font-semibold text-gray-700 bg-gray-50 text-center block">
                                {user.name}
                            </span>
                            <button
                                type="button"
                                onClick={() => {
                                    setMenuOpen(false);
                                    logout();
                                    router.push("/");
                                }}
                                className="px-4 py-3 rounded-lg text-base font-semibold text-red-500 border-[1.5px] border-red-200 text-center block"
                            >
                                Cerrar Sesión
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                onClick={() => setMenuOpen(false)}
                                className="px-4 py-3 rounded-lg text-base font-semibold text-gray-700 border-[1.5px] border-gray-200 text-center block"
                            >
                                Iniciar Sesión
                            </Link>
                            <Link
                                href="/register"
                                onClick={() => setMenuOpen(false)}
                                className="px-4 py-3 rounded-lg text-base font-semibold text-white bg-brand text-center block"
                            >
                                Registrarse
                            </Link>
                        </>
                    )}
                </div>
            )}
        </header>
    );
}

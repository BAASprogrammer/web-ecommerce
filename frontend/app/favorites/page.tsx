"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Heart } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";
import { useProducts } from "@/context/ProductsContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useAuth } from "@/context/AuthContext";
import { PRODUCTS_PER_PAGE, useProductFilters } from "@/hooks/products/useProductFilters";
import Pagination from "@/components/products/Pagination";

export default function FavoritesPage() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const { products } = useProducts();
  const { favoriteIds } = useFavorites();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && (!user || isAdmin)) {
      router.replace("/login");
    }
  }, [mounted, user, isAdmin, router]);

  const favoriteProducts = useMemo(
    () => products.filter((p) => favoriteIds.includes(p.id)),
    [products, favoriteIds]
  );

  const {
    paginated,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useProductFilters(favoriteProducts);

  if (!mounted || !user || isAdmin) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50 min-h-[calc(100vh-64px)]">
        {/* Page header */}
        <div className="bg-white border-b border-gray-200 py-6">
          <div className="max-w-7xl mx-auto px-6">
            <nav className="text-[0.8125rem] text-gray-500 mb-3">
              <Link href="/" className="hover:text-brand transition-colors">
                Inicio
              </Link>
              <span className="mx-2">›</span>
              <span className="text-gray-900 font-semibold">Favoritos</span>
            </nav>
            <div className="flex items-center gap-4">
              <span className="w-11 h-11 bg-rose-100 text-rose-500 rounded-xl flex items-center justify-center shrink-0">
                <Heart size={22} fill="currentColor" />
              </span>
              <div>
                <h1 className="text-[1.75rem] font-extrabold text-gray-900 tracking-tight">
                  Mis Favoritos
                </h1>
                <p className="text-gray-500 text-[0.9rem] mt-1">
                  {favoriteProducts.length} producto
                  {favoriteProducts.length !== 1 && "s"} guardado
                  {favoriteProducts.length !== 1 && "s"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-8 px-6">
          {favoriteProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 py-20 px-8 text-center">
              <div className="text-5xl mb-4">🤍</div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">
                Aún no tienes favoritos
              </h3>
              <p className="text-gray-500 text-[0.9rem] mb-6">
                Toca el corazón en cualquier producto para guardarlo aquí
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 py-3 px-6 bg-brand text-white rounded-xl font-bold transition-all duration-200 hover:bg-brand-dark"
              >
                Explorar productos <ArrowLeft size={16} className="rotate-180" />
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {paginated.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={favoriteProducts.length}
                pageSize={PRODUCTS_PER_PAGE}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
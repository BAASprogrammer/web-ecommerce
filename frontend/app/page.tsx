"use client";
import Image from "next/image";
import Link from "next/link";
import CategoryFilter from "@/components/products/CategoryFilter";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Pagination from "@/components/products/Pagination";
import ProductCard from "@/components/products/ProductCard";
import { useProducts } from "@/context/ProductsContext";
import { useCategories } from "@/context/CategoriesContext";
import { STATS } from "@/data/products";
import { COUNTDOWN, TRUST_SIGNALS, WHY_US_FEATURES } from "@/data/home";
import { PRODUCTS_PER_PAGE, useProductFilters } from "@/hooks/products/useProductFilters";

export default function HomePage() {
  const { products } = useProducts();
  const { filterCategories } = useCategories();
  const {
    selectedCategory,
    setSelectedCategory,
    filtered: filteredProducts,
    paginated,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useProductFilters(products);

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* HERO */}
        <section
          id="hero"
          className="relative min-h-[580px] flex items-center overflow-hidden text-white"
          style={{ background: "linear-gradient(135deg, #1E1B6F 0%, #3730A3 50%, #1E1B6F 100%)" }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 75% 50%, rgba(249,115,22,0.18) 0%, transparent 60%)" }} />
          <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "rgba(79,70,229,0.12)" }} />

          <div className="max-w-7xl mx-auto py-16 px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-brand/15 border border-brand/15 rounded-full px-4 py-1.5 text-sm font-semibold text-brand-light mb-6">
                <span className="w-2 h-2 bg-brand rounded-full animate-pulse-dot" />
                ¡Ofertas especiales activas!
              </div>

              <h1 className="font-display text-[clamp(2.25rem,5vw,3.75rem)] font-black leading-[1.05] tracking-tight mb-5 text-white">
                Todo lo que
                <br />
                necesitas,{" "}
                <span style={{ color: "#F97316" }}>en un lugar</span>
              </h1>

              <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-[480px]">
                Descubre miles de productos con los mejores precios. Envío
                rápido, devoluciones fáciles y atención personalizada.
              </p>

              <div className="flex gap-4 flex-wrap">
                <Link
                  href="/products"
                  id="hero-cta-primary"
                  className="inline-flex items-center gap-2 py-3.5 px-8 bg-brand text-white rounded-xl font-bold text-base transition-all duration-200 border-2 border-brand hover:bg-brand-dark hover:border-brand-dark hover:-translate-y-0.5 hover:shadow-brand-glow"
                >
                  Explorar Productos →
                </Link>
                <Link
                  href="/register"
                  id="hero-cta-secondary"
                  className="inline-flex items-center gap-2 py-3.5 px-8 bg-transparent text-white rounded-xl font-semibold text-base border-2 border-white/30 transition-all duration-200 hover:border-white/80 hover:bg-white/8"
                >
                  Crear Cuenta Gratis
                </Link>
              </div>

              {/* Trust signals */}
              <div className="flex gap-6 mt-10 flex-wrap">
                {TRUST_SIGNALS.map((item) => (
                  <span key={item.label} className="flex items-center gap-2 text-sm text-white/80 font-medium">
                    <item.icon size={16} className="text-white" />
                    {item.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Hero image */}
            <div className="relative h-[420px] rounded-[20px] overflow-hidden hidden md:block shadow-2xl">
              <Image
                src="/hero_banner.jpg"
                alt="Tienda online — productos destacados, ofertas y más"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 0vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* STATS */}
        <section id="stats" className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto py-10 px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center p-4 ${index < STATS.length - 1 ? "md:border-r md:border-gray-100" : ""
                  }`}
              >
                <div className="text-[2rem] font-black text-brand tracking-tight leading-none">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 mt-1 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CATEGORIES + PRODUCTS */}
        <section id="categories" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-[1.75rem] font-extrabold text-gray-900 tracking-tight">
                  Explorar Productos
                </h2>
                <p className="text-gray-500 mt-1 text-[0.9375rem]">
                  {filteredProducts.length} producto{filteredProducts.length !== 1 ? "s" : ""}{" "}
                  {selectedCategory === "Todas"
                    ? "disponibles"
                    : `en ${selectedCategory}`}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 items-start">
              <aside className="bg-white rounded-2xl border border-gray-200 p-6 lg:sticky lg:top-20">
                <h2 className="font-extrabold text-base text-gray-900 mb-6">
                  Filtros
                </h2>
                <CategoryFilter
                  categories={filterCategories}
                  products={products}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  idPrefix="home"
                />
                {selectedCategory !== "Todas" && (
                  <button
                    type="button"
                    onClick={() => setSelectedCategory("Todas")}
                    className="mt-6 w-full py-2.5 border-[1.5px] border-gray-200 rounded-[10px] bg-transparent text-gray-500 text-sm font-semibold cursor-pointer transition-all duration-200 hover:border-brand hover:text-brand"
                  >
                    Limpiar filtro
                  </button>
                )}
              </aside>

              <div>
                {filteredProducts.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-gray-200 py-16 px-8 text-center">
                    <div className="text-5xl mb-4">🔍</div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      No hay productos en esta categoría
                    </h3>
                    <p className="text-gray-500 text-[0.9rem]">
                      Prueba seleccionando otra categoría
                    </p>
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
                      totalItems={filteredProducts.length}
                      pageSize={PRODUCTS_PER_PAGE}
                      onPageChange={setCurrentPage}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* PROMO BANNER */}
        <section
          id="promo-banner"
          className="bg-gradient-to-br from-brand via-brand to-brand-dark py-16 px-6"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-8">
            <div>
              <p className="text-sm font-semibold text-brand-light mb-2 tracking-widest uppercase">
                Oferta por tiempo limitado
              </p>
              <h2 className="text-[2rem] font-black text-white tracking-tight leading-tight">
                Hasta 40% OFF en
                <br />
                Electrónica seleccionada
              </h2>
            </div>
            <div className="flex gap-4 items-center flex-wrap">
              {COUNTDOWN.map((item, i) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className="bg-black/25 rounded-[10px] py-3 px-4 text-center min-w-16">
                    <div className="text-[1.75rem] font-black text-white leading-none">
                      {item.val}
                    </div>
                    <div className="text-[0.625rem] text-brand-light font-semibold uppercase mt-0.5">
                      {item.label}
                    </div>
                  </div>
                  {i < 2 && (
                    <span className="text-white font-black text-2xl">:</span>
                  )}
                </div>
              ))}
              <Link
                href="/products"
                id="promo-cta"
                className="ml-4 py-3.5 px-8 bg-white text-brand-dark rounded-xl font-extrabold text-[0.9375rem] transition-all duration-200 inline-block border-2 border-white whitespace-nowrap hover:bg-brand-xlight"
              >
                Aprovechar Oferta →
              </Link>
            </div>
          </div>
        </section>

        {/* WHY US */}
        <section id="why-us" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-[1.75rem] font-extrabold text-center text-gray-900 mb-12 tracking-tight">
              ¿Por qué elegir NexaMarket?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {WHY_US_FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white rounded-2xl p-8 text-center border border-gray-200 transition-all duration-250 hover:border-brand-light hover:shadow-brand-soft hover:-translate-y-1"
                >
                  <div className="w-14 h-14 mx-auto mb-4 bg-brand-xlight rounded-2xl flex items-center justify-center">
                    <feature.icon size={28} strokeWidth={2.25} className="text-brand" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-base">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </>
  );
}

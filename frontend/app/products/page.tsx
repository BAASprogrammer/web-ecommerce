"use client";
import Header from "@/components/layout/Header";
import ProductCard from "@/components/products/ProductCard";
import CategoryFilter from "@/components/products/CategoryFilter";
import Pagination from "@/components/products/Pagination";
import { useProducts } from "@/context/ProductsContext";
import { useCategories } from "@/context/CategoriesContext";
import { SORT_OPTIONS } from "@/data/products";
import { PRODUCTS_PER_PAGE, useProductFilters } from "@/hooks/products/useProductFilters";

export default function ProductsPage() {
  const { products } = useProducts();
  const { filterCategories } = useCategories();
  const {
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    priceRange,
    setPriceRange,
    search,
    setSearch,
    filtered,
    paginated,
    currentPage,
    setCurrentPage,
    totalPages,
    resetFilters,
  } = useProductFilters(products);

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50 min-h-[calc(100vh-64px)]">
        {/* Page header */}
        <div className="bg-white border-b border-gray-200 py-6">
          <div className="max-w-7xl mx-auto px-6">
            <nav className="text-[0.8125rem] text-gray-500 mb-3">
              <span>Inicio</span>
              <span className="mx-2">›</span>
              <span className="text-gray-900 font-semibold">Productos</span>
            </nav>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-[1.75rem] font-extrabold text-gray-900 tracking-tight">
                  Todos los Productos
                </h1>
                <p className="text-gray-500 text-[0.9rem] mt-1">
                  {filtered.length} productos encontrados
                </p>
              </div>
              {/* Search */}
              <div className="relative min-w-[280px]">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base text-gray-400 pointer-events-none">
                  🔍
                </span>
                <input
                  id="products-search"
                  type="search"
                  placeholder="Buscar productos..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full py-2.5 pl-10 pr-4 border-[1.5px] border-gray-200 rounded-[10px] text-[0.9rem] outline-none transition-[border-color,box-shadow,background-color] duration-200 bg-gray-50 text-gray-900 focus:border-brand focus:shadow-[0_0_0_3px_rgb(5_150_105/0.15)] focus:bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-8 px-6 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 items-start">
          {/* SIDEBAR FILTERS */}
          <aside
            id="products-sidebar"
            className="bg-white rounded-2xl border border-gray-200 p-6 lg:sticky lg:top-20"
          >
            <h2 className="font-extrabold text-base text-gray-900 mb-6">
              Filtros
            </h2>

            {/* Category filter */}
            <div className="mb-8">
              <CategoryFilter
                categories={filterCategories}
                products={products}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>

            {/* Price range */}
            <div className="mb-8">
              <h3 className="font-bold text-sm text-gray-700 mb-3 uppercase tracking-wider">
                Precio Máximo
              </h3>
              <input
                id="price-range-slider"
                type="range"
                min={0}
                max={200000}
                step={5000}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                className="w-full accent-brand cursor-pointer"
              />
              <div className="flex justify-between mt-2">
                <span className="text-[0.8rem] text-gray-500">$0</span>
                <span className="text-[0.8rem] font-bold text-brand">
                  ${priceRange[1].toLocaleString("es-CL")}
                </span>
              </div>
            </div>

            {/* Sort */}
            <div>
              <h3 className="font-bold text-sm text-gray-700 mb-3 uppercase tracking-wider">
                Ordenar Por
              </h3>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full py-2.5 px-3.5 border-[1.5px] border-gray-200 rounded-[10px] text-sm text-gray-700 bg-white outline-none cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset */}
            <button
              id="filter-reset"
              onClick={resetFilters}
              className="mt-6 w-full py-2.5 border-[1.5px] border-gray-200 rounded-[10px] bg-transparent text-gray-500 text-sm font-semibold cursor-pointer transition-all duration-200 hover:border-brand hover:text-brand"
            >
              Limpiar Filtros
            </button>
          </aside>

          {/* PRODUCT GRID */}
          <div>
            {filtered.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 py-16 px-8 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="font-bold text-gray-900 mb-2">
                  No se encontraron productos
                </h3>
                <p className="text-gray-500 text-[0.9rem]">
                  Intenta ajustar los filtros o cambiar la búsqueda
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
                  totalItems={filtered.length}
                  pageSize={PRODUCTS_PER_PAGE}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

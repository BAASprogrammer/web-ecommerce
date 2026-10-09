"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Check, ShoppingCart } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FavoriteHeart from "@/components/products/FavoriteHeart";
import { useProducts } from "@/context/ProductsContext";
import { useProductCard } from "@/hooks/products/useProductCard";
import { useAuth } from "@/context/AuthContext";
import type { Product } from "@/types/api/product";

function ProductDetailContent({ product }: { product: Product }) {
  const { isWishlisted, setIsWishlisted, addedToCart, discount, handleAddToCart, formatPrice } =
    useProductCard(product);
  const { user, isAdmin } = useAuth();

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Math.floor(rating) ? "text-amber-500" : "text-gray-300"}>
        ★
      </span>
    ));

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <nav className="text-[0.8125rem] text-gray-500 mb-6">
        <Link href="/" className="hover:text-brand transition-colors">
          Inicio
        </Link>
        <span className="mx-2">›</span>
        <Link href="/products" className="hover:text-brand transition-colors">
          Productos
        </Link>
        <span className="mx-2">›</span>
        <span className="text-gray-900 font-semibold">{product.name}</span>
      </nav>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative min-h-[320px] h-[420px] bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-8"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Info */}
          <div className="p-8 flex flex-col gap-5">
            <div>
              <span className="text-xs font-semibold text-brand uppercase tracking-wider">
                {product.category}
              </span>
              <div className="flex items-center gap-3 mt-1">
                <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight leading-tight">
                  {product.name}
                </h1>
                {product.badge && (
                  <span
                    className="inline-flex shrink-0 px-2.5 py-0.5 rounded-md text-xs font-bold text-white"
                    style={{ background: product.badgeColor ?? "#059669" }}
                  >
                    {product.badge}
                  </span>
                )}
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <span className="text-lg">{renderStars(product.rating)}</span>
              <span className="text-sm text-gray-600 font-semibold">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-sm text-gray-400">
                · {product.reviews} reseñas
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-[2rem] font-black text-gray-900 tracking-tight">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-base text-gray-400 line-through font-medium">
                    {formatPrice(product.originalPrice)}
                  </span>
                  {discount && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-md">
                      -{discount}%
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <h2 className="text-sm font-bold text-gray-900 mb-1.5">Descripción</h2>
                <p className="text-[0.9375rem] text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Wishlist */}
            {user && !isAdmin && (
              <FavoriteHeart
                isFavorite={isWishlisted}
                onToggle={setIsWishlisted}
                label={isWishlisted ? "En favoritos" : "Agregar a favoritos"}
                className="self-start inline-flex items-center gap-2 py-2 px-3.5 border-[1.5px] border-gray-200 rounded-[10px] text-sm font-semibold text-gray-600 bg-white transition-all duration-200 hover:border-red-300 hover:text-red-500"
              />
            )}

            {/* Add to cart */}
            {isAdmin ? (
              <div className="w-full py-3.5 px-6 rounded-xl text-base font-bold text-gray-500 bg-gray-100 border border-gray-200 text-center">
                Vista previa — solo visualización
              </div>
            ) : (
              <button
                id={`detail-add-to-cart-${product.id}`}
                type="button"
                onClick={handleAddToCart}
                className={`w-full py-3.5 px-6 text-white border-none rounded-xl text-base font-bold transition-all duration-250 inline-flex items-center justify-center gap-2 ${
                  addedToCart ? "bg-emerald-500" : "bg-brand hover:bg-brand-dark"
                }`}
              >
                {addedToCart ? (
                  <>
                    <Check size={18} /> Agregado al carrito
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} /> Agregar al carrito
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <Link
        href="/products"
        className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-gray-500 hover:text-brand transition-colors"
      >
        <ArrowLeft size={16} /> Volver a la tienda
      </Link>
    </div>
  );
}

function NotFoundState() {
  return (
    <div className="max-w-7xl mx-auto py-24 px-6 text-center">
      <div className="text-5xl mb-4">🔍</div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Producto no encontrado</h1>
      <p className="text-gray-500 mb-6">
        El producto que buscas no existe o ya no está disponible.
      </p>
      <Link
        href="/products"
        className="inline-flex items-center gap-2 py-3 px-6 bg-brand text-white rounded-xl font-bold transition-all duration-200 hover:bg-brand-dark"
      >
        <ArrowLeft size={16} /> Ver todos los productos
      </Link>
    </div>
  );
}

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const { products } = useProducts();
  const product = products.find((p) => p.id === id);

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50">
        {products.length === 0 ? (
          <div className="max-w-7xl mx-auto py-24 px-6 text-center text-gray-500">
            Cargando producto...
          </div>
        ) : product ? (
          <ProductDetailContent product={product} />
        ) : (
          <NotFoundState />
        )}
      </main>
      <Footer />
    </>
  );
}

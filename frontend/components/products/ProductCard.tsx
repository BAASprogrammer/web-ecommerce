"use client";
import Image from "next/image";
import Link from "next/link";
import { Check, ShoppingCart } from "lucide-react";
import type { ProductCardProps } from "@/types/api/product";
import { useProductCard } from "@/hooks/products/useProductCard";
import FavoriteHeart from "@/components/products/FavoriteHeart";
import { useAuth } from "@/context/AuthContext";

export default function ProductCard({ product }: ProductCardProps) {
  const {
    isWishlisted,
    setIsWishlisted,
    addedToCart,
    discount,
    handleAddToCart,
    formatPrice,
  } = useProductCard(product);
  const { user, isAdmin } = useAuth();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < Math.floor(rating) ? "text-amber-500" : "text-gray-300"}
      >
        ★
      </span>
    ));
  };

  return (
    <article
      id={`product-card-${product.id}`}
      className="bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-250 relative flex flex-col shadow-sm hover:-translate-y-1.5 hover:shadow-card-hover"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-1 flex flex-col gap-1">
        {discount && (
          <span className="bg-red-500 text-white text-[0.7rem] font-bold px-[7px] py-0.5 rounded-md">
            -{discount}%
          </span>
        )}
        {product.badge && (
          <span
            className="text-white text-[0.7rem] font-bold px-[7px] py-0.5 rounded-md"
            style={{ background: product.badgeColor ?? "#059669" }}
          >
            {product.badge}
          </span>
        )}
      </div>

      {/* Wishlist */}
      {user && !isAdmin && (
        <FavoriteHeart
          id={`wishlist-btn-${product.id}`}
          isFavorite={isWishlisted}
          onToggle={setIsWishlisted}
          className="absolute top-3 right-3 z-1 bg-white border border-gray-200 rounded-full w-[34px] h-[34px] flex items-center justify-center text-base transition-all duration-200 shadow-sm hover:shadow-md"
        />
      )}

      {/* Product image */}
      <Link href={`/products/${product.id}`} id={`product-link-${product.id}`}>
        <div className="h-[220px] flex items-center justify-center overflow-hidden relative bg-gray-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        {/* Category */}
        <span className="text-xs font-semibold text-brand uppercase tracking-wider">
          {product.category}
        </span>

        {/* Name */}
        <Link href={`/products/${product.id}`}>
          <h3 className="text-[0.9375rem] font-bold text-gray-900 leading-snug mb-0.5 transition-colors duration-200 hover:text-brand">
            {product.name}
          </h3>
        </Link>

        {/* Stars */}
        <div className="flex items-center gap-1.5">
          <span className="text-[0.85rem]">{renderStars(product.rating)}</span>
          <span className="text-[0.8rem] text-gray-500 font-medium">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-auto flex-wrap">
          <span className="text-xl font-extrabold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-[0.85rem] text-gray-400 line-through font-medium">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Add to cart */}
        {isAdmin ? (
          <div className="mt-3 w-full py-2.5 px-4 rounded-[10px] text-sm font-bold text-gray-500 bg-gray-100 text-center border border-gray-200">
            Vista previa
          </div>
        ) : (
          <button
            id={`add-to-cart-${product.id}`}
            onClick={handleAddToCart}
            className={`mt-3 w-full py-2.5 px-4 text-white border-none rounded-[10px] text-sm font-bold transition-all duration-250 flex items-center justify-center gap-1.5 ${
              addedToCart
                ? "bg-emerald-500"
                : "bg-brand hover:bg-brand-dark"
            }`}
          >
            {addedToCart ? (
              <>
                <Check size={16} /> Agregado
              </>
            ) : (
              <>
                <ShoppingCart size={16} /> Agregar al carrito
              </>
            )}
          </button>
        )}
      </div>
    </article>
  );
}

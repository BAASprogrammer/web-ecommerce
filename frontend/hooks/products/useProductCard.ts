import { useState } from "react";
import type { Product } from "@/types/api/product";
import { useFavorites } from "@/context/FavoritesContext";

export function useProductCard(product: Product) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [addedToCart, setAddedToCart] = useState(false);

  const isWishlisted = isFavorite(product.id);
  const setIsWishlisted = () => toggleFavorite(product.id);

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : null;

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }).format(price);

  return {
    isWishlisted,
    setIsWishlisted,
    addedToCart,
    discount,
    handleAddToCart,
    formatPrice,
  };
}
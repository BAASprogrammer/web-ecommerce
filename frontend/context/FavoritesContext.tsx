"use client";
import { createContext, useCallback, useContext } from "react";
import { useFavoritesQuery, useToggleFavorite } from "@/hooks/data/useFavorites";
import { useAuth } from "@/context/AuthContext";

interface FavoritesContextValue {
  favoriteIds: number[];
  isFavorite: (productId: number) => boolean;
  toggleFavorite: (productId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { user, isAdmin } = useAuth();
  const userId = !isAdmin ? user?.id : undefined;

  const { data: favoriteIds = [] } = useFavoritesQuery(userId);
  const toggleMutation = useToggleFavorite(userId);

  const isFavorite = useCallback(
    (productId: number) => favoriteIds.includes(productId),
    [favoriteIds]
  );

  const toggleFavorite = useCallback(
    (productId: number): boolean => {
      const next = !favoriteIds.includes(productId);
      if (userId) {
        toggleMutation.mutate(productId);
      }
      return next;
    },
    [userId, favoriteIds, toggleMutation]
  );

  return (
    <FavoritesContext.Provider value={{ favoriteIds, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites debe usarse dentro de FavoritesProvider");
  return ctx;
}
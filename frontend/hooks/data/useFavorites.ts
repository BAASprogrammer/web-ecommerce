"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { productApi } from "@/services/http";

const favoritesKey = (userId?: number) => ["favorites", userId];

export function useFavoritesQuery(userId?: number) {
  return useQuery({
    queryKey: favoritesKey(userId),
    queryFn: async () => {
      const { data } = await productApi.get<number[]>(`/favorites/${userId}`);
      return data;
    },
    enabled: !!userId,
  });
}

export function useToggleFavorite(userId?: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productId: number) => {
      const { data } = await productApi.put<number[]>(
        `/favorites/${userId}/${productId}`
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(favoritesKey(userId), data);
    },
  });
}
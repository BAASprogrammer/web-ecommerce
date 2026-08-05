"use client";
import {
  useMutation,
  useQuery,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { productApi } from "@/services/http";
import type { CategoryItem } from "@/types/api/product";

export function useCategoriesQuery() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await productApi.get<CategoryItem[]>("/categories");
      return data;
    },
  });
}

export function useCreateCategory(options?: UseMutationOptions<CategoryItem, Error, string>) {
  return useMutation({
    mutationFn: async (name: string) => {
      const { data } = await productApi.post<CategoryItem>("/categories", { name });
      return data;
    },
    ...options,
  });
}

export function useRenameCategory(
  options?: UseMutationOptions<CategoryItem, Error, { id: number; name: string }>
) {
  return useMutation({
    mutationFn: async ({ id, name }: { id: number; name: string }) => {
      const { data } = await productApi.put<CategoryItem>(`/categories/${id}`, { name });
      return data;
    },
    ...options,
  });
}

export function useDeleteCategory(options?: UseMutationOptions<void, Error, number>) {
  return useMutation({
    mutationFn: async (id: number) => {
      await productApi.delete(`/categories/${id}`);
    },
    ...options,
  });
}

export function useResetCategories(options?: UseMutationOptions<CategoryItem[], Error, void>) {
  return useMutation({
    mutationFn: async () => {
      const { data } = await productApi.post<CategoryItem[]>("/categories/reset");
      return data;
    },
    ...options,
  });
}

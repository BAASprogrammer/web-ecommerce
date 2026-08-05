"use client";
import {
  useMutation,
  useQuery,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { productApi } from "@/services/http";
import type { Product, ProductPayload } from "@/types/api/product";

function normalizeProduct(p: Product): Product {
  return {
    id: p.id,
    name: p.name,
    description: p.description || undefined,
    price: Number(p.price),
    originalPrice: p.originalPrice != null ? Number(p.originalPrice) : undefined,
    rating: p.rating ?? 0,
    reviews: p.reviews ?? 0,
    image: p.image || "/product-headphones.png",
    badge: p.badge || undefined,
    badgeColor: p.badgeColor || undefined,
    category: p.category || "Sin categoría",
  };
}

function toPayload(product: Product): ProductPayload {
  return {
    name: product.name,
    description: product.description,
    price: product.price,
    originalPrice: product.originalPrice,
    stock: 0,
    image: product.image,
    badge: product.badge ?? "",
    badgeColor: product.badgeColor ?? "",
    category: product.category,
  };
}

export function useProductsQuery() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await productApi.get<Product[]>("/products");
      return data.map(normalizeProduct);
    },
  });
}

export function useCreateProduct(options?: UseMutationOptions<Product, Error, Product>) {
  return useMutation({
    mutationFn: async (product: Product) => {
      const { data } = await productApi.post<Product>("/products", toPayload(product));
      return data;
    },
    ...options,
  });
}

export function useUpdateProduct(options?: UseMutationOptions<Product, Error, Product>) {
  return useMutation({
    mutationFn: async (product: Product) => {
      const { data } = await productApi.put<Product>(
        `/products/${product.id}`,
        toPayload(product)
      );
      return data;
    },
    ...options,
  });
}

export function useDeleteProduct(options?: UseMutationOptions<void, Error, number>) {
  return useMutation({
    mutationFn: async (id: number) => {
      await productApi.delete(`/products/${id}`);
    },
    ...options,
  });
}

export function useResetProducts(options?: UseMutationOptions<Product[], Error, void>) {
  return useMutation({
    mutationFn: async () => {
      const { data } = await productApi.post<Product[]>("/products/reset");
      return data;
    },
    ...options,
  });
}

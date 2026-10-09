"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { aiApi } from "@/services/http";
import type { Product } from "@/types/api/product";

export function useAiIndex() {
  return useMutation({
    mutationFn: async (products: Product[]) => {
      const { data } = await aiApi.post<{ indexed: number }>("/index", products);
      return data;
    },
  });
}

export function useAiSearch(query: string) {
  return useQuery({
    queryKey: ["ai-search", query],
    queryFn: async () => {
      if (!query.trim()) return [];
      const { data } = await aiApi.get<Array<{ productId: number; name: string; category: string; text: string }>>(
        `/search?q=${encodeURIComponent(query)}&topK=20`
      );
      return data;
    },
    enabled: !!query.trim(),
  });
}

export function useAiChat() {
  return useMutation({
    mutationFn: async (query: string) => {
      const { data } = await aiApi.get<{ answer: string }>(`/chat?q=${encodeURIComponent(query)}`);
      return data.answer;
    },
  });
}

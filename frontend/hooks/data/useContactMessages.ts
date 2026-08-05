"use client";
import { useQuery } from "@tanstack/react-query";
import { contactApi } from "@/services/http";
import type { ContactMessageItem } from "@/types/api/contact";

export function useContactMessages() {
  return useQuery({
    queryKey: ["contact-messages"],
    queryFn: async () => {
      const { data } = await contactApi.get<ContactMessageItem[]>("/contact-messages");
      return data;
    },
  });
}

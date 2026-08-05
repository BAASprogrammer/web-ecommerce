"use client";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { contactApi } from "@/services/http";
import type { ContactMessageInput, ContactMessageResult } from "@/types/api/contact";

export function useSubmitContactMessage() {
  return useMutation({
    mutationFn: async (input: ContactMessageInput) => {
      const { data } = await contactApi.post<ContactMessageResult>("/contact-messages", input);
      return data;
    },
  });
}

export function getContactErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    const message = (error.response?.data as { message?: string } | undefined)?.message;
    if (message) return message;
  }
  return "No se pudo conectar con el servidor. Verifica que notification-service esté corriendo.";
}

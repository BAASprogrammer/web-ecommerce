"use client";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { userApi } from "@/services/http";
import type { RegisterUserInput, RegisteredUser } from "@/types/api/auth";

export function useRegisterUser() {
  return useMutation({
    mutationFn: async (input: RegisterUserInput) => {
      const { data } = await userApi.post<RegisteredUser>("/users/register", input);
      return data;
    },
  });
}

export function getRegisterErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    const status = error.response?.status;
    const message = (error.response?.data as { message?: string } | undefined)?.message;
    if (status === 409) return "Este correo ya está registrado";
    if (status === 403) return "Código de administrador inválido";
    if (message) return message;
  }
  return "No se pudo conectar con el servidor. Verifica que user-service esté corriendo.";
}

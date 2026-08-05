"use client";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { userApi } from "@/services/http";
import type { AuthUser, LoginInput } from "@/types/api/auth";

export function useLoginUser() {
  return useMutation({
    mutationFn: async (input: LoginInput) => {
      const { data } = await userApi.post<AuthUser>("/users/login", input);
      return data;
    },
  });
}

export function getLoginErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    const status = error.response?.status;
    const message = (error.response?.data as { message?: string } | undefined)?.message;
    if (status === 401) return "Credenciales inválidas. Verifica tu correo y contraseña.";
    if (status === 403) return "Tu cuenta está desactivada. Contacta al administrador.";
    if (message) return message;
  }
  return "No se pudo conectar con el servidor. Verifica que user-service esté corriendo.";
}

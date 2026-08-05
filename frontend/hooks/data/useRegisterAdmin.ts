"use client";
import { useMutation } from "@tanstack/react-query";
import { userApi } from "@/services/http";
import type { AdminRegisterInput, RegisteredUser } from "@/types/api/auth";

export function useRegisterAdmin() {
  return useMutation({
    mutationFn: async (input: AdminRegisterInput) => {
      const { data } = await userApi.post<RegisteredUser>("/users/register-admin", input);
      return data;
    },
  });
}

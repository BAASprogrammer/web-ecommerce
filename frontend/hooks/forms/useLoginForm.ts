import { useState } from "react";
import { isAxiosError } from "axios";
import { getLoginErrorMessage, useLoginUser } from "@/hooks/data/useLoginUser";
import type { AuthUser } from "@/types/api/auth";

export function useLoginForm(onSuccess?: (user: AuthUser) => void) {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [error, setError] = useState("");
  const loginMutation = useLoginUser();

  const loading = loginMutation.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.email.trim() || !form.password) {
      setError("Ingresa tu correo y contraseña");
      return;
    }
    try {
      const user = await loginMutation.mutateAsync({
        email: form.email.trim(),
        password: form.password,
      });
      onSuccess?.(user);
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 401) {
        setError("Credenciales inválidas. Verifica tu correo y contraseña.");
      } else {
        setError(getLoginErrorMessage(err));
      }
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return {
    showPassword,
    setShowPassword,
    form,
    loading,
    error,
    handleSubmit,
    handleInputChange,
  };
}

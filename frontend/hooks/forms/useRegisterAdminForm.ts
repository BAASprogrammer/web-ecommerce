import { useState } from "react";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import { useRegisterAdmin } from "@/hooks/data/useRegisterAdmin";
import { getRegisterErrorMessage } from "@/hooks/data/useRegisterUser";

export function useRegisterAdminForm() {
  const router = useRouter();
  const adminMutation = useRegisterAdmin();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    code: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");

  const loading = adminMutation.isPending;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "El nombre es requerido";
    if (!form.email.includes("@")) newErrors.email = "Email inválido";
    if (form.password.length < 8) newErrors.password = "Mínimo 8 caracteres";
    if (!form.code.trim()) newErrors.code = "El código es requerido";
    if (!form.acceptTerms) newErrors.acceptTerms = "Debes aceptar los términos";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setServerError("");
    try {
      await adminMutation.mutateAsync({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        code: form.code.trim(),
      });
      router.push("/login?admin=1");
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 403) {
        setErrors({ code: "Código de administrador inválido" });
      } else if (isAxiosError(error) && error.response?.status === 409) {
        setErrors({ email: "Este correo ya está registrado" });
      } else {
        setServerError(getRegisterErrorMessage(error));
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
    errors,
    serverError,
    handleSubmit,
    handleInputChange,
  };
}

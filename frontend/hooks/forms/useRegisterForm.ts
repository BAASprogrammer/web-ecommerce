import { useState } from "react";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import { getRegisterErrorMessage, useRegisterUser } from "@/hooks/data/useRegisterUser";

export function useRegisterForm() {
  const router = useRouter();
  const registerMutation = useRegisterUser();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");

  const loading = registerMutation.isPending;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.firstName.trim()) newErrors.firstName = "El nombre es requerido";
    if (!form.lastName.trim()) newErrors.lastName = "El apellido es requerido";
    if (!form.email.includes("@")) newErrors.email = "Email inválido";
    if (form.password.length < 8) newErrors.password = "Mínimo 8 caracteres";
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
      await registerMutation.mutateAsync({
        name: `${form.firstName.trim()} ${form.lastName.trim()}`,
        email: form.email.trim(),
        password: form.password,
      });
      router.push("/login?registered=1");
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 409) {
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

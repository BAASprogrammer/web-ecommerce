import { useState } from "react";
import { getContactErrorMessage, useSubmitContactMessage } from "@/hooks/data/useSubmitContactMessage";

export function useContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const submitMutation = useSubmitContactMessage();

  const loading = submitMutation.isPending;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "El nombre es requerido";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      newErrors.email = "Email inválido";
    if (!form.subject.trim()) newErrors.subject = "El asunto es requerido";
    if (form.message.trim().length < 10)
      newErrors.message = "El mensaje debe tener al menos 10 caracteres";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setSuccess(false);
      return;
    }
    setErrors({});
    setServerError("");
    setSuccess(false);
    try {
      await submitMutation.mutateAsync({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      });
      setSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setServerError(getContactErrorMessage(error));
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return {
    form,
    errors,
    loading,
    success,
    serverError,
    handleSubmit,
    handleInputChange,
  };
}

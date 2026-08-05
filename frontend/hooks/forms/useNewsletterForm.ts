import { useState } from "react";

export function useNewsletterForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setError("El email es requerido");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Email inválido");
      return;
    }
    setError("");
    setSuccess(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setEmail("");
    }, 1500);
  };

  return {
    email,
    setEmail,
    error,
    loading,
    success,
    handleSubmit,
  };
}

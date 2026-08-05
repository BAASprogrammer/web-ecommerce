"use client";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRegisterForm } from "@/hooks/forms/useRegisterForm";
import { BENEFITS } from "@/data/auth";
import PasswordStrength from "@/components/auth/PasswordStrength";
import { useLegalModal } from "@/components/ui/LegalModal";

export default function RegisterPage() {
  const { openTerms, openPrivacy } = useLegalModal();
  const {
    showPassword,
    setShowPassword,
    form,
    loading,
    errors,
    serverError,
    handleSubmit,
    handleInputChange,
  } = useRegisterForm();

  const inputClass = (field: string) =>
    `w-full py-3 px-4 border-[1.5px] rounded-xl text-[0.9375rem] text-gray-900 bg-white outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-gray-400 focus:border-brand focus:shadow-[0_0_0_3px_rgb(5_150_105/0.15)] ${errors[field] ? "border-red-500" : "border-gray-200"
    }`;

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      {/* Left side */}
      <div className="hidden md:flex relative flex-col items-center justify-center p-12 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
        <div className="absolute -bottom-[100px] -right-[100px] w-[400px] h-[400px] bg-brand/8 rounded-full pointer-events-none" />

        <Link
          href="/"
          className="absolute top-8 left-8 flex items-center gap-2"
        >
          <span className="text-xl font-extrabold text-white">
            Nexa<span className="text-brand">Market</span>
          </span>
        </Link>

        <div className="relative w-[360px] h-[380px] rounded-[20px] overflow-hidden mb-8 border-4 border-white/8">
          <Image
            src="/login-illustration.png"
            alt="Únete a NexaMarket"
            fill
            sizes="380px"
            className="object-cover"
            priority
          />
        </div>

        <h2 className="text-[1.75rem] font-extrabold text-white text-center leading-tight tracking-tight mb-3">
          Únete a NexaMarket
        </h2>
        <p className="text-gray-400 text-center text-[0.9375rem] max-w-[300px] leading-relaxed mb-8">
          Crea tu cuenta gratis y accede a ofertas exclusivas, seguimiento de pedidos y mucho más
        </p>

        {/* Benefits */}
        <div className="flex flex-col gap-3 w-full max-w-[300px]">
          {BENEFITS.map((benefit) => (
            <div key={benefit} className="text-sm text-gray-300 font-medium">
              {benefit}
            </div>
          ))}
        </div>
      </div>

      {/* Right side — form */}
      <div className="flex flex-col justify-center py-12 px-8 md:px-16 bg-white overflow-y-auto">
        <Link
          href="/"
          className="md:hidden flex items-center gap-2 mb-8"
        >
          <span className="text-xl font-extrabold text-gray-900">
            Nexa<span className="text-brand">Market</span>
          </span>
        </Link>

        <div className="max-w-[420px] w-full">
          <h1 className="text-[2rem] font-black text-gray-900 tracking-tight mb-2">
            Crear Cuenta
          </h1>
          <p className="text-gray-500 text-[0.9375rem] mb-4">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="text-brand font-bold">
              Inicia sesión
            </Link>
          </p>
          <p className="text-[0.8125rem] text-gray-400 mb-8">
            ¿Eres administrador?{" "}
            <Link href="/register-admin" className="text-brand font-semibold">
              Crea tu cuenta aquí
            </Link>
          </p>

          <form
            id="register-form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-[1.125rem]"
          >
            {serverError && (
              <div className="py-3 px-4 rounded-xl text-sm font-medium text-red-600 bg-red-50 border-[1.5px] border-red-200">
                {serverError}
              </div>
            )}
            {/* First + Last name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="register-firstname" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Nombre
                </label>
                <input
                  id="register-firstname"
                  type="text"
                  required
                  placeholder="María"
                  value={form.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className={inputClass("firstName")}
                />
                {errors.firstName && (
                  <span className="text-xs text-red-500 font-medium">{errors.firstName}</span>
                )}
              </div>
              <div>
                <label htmlFor="register-lastname" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Apellido
                </label>
                <input
                  id="register-lastname"
                  type="text"
                  required
                  placeholder="González"
                  value={form.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className={inputClass("lastName")}
                />
                {errors.lastName && (
                  <span className="text-xs text-red-500 font-medium">{errors.lastName}</span>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="register-email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Correo electrónico
              </label>
              <input
                id="register-email"
                type="email"
                required
                placeholder="tu@email.com"
                value={form.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={inputClass("email")}
              />
              {errors.email && (
                <span className="text-xs text-red-500 font-medium">{errors.email}</span>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="register-password" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Mínimo 8 caracteres"
                  value={form.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className={`${inputClass("password")} pr-12`}
                />
                <button
                  id="register-toggle-password"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-transparent border-none text-base text-gray-400 p-0 leading-none"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <PasswordStrength password={form.password} />
              {errors.password && (
                <span className="text-xs text-red-500 font-medium mt-1 block">
                  {errors.password}
                </span>
              )}
            </div>

            {/* Accept terms */}
            <div>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  id="register-terms"
                  type="checkbox"
                  checked={form.acceptTerms}
                  onChange={(e) => handleInputChange("acceptTerms", e.target.checked)}
                  className="accent-brand w-4 h-4 mt-0.5 cursor-pointer shrink-0"
                />
                <span className="text-[0.8125rem] text-gray-600 leading-normal">
                  Acepto los{" "}
                  <button
                    type="button"
                    onClick={openTerms}
                    className="text-brand font-semibold"
                  >
                    Términos de Servicio
                  </button>{" "}
                  y la{" "}
                  <button
                    type="button"
                    onClick={openPrivacy}
                    className="text-brand font-semibold"
                  >
                    Política de Privacidad
                  </button>
                </span>
              </label>
              {errors.acceptTerms && (
                <span className="text-xs text-red-500 font-medium mt-1 block">
                  {errors.acceptTerms}
                </span>
              )}
            </div>

            {/* Submit */}
            <button
              id="register-submit"
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 text-white border-none rounded-xl text-base font-bold transition-all duration-250 flex items-center justify-center gap-2 mt-1 ${loading
                ? "bg-brand-light cursor-not-allowed"
                : "bg-brand hover:bg-brand-dark cursor-pointer"
                }`}
            >
              {loading ? (
                <>
                  <span className="w-[18px] h-[18px] border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                  Creando cuenta...
                </>
              ) : (
                "Crear Cuenta Gratis →"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

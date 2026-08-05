"use client";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useLoginForm } from "@/hooks/forms/useLoginForm";
import { useAuth } from "@/context/AuthContext";
import { SOCIAL_PROOF } from "@/data/auth";
import { useLegalModal } from "@/components/ui/LegalModal";

function RegisteredBanner() {
  const params = useSearchParams();
  if (params.get("registered") === "1") {
    return (
      <p className="text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 mb-5">
        ¡Cuenta creada con éxito! Ya puedes iniciar sesión.
      </p>
    );
  }
  if (params.get("admin") === "1") {
    return (
      <p className="text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 mb-5">
        ¡Cuenta de administrador creada con éxito! Ya puedes iniciar sesión.
      </p>
    );
  }
  return null;
}


export default function LoginPage() {
  const { openTerms, openPrivacy } = useLegalModal();
  const { login } = useAuth();
  const router = useRouter();
  const {
    showPassword,
    setShowPassword,
    form,
    loading,
    error,
    handleSubmit,
    handleInputChange,
  } = useLoginForm((user) => {
    login(user);
    router.push(user.role === "ADMIN" ? "/admin" : "/");
  });

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      {/* Left side — illustration */}
      <div className="hidden md:flex relative flex-col items-center justify-center p-12 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
        {/* Background accent */}
        <div className="absolute -bottom-[100px] -left-[100px] w-[400px] h-[400px] bg-brand/15 rounded-full pointer-events-none" />
        <div className="absolute -top-[60px] -right-[60px] w-[280px] h-[280px] bg-brand/8 rounded-full pointer-events-none" />

        {/* Logo */}
        <Link
          href="/"
          className="absolute top-8 left-8 flex items-center gap-2"
        >
          <span className="text-xl font-extrabold text-white">
            Nexa<span className="text-brand">Market</span>
          </span>
        </Link>

        {/* Image */}
        <div className="relative w-[380px] h-[420px] rounded-[20px] overflow-hidden mb-8 border-4 border-white/8">
          <Image
            src="/login-illustration.png"
            alt="Compra en NexaMarket"
            fill
            sizes="380px"
            className="object-cover"
            priority
          />
        </div>

        {/* Text */}
        <h2 className="text-[1.75rem] font-extrabold text-white text-center leading-tight tracking-tight mb-3">
          Bienvenido de vuelta
        </h2>
        <p className="text-gray-400 text-center text-[0.9375rem] max-w-[300px] leading-relaxed">
          Inicia sesión y continúa descubriendo los mejores productos al mejor precio
        </p>

        {/* Social proof */}
        <div className="mt-8 flex gap-8">
          {SOCIAL_PROOF.map(({ val, lbl }) => (
            <div key={lbl} className="text-center">
              <div className="text-brand font-extrabold text-xl leading-none">{val}</div>
              <div className="text-gray-500 text-xs mt-0.5">{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right side — form */}
      <div className="flex flex-col justify-center py-12 px-8 md:px-16 bg-white">
        {/* Mobile logo */}
        <Link
          href="/"
          className="md:hidden flex items-center gap-2 mb-10"
        >
          <span className="text-xl font-extrabold text-gray-900">
            Nexa<span className="text-brand">Market</span>
          </span>
        </Link>

        <div className="max-w-[400px] w-full">
          <h1 className="text-[2rem] font-black text-gray-900 tracking-tight mb-2">
            Iniciar Sesión
          </h1>
          <p className="text-gray-500 text-[0.9375rem] mb-8">
            ¿No tienes cuenta?{" "}
            <Link href="/register" className="text-brand font-bold transition-colors duration-200">
              Regístrate gratis
            </Link>
          </p>

          {/* Social login */}
          <div className="flex flex-col gap-3 mb-6">
            <button
              id="login-google"
              type="button"
              className="flex items-center justify-center gap-2.5 py-3 px-4 border-[1.5px] border-gray-200 rounded-xl bg-white text-gray-700 font-semibold text-[0.9375rem] w-full transition-all duration-200 hover:border-gray-300 hover:bg-gray-50"
            >
              <span className="text-xl">G</span>
              Continuar con Google
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-[0.8rem] text-gray-400 font-medium whitespace-nowrap">
              o continúa con email
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Form */}
          <Suspense fallback={null}>
            <RegisteredBanner />
          </Suspense>
          <form
            id="login-form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            {error && (
              <p
                id="login-error"
                className="text-sm font-semibold text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3"
              >
                {error}
              </p>
            )}

            {/* Email */}
            <div>
              <label htmlFor="login-email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Correo electrónico
              </label>
              <input
                id="login-email"
                type="email"
                required
                value={form.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="tu@email.com"
                className="w-full py-3 px-4 border-[1.5px] border-gray-200 rounded-xl text-[0.9375rem] text-gray-900 bg-white outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-gray-400 focus:border-brand focus:shadow-[0_0_0_3px_rgb(5_150_105/0.15)]"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between mb-1.5">
                <label htmlFor="login-password" className="text-sm font-semibold text-gray-700">
                  Contraseña
                </label>
                <Link href="#" className="text-[0.8125rem] text-brand font-semibold">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  placeholder="••••••••"
                  className="w-full py-3 pl-4 pr-12 border-[1.5px] border-gray-200 rounded-xl text-[0.9375rem] text-gray-900 bg-white outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-gray-400 focus:border-brand focus:shadow-[0_0_0_3px_rgb(5_150_105/0.15)]"
                />
                <button
                  id="toggle-password"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-transparent border-none text-base text-gray-400 p-0 leading-none"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
              <input
                id="login-remember"
                type="checkbox"
                checked={form.remember}
                onChange={(e) => handleInputChange("remember", e.target.checked)}
                className="accent-brand w-4 h-4 cursor-pointer"
              />
              <span className="font-medium">Recordar sesión</span>
            </label>

            {/* Submit */}
            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 text-white border-none rounded-xl text-base font-bold transition-all duration-250 flex items-center justify-center gap-2 ${loading
                ? "bg-brand-light cursor-not-allowed"
                : "bg-brand hover:bg-brand-dark cursor-pointer"
                }`}
            >
              {loading ? (
                <>
                  <span className="w-[18px] h-[18px] border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar Sesión →"
              )}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6 leading-relaxed">
            Al iniciar sesión aceptas nuestros{" "}
            <button
              type="button"
              onClick={openTerms}
              className="text-brand font-semibold"
            >
              Términos
            </button>{" "}
            y{" "}
            <button
              type="button"
              onClick={openPrivacy}
              className="text-brand font-semibold"
            >
              Política de Privacidad
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

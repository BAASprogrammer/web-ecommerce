"use client";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { useContactForm } from "@/hooks/forms/useContactForm";
import { CONTACT_CHANNELS } from "@/data/contact";

export default function ContactPage() {
  const {
    form,
    errors,
    loading,
    success,
    serverError,
    handleSubmit,
    handleInputChange,
  } = useContactForm();

  const inputClass = (field: string) =>
    `w-full py-3 px-4 border-[1.5px] rounded-xl text-[0.9375rem] text-gray-900 bg-white outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-gray-400 focus:border-brand focus:shadow-[0_0_0_3px_rgb(5_150_105/0.15)] ${
      errors[field] ? "border-red-500" : "border-gray-200"
    }`;

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50">
        {/* Page header */}
        <div className="bg-white border-b border-gray-200 py-6">
          <div className="max-w-7xl mx-auto px-6">
            <nav className="text-[0.8125rem] text-gray-500 mb-3">
              <span>Inicio</span>
              <span className="mx-2">›</span>
              <span className="text-gray-900 font-semibold">Contacto</span>
            </nav>
            <h1 className="text-[1.75rem] font-extrabold text-gray-900 tracking-tight">
              Contáctanos
            </h1>
            <p className="text-gray-500 mt-1 text-[0.9375rem]">
              ¿Tienes alguna duda? Nuestro equipo te responde en menos de 24 horas.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-12 px-6 grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10 items-start">
          {/* Channels */}
          <div className="flex flex-col gap-4">
            {CONTACT_CHANNELS.map((channel) => (
              <a
                key={channel.title}
                href={channel.href}
                className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-gray-200 transition-all duration-200 hover:border-brand-light hover:shadow-brand-soft"
              >
                <div className="w-12 h-12 bg-brand-xlight rounded-xl flex items-center justify-center text-2xl shrink-0">
                  {channel.icon}
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-[0.9375rem]">
                    {channel.title}
                  </div>
                  <div className="text-sm text-gray-500">{channel.desc}</div>
                </div>
              </a>
            ))}
            <div className="bg-gradient-to-br from-brand to-brand-dark rounded-2xl p-6 text-white">
              <div className="text-2xl mb-2">🕒</div>
              <div className="font-bold mb-1">Horario de atención</div>
              <div className="text-sm text-brand-light leading-relaxed">
                Lunes a Viernes: 9:00 – 20:00
                <br />
                Sábados: 10:00 – 14:00
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="font-extrabold text-xl text-gray-900 mb-2">
              Envíanos un mensaje
            </h2>
            <p className="text-gray-500 text-sm mb-8">
              Completa el formulario y te responderemos a la brevedad.
            </p>

            <form
              id="contact-form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
              noValidate
            >
              {serverError && (
                <div className="py-3 px-4 rounded-xl text-sm font-medium text-red-600 bg-red-50 border-[1.5px] border-red-200">
                  {serverError}
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Nombre completo
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Tu nombre"
                    className={inputClass("name")}
                  />
                  {errors.name && (
                    <p id="contact-name-error" className="mt-1.5 text-sm font-semibold text-red-500">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Correo electrónico
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="tu@email.com"
                    className={inputClass("email")}
                  />
                  {errors.email && (
                    <p id="contact-email-error" className="mt-1.5 text-sm font-semibold text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="contact-subject" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Asunto
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={form.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  placeholder="¿Sobre qué nos escribes?"
                  className={inputClass("subject")}
                />
                {errors.subject && (
                  <p id="contact-subject-error" className="mt-1.5 text-sm font-semibold text-red-500">
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Mensaje
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Cuéntanos cómo podemos ayudarte..."
                  className={`${inputClass("message")} resize-none`}
                />
                {errors.message && (
                  <p id="contact-message-error" className="mt-1.5 text-sm font-semibold text-red-500">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                id="contact-submit"
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 text-white border-none rounded-xl text-base font-bold transition-all duration-250 flex items-center justify-center gap-2 ${
                  loading
                    ? "bg-brand-light cursor-not-allowed"
                    : "bg-brand hover:bg-brand-dark cursor-pointer"
                }`}
              >
                {loading ? (
                  <>
                    <span className="w-[18px] h-[18px] border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                    Enviando...
                  </>
                ) : (
                  "Enviar Mensaje →"
                )}
              </button>

              {success && (
                <p id="contact-success" className="text-sm font-semibold text-brand text-center">
                  ✅ ¡Mensaje enviado! Te responderemos pronto.
                </p>
              )}
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

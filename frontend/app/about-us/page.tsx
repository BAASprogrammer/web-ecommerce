"use client";
import Image from "next/image";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { useNewsletterForm } from "@/hooks/forms/useNewsletterForm";
import {
  ABOUT_MILESTONES,
  ABOUT_STATS,
  ABOUT_VALUES,
  TEAM_MEMBERS,
} from "@/data/about";

export default function AboutUsPage() {
  const {
    email,
    setEmail,
    error,
    loading,
    success,
    handleSubmit,
  } = useNewsletterForm();

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* HERO */}
        <section className="relative min-h-[380px] flex items-center overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_70%_50%,rgb(5_150_105/0.15)_0%,transparent_60%)]" />
          <div className="max-w-7xl mx-auto py-16 px-6 w-full">
            <nav className="text-[0.8125rem] text-gray-500 mb-4">
              <span>Inicio</span>
              <span className="mx-2">›</span>
              <span className="text-gray-300 font-semibold">Sobre Nosotros</span>
            </nav>
            <h1 className="text-[clamp(2rem,4vw,3rem)] font-black leading-tight tracking-tight mb-4">
              Conoce la historia de{" "}
              <span className="text-brand">NexaMarket</span>
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed max-w-[560px]">
              Desde 2018 ayudamos a miles de personas a encontrar los mejores
              productos al mejor precio, con una experiencia de compra simple,
              rápida y segura.
            </p>
          </div>
        </section>

        {/* STATS */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto py-10 px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {ABOUT_STATS.map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center p-4 ${
                  index < ABOUT_STATS.length - 1 ? "md:border-r md:border-gray-100" : ""
                }`}
              >
                <div className="text-[2rem] font-black text-brand tracking-tight leading-none">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 mt-1 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MISSION */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[320px] rounded-[20px] overflow-hidden">
              <Image
                src="/hero-banner.png"
                alt="Nuestra misión"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-brand mb-2 tracking-widest uppercase">
                Nuestra misión
              </p>
              <h2 className="text-[1.75rem] font-extrabold text-gray-900 tracking-tight mb-4">
                Hacer las compras online simples y accesibles para todos
              </h2>
              <p className="text-gray-500 leading-relaxed mb-4">
                Creemos que comprar online no debería ser complicado. Por eso
                seleccionamos cuidadosamente cada producto, negociamos los
                mejores precios y optimizamos nuestra logística para que tu
                pedido llegue rápido a la puerta de tu casa.
              </p>
              <p className="text-gray-500 leading-relaxed">
                Nuestro equipo trabaja día a día para ofrecerte un catálogo en
                constante crecimiento, atención personalizada y la confianza de
                comprar sabiendo que estás protegido en cada paso.
              </p>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-[1.75rem] font-extrabold text-center text-gray-900 mb-12 tracking-tight">
              Nuestros valores
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {ABOUT_VALUES.map((value) => (
                <div
                  key={value.title}
                  className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-200 transition-all duration-250 hover:border-brand-light hover:shadow-brand-soft hover:-translate-y-1"
                >
                  <div className="text-[2.5rem] mb-4">{value.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2 text-base">
                    {value.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MILESTONES */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-[1.75rem] font-extrabold text-center text-gray-900 mb-12 tracking-tight">
              Nuestra trayectoria
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ABOUT_MILESTONES.map((milestone) => (
                <div
                  key={milestone.year}
                  className="bg-white rounded-2xl p-6 border border-gray-200"
                >
                  <div className="text-brand font-black text-[1.5rem] mb-3">
                    {milestone.year}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1.5">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {milestone.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-[1.75rem] font-extrabold text-center text-gray-900 mb-4 tracking-tight">
              Conoce al equipo
            </h2>
            <p className="text-gray-500 text-center mb-12 max-w-[480px] mx-auto">
              Personas apasionadas que hacen posible que cada pedido llegue
              a tiempo.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {TEAM_MEMBERS.map((member) => (
                <div
                  key={member.name}
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-200 text-center"
                >
                  <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden mb-4">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <h3 className="font-bold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-brand font-semibold mt-1">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="bg-gradient-to-br from-brand via-brand to-brand-dark py-16 px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-8">
            <div>
              <h2 className="text-[1.75rem] font-black text-white tracking-tight leading-tight mb-2">
                Únete a nuestro newsletter
              </h2>
              <p className="text-brand-light text-[0.9375rem]">
                Recibe ofertas exclusivas y novedades en tu correo.
              </p>
            </div>
            <form
              id="newsletter-form"
              onSubmit={handleSubmit}
              className="w-full max-w-[420px]"
              noValidate
            >
              <div className="flex gap-2">
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  aria-label="Tu correo electrónico"
                  className={`w-full py-3 px-4 border-2 rounded-xl text-[0.9375rem] text-gray-900 bg-white outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-gray-400 focus:border-brand-dark focus:shadow-[0_0_0_3px_rgb(4_120_87/0.2)] ${
                    error ? "border-red-400" : "border-transparent"
                  }`}
                />
                <button
                  id="newsletter-submit"
                  type="submit"
                  disabled={loading}
                  className={`py-3 px-6 bg-white text-brand-dark rounded-xl font-bold text-[0.9375rem] border-2 border-white transition-all duration-200 whitespace-nowrap ${
                    loading ? "opacity-70 cursor-not-allowed" : "hover:bg-brand-xlight"
                  }`}
                >
                  {loading ? "Enviando..." : "Suscribirme"}
                </button>
              </div>
              {error && (
                <p id="newsletter-error" className="mt-2 text-sm font-semibold text-red-100">
                  {error}
                </p>
              )}
              {success && (
                <p id="newsletter-success" className="mt-2 text-sm font-semibold text-white">
                  ✅ ¡Gracias por suscribirte!
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

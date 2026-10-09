import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { LegalModalProvider } from "@/components/ui/LegalModal";
import { ProductsProvider } from "@/context/ProductsContext";
import { CategoriesProvider } from "@/context/CategoriesContext";
import { AuthProvider } from "@/context/AuthContext";
import ClientLayout from "@/components/providers/ClientLayout";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "NexaMarket — Tu Tienda Online Favorita",
  description:
    "Descubre miles de productos con los mejores precios. Electrónica, moda, accesorios y mucho más. Envío rápido a todo el país.",
  keywords: "ecommerce, tienda online, productos, ofertas, electrónica, moda",
  openGraph: {
    title: "NexaMarket — Tu Tienda Online Favorita",
    description: "Descubre miles de productos con los mejores precios.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${dmSans.variable} ${fraunces.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <QueryProvider>
          <AuthProvider>
            <ProductsProvider>
              <CategoriesProvider>
                <LegalModalProvider>
                  {children}
                  <ClientLayout />
                </LegalModalProvider>
              </CategoriesProvider>
            </ProductsProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

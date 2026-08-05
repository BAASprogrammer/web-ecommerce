import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { LegalModalProvider } from "@/components/ui/LegalModal";
import { ProductsProvider } from "@/context/ProductsContext";
import { CategoriesProvider } from "@/context/CategoriesContext";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
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
    <html lang="es" className={`${inter.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <QueryProvider>
          <AuthProvider>
            <ProductsProvider>
              <CategoriesProvider>
                <LegalModalProvider>{children}</LegalModalProvider>
              </CategoriesProvider>
            </ProductsProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

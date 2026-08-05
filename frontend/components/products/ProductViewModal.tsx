"use client";
import { useEffect } from "react";
import { X, Pencil } from "lucide-react";
import type { Product } from "@/types/api/product";

interface ProductViewModalProps {
  product: Product;
  onClose: () => void;
  onEdit: (product: Product) => void;
}

const formatPrice = (value: number) =>
  value.toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });

export default function ProductViewModal({
  product,
  onClose,
  onEdit,
}: ProductViewModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-view-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg max-h-[90vh] flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
        <div className="flex items-start justify-between gap-4 px-7 pt-6 pb-5 border-b border-gray-100">
          <div>
            <h2 id="product-view-title" className="text-xl font-extrabold text-gray-900 tracking-tight">
              Detalle del Producto
            </h2>
            <p className="text-xs text-gray-400 mt-1">ID #{product.id}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-7 py-6 overflow-y-auto flex flex-col gap-5">
          {/* Image */}
          <div className="flex items-center gap-5">
            <div className="w-32 h-32 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center shrink-0">
              <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain" />
            </div>
            <div className="flex-1">
              <span className="text-xs font-semibold text-brand uppercase tracking-wider">
                {product.category}
              </span>
              <h3 className="text-lg font-extrabold text-gray-900 leading-snug mt-1">
                {product.name}
              </h3>
              {product.badge && (
                <span
                  className="inline-flex mt-2 px-2.5 py-0.5 rounded-md text-xs font-bold text-white"
                  style={{ background: product.badgeColor ?? "#059669" }}
                >
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* Data grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-3.5">
              <p className="text-[0.7rem] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Precio</p>
              <p className="text-lg font-extrabold text-gray-900">{formatPrice(product.price)}</p>
              {product.originalPrice !== undefined && (
                <p className="text-sm text-gray-400 line-through font-medium">
                  {formatPrice(product.originalPrice)}
                </p>
              )}
            </div>
            <div className="bg-gray-50 rounded-xl p-3.5">
              <p className="text-[0.7rem] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Valoración</p>
              <p className="text-lg font-extrabold text-gray-900">★ {product.rating.toFixed(1)}</p>
              <p className="text-sm text-gray-500">{product.reviews} reseñas</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3.5">
              <p className="text-[0.7rem] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Categoría</p>
              <p className="text-sm font-semibold text-gray-700">{product.category}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3.5">
              <p className="text-[0.7rem] font-bold text-gray-400 uppercase tracking-wider mb-0.5">ID</p>
              <p className="text-sm font-semibold text-gray-700">{product.id}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-[0.7rem] font-bold text-gray-400 uppercase tracking-wider mb-1">
              Descripción
            </p>
            <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-xl px-3.5 py-3">
              {product.description || "Sin descripción"}
            </p>
          </div>
        </div>

        <div className="px-7 py-4 border-t border-gray-100 flex gap-3">
          <button
            id="product-view-edit"
            type="button"
            onClick={() => onEdit(product)}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 text-white border-none rounded-xl text-[0.9375rem] font-bold bg-brand transition-all duration-200 hover:bg-brand-dark"
          >
            <Pencil size={16} /> Editar Producto
          </button>
          <button
            id="product-view-close"
            type="button"
            onClick={onClose}
            className="flex-1 py-3 border-[1.5px] border-gray-200 rounded-xl text-[0.9375rem] font-bold text-gray-700 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

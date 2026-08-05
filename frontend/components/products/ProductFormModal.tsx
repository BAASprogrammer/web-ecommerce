"use client";
import { useEffect, useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import type { Product } from "@/types/api/product";
import { useCategories } from "@/context/CategoriesContext";
import {
  productToForm,
  useProductForm,
  type ProductFormState,
} from "@/hooks/forms/useProductForm";

const PRODUCT_IMAGES = [
  "/product-headphones.png",
  "/product-shoes.png",
  "/product-watch.png",
  "/product-backpack.png",
  "/hero-banner.png",
];

interface ProductFormModalProps {
  mode: "create" | "edit";
  initialProduct?: Product;
  onClose: () => void;
  onSave: (product: Product) => void;
}

export default function ProductFormModal({
  mode,
  initialProduct,
  onClose,
  onSave,
}: ProductFormModalProps) {
  const { categories } = useCategories();
  const categoryOptions = categories.length > 0 ? categories : ["Electrónica"];

  const initialForm: ProductFormState = initialProduct
    ? productToForm(initialProduct)
    : {
        name: "",
        description: "",
        price: "",
        originalPrice: "",
        rating: "4.5",
        reviews: "0",
        image: PRODUCT_IMAGES[0],
        badge: "",
        badgeColor: "#059669",
        category: categoryOptions[0],
      };

  if (!categoryOptions.includes(initialForm.category)) {
    initialForm.category = categoryOptions[0];
  }

  const { form, errors, handleInputChange, validate } = useProductForm(initialForm);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError("");
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body });
      const data = (await res.json()) as { url?: string; message?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.message ?? "No se pudo subir la imagen");
      }
      handleInputChange("image", data.url);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "No se pudo subir la imagen");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const product: Product = {
      id: initialProduct?.id ?? Date.now(),
      name: form.name.trim(),
      description: form.description.trim() || undefined,
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
      rating: form.rating ? Number(form.rating) : 0,
      reviews: form.reviews ? Number(form.reviews) : 0,
      image: form.image.trim(),
      badge: form.badge.trim() || undefined,
      badgeColor: form.badge.trim() ? form.badgeColor : undefined,
      category: form.category,
    };
    onSave(product);
  };

  const inputClass = (field: string) =>
    `w-full py-2.5 px-3.5 border-[1.5px] rounded-xl text-[0.9rem] text-gray-900 bg-white outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-gray-400 focus:border-brand focus:shadow-[0_0_0_3px_rgb(5_150_105/0.15)] ${
      errors[field] ? "border-red-500" : "border-gray-200"
    }`;

  const labelClass = "block text-[0.8125rem] font-semibold text-gray-700 mb-1.5";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-form-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
        <div className="flex items-start justify-between gap-4 px-8 pt-7 pb-5 border-b border-gray-100">
          <div>
            <h2 id="product-form-title" className="text-xl font-extrabold text-gray-900 tracking-tight">
              {mode === "edit" ? "Editar Producto" : "Nuevo Producto"}
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              {mode === "edit" ? "Modifica los datos y guarda los cambios." : "Completa los datos del nuevo producto."}
            </p>
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

        <form id="product-form" onSubmit={handleSubmit} className="px-8 py-6 overflow-y-auto flex flex-col gap-5" noValidate>
          {/* Image preview + select */}
          <div className="flex gap-5 items-start">
            <div className="shrink-0 w-28 h-28 rounded-xl overflow-hidden border border-gray-200 flex items-center justify-center bg-gray-50">
              <img src={form.image} alt="Vista previa" className="max-w-full max-h-full object-contain" />
            </div>
            <div className="flex-1">
              <label htmlFor="product-image" className={labelClass}>Imagen</label>
              <div className="flex gap-2 flex-wrap mb-2">
                {PRODUCT_IMAGES.map((img) => (
                  <button
                    key={img}
                    type="button"
                    aria-label={`Usar ${img}`}
                    onClick={() => handleInputChange("image", img)}
                    className={`w-14 h-14 rounded-lg border-2 overflow-hidden transition-all ${
                      form.image === img ? "border-brand" : "border-gray-200 hover:border-brand-light"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  id="product-image-upload"
                  type="button"
                  disabled={uploading}
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 py-2 px-3.5 border-[1.5px] border-dashed border-gray-300 rounded-xl text-[0.8125rem] font-semibold text-gray-600 bg-white transition-all duration-200 hover:border-brand hover:text-brand disabled:opacity-50"
                >
                  <Upload size={14} />
                  {uploading ? "Subiendo..." : "Subir imagen"}
                </button>
                {uploadError && (
                  <p className="text-xs font-semibold text-red-500">{uploadError}</p>
                )}
              </div>
              <input
                id="product-image"
                type="text"
                value={form.image}
                onChange={(e) => handleInputChange("image", e.target.value)}
                placeholder="/ruta/imagen.png o URL"
                className={inputClass("image")}
              />
              {errors.image && <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.image}</p>}
            </div>
          </div>

          {/* Name */}
          <div>
            <label htmlFor="product-name" className={labelClass}>Nombre</label>
            <input
              id="product-name"
              type="text"
              value={form.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Nombre del producto"
              className={inputClass("name")}
            />
            {errors.name && <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.name}</p>}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="product-description" className={labelClass}>
              Descripción
              <span className="ml-1 font-normal text-gray-400">
                {form.description.length}/500
              </span>
            </label>
            <textarea
              id="product-description"
              rows={3}
              maxLength={500}
              value={form.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe el producto..."
              className={`${inputClass("description")} resize-none`}
            />
            {errors.description && (
              <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.description}</p>
            )}
          </div>

          {/* Price / original */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="product-price" className={labelClass}>Precio</label>
              <input
                id="product-price"
                type="number"
                min="0"
                value={form.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder="0"
                className={inputClass("price")}
              />
              {errors.price && <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.price}</p>}
            </div>
            <div>
              <label htmlFor="product-original-price" className={labelClass}>Precio original (opcional)</label>
              <input
                id="product-original-price"
                type="number"
                min="0"
                value={form.originalPrice}
                onChange={(e) => handleInputChange("originalPrice", e.target.value)}
                placeholder="Sin descuento"
                className={inputClass("originalPrice")}
              />
              {errors.originalPrice && <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.originalPrice}</p>}
            </div>
          </div>

          {/* Rating / reviews */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="product-rating" className={labelClass}>Valoración (0–5)</label>
              <input
                id="product-rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={form.rating}
                onChange={(e) => handleInputChange("rating", e.target.value)}
                className={inputClass("rating")}
              />
              {errors.rating && <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.rating}</p>}
            </div>
            <div>
              <label htmlFor="product-reviews" className={labelClass}>Reseñas</label>
              <input
                id="product-reviews"
                type="number"
                min="0"
                value={form.reviews}
                onChange={(e) => handleInputChange("reviews", e.target.value)}
                className={inputClass("reviews")}
              />
              {errors.reviews && <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.reviews}</p>}
            </div>
          </div>

          {/* Category / badge */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="product-category" className={labelClass}>Categoría</label>
              <select
                id="product-category"
                value={form.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className={inputClass("category")}
              >
                {categoryOptions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="product-badge" className={labelClass}>Etiqueta (opcional)</label>
              <input
                id="product-badge"
                type="text"
                value={form.badge}
                onChange={(e) => handleInputChange("badge", e.target.value)}
                placeholder="Nuevo, Oferta..."
                className={inputClass("badge")}
              />
            </div>
          </div>

          {/* Badge color */}
          <div>
            <label htmlFor="product-badge-color" className={labelClass}>Color de etiqueta</label>
            <input
              id="product-badge-color"
              type="color"
              value={form.badgeColor}
              onChange={(e) => handleInputChange("badgeColor", e.target.value)}
              className="w-full h-11 rounded-xl border border-gray-200 bg-white p-1 cursor-pointer"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2 pb-1">
            <button
              id="product-form-cancel"
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border-[1.5px] border-gray-200 rounded-xl text-[0.9375rem] font-bold text-gray-700 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              id="product-form-submit"
              type="submit"
              className="flex-1 py-3 text-white border-none rounded-xl text-[0.9375rem] font-bold bg-brand transition-all duration-200 hover:bg-brand-dark"
            >
              {mode === "edit" ? "Guardar Cambios" : "Crear Producto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

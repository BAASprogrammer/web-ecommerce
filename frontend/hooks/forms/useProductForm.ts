import { useState } from "react";
import type { Product } from "@/types/api/product";

export interface ProductFormState {
  name: string;
  description: string;
  price: string;
  originalPrice: string;
  rating: string;
  reviews: string;
  image: string;
  badge: string;
  badgeColor: string;
  category: string;
}

export function productToForm(product: Product): ProductFormState {
  return {
    name: product.name,
    description: product.description ?? "",
    price: String(product.price),
    originalPrice: product.originalPrice !== undefined ? String(product.originalPrice) : "",
    rating: String(product.rating),
    reviews: String(product.reviews),
    image: product.image,
    badge: product.badge ?? "",
    badgeColor: product.badgeColor ?? "#059669",
    category: product.category,
  };
}

export function useProductForm(initial: ProductFormState) {
  const [form, setForm] = useState<ProductFormState>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof ProductFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "El nombre es requerido";
    if (!form.description.trim())
      newErrors.description = "La descripción es requerida";
    else if (form.description.length > 500)
      newErrors.description = "La descripción no puede superar 500 caracteres";
    if (!form.price.trim() || Number(form.price) <= 0)
      newErrors.price = "Precio inválido";
    if (form.originalPrice && Number(form.originalPrice) <= 0)
      newErrors.originalPrice = "Precio original inválido";
    const rating = Number(form.rating);
    if (form.rating && (isNaN(rating) || rating < 0 || rating > 5))
      newErrors.rating = "Valoración entre 0 y 5";
    if (form.reviews && Number(form.reviews) < 0)
      newErrors.reviews = "Número de reseñas inválido";
    if (!form.image.trim()) newErrors.image = "La imagen es requerida";
    if (!form.category.trim()) newErrors.category = "La categoría es requerida";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { form, errors, handleInputChange, validate };
}

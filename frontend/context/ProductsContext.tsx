"use client";
import { createContext, useCallback, useContext } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { Product } from "@/types/api/product";
import {
  useCreateProduct,
  useDeleteProduct,
  useProductsQuery,
  useResetProducts,
  useUpdateProduct,
} from "@/hooks/data/useProducts";

interface ProductsContextValue {
  products: Product[];
  updateProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
  resetProducts: () => void;
}

const ProductsContext = createContext<ProductsContextValue | null>(null);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  const { data: products = [] } = useProductsQuery();

  const invalidate = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["products"] });
  }, [queryClient]);

  const addMutation = useCreateProduct({ onSuccess: invalidate });
  const updateMutation = useUpdateProduct({ onSuccess: invalidate });
  const deleteMutation = useDeleteProduct({ onSuccess: invalidate });
  const resetMutation = useResetProducts({ onSuccess: invalidate });

  const addProduct = useCallback(
    (product: Product) => addMutation.mutate(product),
    [addMutation]
  );

  const updateProduct = useCallback(
    (product: Product) => updateMutation.mutate(product),
    [updateMutation]
  );

  const deleteProduct = useCallback(
    (id: number) => deleteMutation.mutate(id),
    [deleteMutation]
  );

  const resetProducts = useCallback(() => resetMutation.mutate(), [resetMutation]);

  return (
    <ProductsContext.Provider
      value={{ products, updateProduct, addProduct, deleteProduct, resetProducts }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts debe usarse dentro de ProductsProvider");
  return ctx;
}

"use client";
import { createContext, useCallback, useContext, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useCategoriesQuery,
  useCreateCategory,
  useDeleteCategory,
  useRenameCategory,
  useResetCategories,
} from "@/hooks/data/useCategories";

interface CategoriesContextValue {
  categories: string[];
  filterCategories: string[];
  addCategory: (name: string) => boolean;
  renameCategory: (oldName: string, newName: string) => boolean;
  deleteCategory: (name: string) => void;
  resetCategories: () => void;
}

const CategoriesContext = createContext<CategoriesContextValue | null>(null);

export function CategoriesProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  const { data: categoryItems = [] } = useCategoriesQuery();

  const categories = useMemo(() => categoryItems.map((c) => c.name), [categoryItems]);
  const filterCategories = useMemo(() => ["Todas", ...categories], [categories]);

  const invalidate = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["categories"] });
  }, [queryClient]);

  const addMutation = useCreateCategory({ onSuccess: invalidate });
  const renameMutation = useRenameCategory({ onSuccess: invalidate });
  const deleteMutation = useDeleteCategory({ onSuccess: invalidate });
  const resetMutation = useResetCategories({ onSuccess: invalidate });

  const findByName = useCallback(
    (name: string) =>
      categoryItems.find((c) => c.name.toLowerCase() === name.trim().toLowerCase()),
    [categoryItems]
  );

  const addCategory = useCallback(
    (name: string) => {
      const trimmed = name.trim();
      if (!trimmed) return false;
      if (findByName(trimmed)) return false;
      addMutation.mutate(trimmed);
      return true;
    },
    [addMutation, findByName]
  );

  const renameCategory = useCallback(
    (oldName: string, newName: string) => {
      const trimmed = newName.trim();
      if (!trimmed) return false;
      const target = findByName(oldName);
      if (!target) return false;
      renameMutation.mutate({ id: target.id, name: trimmed });
      return true;
    },
    [renameMutation, findByName]
  );

  const deleteCategory = useCallback(
    (name: string) => {
      const target = findByName(name);
      if (target) deleteMutation.mutate(target.id);
    },
    [deleteMutation, findByName]
  );

  const resetCategories = useCallback(() => resetMutation.mutate(), [resetMutation]);

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        filterCategories,
        addCategory,
        renameCategory,
        deleteCategory,
        resetCategories,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  const ctx = useContext(CategoriesContext);
  if (!ctx) throw new Error("useCategories debe usarse dentro de CategoriesProvider");
  return ctx;
}

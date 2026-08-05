"use client";
import { useMemo, useState } from "react";
import type { CategoryFilterProps } from "@/types/ui/components";

export default function CategoryFilter({
  categories,
  products,
  selectedCategory,
  onSelectCategory,
  idPrefix = "filter",
}: CategoryFilterProps) {
  const [search, setSearch] = useState("");

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return categories;
    return categories.filter((cat) => cat.toLowerCase().includes(query));
  }, [categories, search]);

  const getCount = (cat: string) =>
    cat === "Todas"
      ? products.length
      : products.filter((p) => p.category === cat).length;

  return (
    <div>
      <h3 className="font-bold text-sm text-gray-700 mb-3 uppercase tracking-wider">
        Categoría
      </h3>

      <div className="relative mb-3">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 pointer-events-none">
          🔍
        </span>
        <input
          id={`${idPrefix}-categories-search`}
          type="search"
          placeholder="Buscar categoría..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full py-2 pl-9 pr-3 border-[1.5px] border-gray-200 rounded-lg text-sm outline-none transition-[border-color,box-shadow] duration-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-brand focus:shadow-[0_0_0_3px_rgb(5_150_105/0.15)] focus:bg-white"
        />
      </div>

      {search && (
        <p className="text-xs text-gray-500 mb-2">
          {filteredCategories.length}{" "}
          {filteredCategories.length === 1 ? "categoría encontrada" : "categorías encontradas"}
        </p>
      )}

      {filteredCategories.length === 0 ? (
        <p className="text-sm text-gray-500 py-4 text-center">
          No hay categorías que coincidan
        </p>
      ) : (
        <div className="flex flex-col gap-1.5">
          {filteredCategories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                id={`${idPrefix}-cat-${cat.toLowerCase()}`}
                type="button"
                onClick={() => onSelectCategory(cat)}
                className={`flex items-center justify-between py-2 px-3 rounded-lg border-[1.5px] text-sm cursor-pointer transition-all duration-150 text-left w-full ${
                  isSelected
                    ? "border-brand bg-brand-xlight text-brand-dark font-bold"
                    : "border-transparent text-gray-600 font-medium hover:bg-gray-50"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[0.7rem] font-bold px-1.5 py-px rounded-full ${
                    isSelected
                      ? "bg-brand-light text-brand-dark"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {getCount(cat)}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

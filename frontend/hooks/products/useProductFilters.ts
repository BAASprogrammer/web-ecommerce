import { useState, useMemo } from "react";
import type { Product } from "@/types/api/product";

export const PRODUCTS_PER_PAGE = 6;

export function useProductFilters(allProducts: Product[]) {
  const [selectedCategory, setSelectedCategoryState] = useState("Todas");
  const [sortBy, setSortByState] = useState("featured");
  const [priceRange, setPriceRangeState] = useState<[number, number]>([0, 200000]);
  const [search, setSearchState] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    return allProducts
      .filter((p) => selectedCategory === "Todas" || p.category === selectedCategory)
      .filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])
      .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return 0;
      });
  }, [allProducts, selectedCategory, sortBy, priceRange, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PRODUCTS_PER_PAGE));

  const setSelectedCategory = (category: string) => {
    setSelectedCategoryState(category);
    setCurrentPage(1);
  };

  const setSortBy = (value: string) => {
    setSortByState(value);
    setCurrentPage(1);
  };

  const setPriceRange = (range: [number, number]) => {
    setPriceRangeState(range);
    setCurrentPage(1);
  };

  const setSearch = (value: string) => {
    setSearchState(value);
    setCurrentPage(1);
  };

  const paginated = useMemo(() => {
    const safePage = Math.min(currentPage, totalPages);
    const start = (safePage - 1) * PRODUCTS_PER_PAGE;
    return filtered.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filtered, currentPage, totalPages]);

  const resetFilters = () => {
    setSelectedCategoryState("Todas");
    setPriceRangeState([0, 200000]);
    setSortByState("featured");
    setSearchState("");
    setCurrentPage(1);
  };

  return {
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    priceRange,
    setPriceRange,
    search,
    setSearch,
    filtered,
    paginated,
    currentPage,
    setCurrentPage,
    totalPages,
    resetFilters,
  };
}

import { useMemo } from "react";

export type PageItem = number | "…";

export function buildPageList(current: number, total: number): PageItem[] {
  const items: PageItem[] = [];
  for (let p = 1; p <= total; p++) {
    const near = p === 1 || p === total || Math.abs(p - current) <= 1;
    if (near) {
      items.push(p);
    } else if (items[items.length - 1] !== "…") {
      items.push("…");
    }
  }
  return items;
}

export function usePagination(currentPage: number, totalPages: number): PageItem[] {
  return useMemo(
    () => buildPageList(currentPage, totalPages),
    [currentPage, totalPages]
  );
}

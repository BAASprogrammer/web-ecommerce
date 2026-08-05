"use client";
import type { PaginationProps } from "@/types/ui/components";
import { usePagination } from "@/hooks/ui/usePagination";

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: PaginationProps) {
  const pages = usePagination(currentPage, totalPages);

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  const btnBase =
    "h-10 min-w-10 px-3 flex items-center justify-center rounded-xl border text-sm font-semibold transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none";
  const btnNeutral = `${btnBase} border-gray-200 bg-white text-gray-700 hover:border-brand hover:text-brand`;
  const btnActive = `${btnBase} border-brand bg-brand text-white shadow-brand-glow`;

  return (
    <div className="mt-10 flex flex-col items-center gap-4">
      <div className="flex items-center gap-1.5 flex-wrap justify-center">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={btnNeutral}
        >
          ← Anterior
        </button>

        {pages.map((page, i) =>
          page === "…" ? (
            <span
              key={`ellipsis-${i}`}
              className="h-10 min-w-10 px-1 flex items-center justify-center text-sm text-gray-400"
            >
              …
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? "page" : undefined}
              className={page === currentPage ? btnActive : btnNeutral}
            >
              {page}
            </button>
          )
        )}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={btnNeutral}
        >
          Siguiente →
        </button>
      </div>

      <p className="text-sm text-gray-500">
        Mostrando{" "}
        <span className="font-semibold text-gray-700">
          {start}–{end}
        </span>{" "}
        de{" "}
        <span className="font-semibold text-gray-700">{totalItems}</span>{" "}
        productos
      </p>
    </div>
  );
}

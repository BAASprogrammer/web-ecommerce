export interface NavItem {
  href: string;
  label: string;
}

export interface CategoryFilterProps {
  categories: string[];
  products: { category: string }[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  idPrefix?: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

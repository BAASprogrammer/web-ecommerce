export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  badgeColor?: string;
  category: string;
}

export interface ProductPayload {
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  stock?: number;
  image: string;
  badge?: string;
  badgeColor?: string;
  category?: string;
}

export interface CategoryItem {
  id: number;
  name: string;
  description: string | null;
}

export interface ProductCardProps {
  product: Product;
}

export interface Category {
  label: string;
  icon: string;
  color: string;
  border: string;
  count: number;
}

export interface Stat {
  value: string;
  label: string;
}

export interface SortOption {
  value: string;
  label: string;
}

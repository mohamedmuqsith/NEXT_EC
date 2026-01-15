// Product Types
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'mobiles' | 'laptops' | 'accessories' | 'smart-devices';
  image: string;
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  stock: number;
  brand: string;
  isNew?: boolean;
  isFeatured?: boolean;
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  icon: string;
  productCount: number;
  image: string;
}

// Filter Types
export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  rating: number;
  sortBy: 'price-low' | 'price-high' | 'newest' | 'rating';
}

// Checkout Types
export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface OrderSummary {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

export type PaymentMethod = 'card' | 'cod';

import type { CartItem } from "../models/cart";

const CART_KEY = "nexus-cart";
const FAVORITES_KEY = "nexus-favorites";

export function loadCart(): CartItem[] {
  const stored = localStorage.getItem(CART_KEY);
  if (!stored) return [];

  try {
    return JSON.parse(stored) as CartItem[];
  } catch {
    localStorage.removeItem(CART_KEY);
    return [];
  }
}

export function saveCart(cart: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function loadFavorites(): number[] {
  const stored = localStorage.getItem(FAVORITES_KEY);
  if (!stored) return [];

  try {
    return JSON.parse(stored) as number[];
  } catch {
    localStorage.removeItem(FAVORITES_KEY);
    return [];
  }
}

export function saveFavorites(favorites: number[]): void {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

// import type { CartItem } from "../models/cart";
// import type { Product } from "../models/product";
// import { loadCart, loadFavorites, saveCart, saveFavorites } from "./storage";

// class NexusStore {
//   products: Product[] = [];
//   cart: CartItem[] = loadCart();
//   favorites: number[] = loadFavorites();

//   setProducts(products: Product[]): void {
//     this.products = products;
//   }

//   addToCart(productId: number): void {
//     const item = this.cart.find((cartItem) => cartItem.productId === productId);

//     if (item) {
//       item.quantity += 1;
//     } else {
//       this.cart.push({ productId, quantity: 1 });
//     }

//     saveCart(this.cart);
//   }

//   toggleFavorite(productId: number): void {
//     if (this.favorites.includes(productId)) {
//       this.favorites = this.favorites.filter((id) => id !== productId);
//     } else {
//       this.favorites.push(productId);
//     }

//     saveFavorites(this.favorites);
//   }

//   getCartCount(): number {
//     return this.cart.reduce((total, item) => total + item.quantity, 0);
//   }
// }

// export const store = new NexusStore();

import { Product } from "../models/product.js";
import { CartItem } from "../models/cart.js";

export interface AppState{
  products: Product[];
  cart: CartItem[];
}

export const state: AppState={
  products: [],
  cart: []
}
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
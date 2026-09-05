import { Product } from "./product.js";

export interface CartItem{
  product: Product;
  quantity:number;
}

export interface Cart{
  cart: CartItem[];
}
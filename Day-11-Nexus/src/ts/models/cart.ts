import { Product } from "./product";

export interface CartItem{
  product: Product;
  quantity:number;
}

export interface Cart{
  cart: CartItem[];
}
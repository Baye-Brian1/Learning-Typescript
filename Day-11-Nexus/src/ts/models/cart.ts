
export interface CartItem{
  productId: number;
  quantity:number;
}

export interface Cart{
  cart: CartItem[];
}
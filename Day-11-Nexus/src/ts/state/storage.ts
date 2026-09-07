import type { CartItem } from "../models/cart";

const CART_KEY = "nexus-cart";
const FAVORITES_KEY = "nexus-favorites";

export const saveCart=(cart: CartItem[])=>{
  const data= JSON.stringify(cart)
  localStorage.setItem(CART_KEY, data)
}
export const loadCart=():CartItem[]=>{
  const stored= localStorage.getItem(CART_KEY)
  if (!stored) return[] 
  try {
    return JSON.parse(stored) as CartItem[]
    
  } catch (error) {
    console.log(error);
    return []
  }

}
export const saveFavorite=(favorite: number[])=>{
  const data= JSON.stringify(favorite);
  localStorage.setItem(FAVORITES_KEY, data)
}

export const loadFavorite=():number[]=>{
  const stored = localStorage.getItem(FAVORITES_KEY)
  if (!stored) return [];
  try {
    return JSON.parse(stored) as number[]
  } catch (error) {
    console.log(error);
    return [];
  }
}


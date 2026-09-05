import { Product } from "../models/product.js";

export const fetchProduct= async ():Promise<Product[]>=>{ 
  const URL= "https://fakestoreapi.com/products"
 try {
  const response= await fetch (URL)
  if(!response.ok){
    throw new Error("Failed to fetch data");
  }
  const data:Product[]= await response.json();
  return data;
  
 } catch (error) {
  console.log("Error:", error);
    throw error
 }

}
import { Product } from "../models/product.js";

export const fetchProduct= async ():Promise<Product[]>=>{ 
 try {
  const response= await fetch ("https://fakestoreapi.com/products")
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
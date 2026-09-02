import type { Product } from "../models/product";

const API_URL = "https://fakestoreapi.com/products";

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`);
  }

  return response.json() as Promise<Product[]>;
}

export async function fetchCategories(): Promise<string[]> {
  const response = await fetch(`${API_URL}/categories`);

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.status}`);
  }

  return response.json() as Promise<string[]>;
}

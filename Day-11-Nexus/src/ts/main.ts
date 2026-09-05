// import { fetchProducts } from "./api/products";
// import { store } from "./state/store";
// import { getElement } from "./utils/dom";

// function updateCartCount(): void {
//   const cartCount = getElement<HTMLElement>("#cartCount");
//   if (cartCount) {
//     cartCount.textContent = String(store.getCartCount());
//   }
// }

// function setupMobileNavigation(): void {
//   const menuButton = getElement<HTMLButtonElement>("#menuButton");
//   const sidebar = getElement<HTMLElement>("#sidebar");
//   const overlay = getElement<HTMLElement>("#overlay");

//   if (!menuButton || !sidebar || !overlay) return;

//   const closeMenu = (): void => {
//     sidebar.classList.remove("open");
//     overlay.classList.remove("show");
//   };

//   menuButton.addEventListener("click", () => {
//     sidebar.classList.toggle("open");
//     overlay.classList.toggle("show");
//   });

//   overlay.addEventListener("click", closeMenu);
// }

// async function initialize(): Promise<void> {
//   setupMobileNavigation();
//   updateCartCount();

//   try {
//     const products = await fetchProducts();
//     store.setProducts(products);

//     // Phase 1 only: verify that the API is connected.
//     console.log("NEXUS products loaded:", products.length);
//   } catch (error) {
//     console.error("NEXUS initialization failed:", error);
//   }
// }

// document.addEventListener("DOMContentLoaded", initialize);

import { fetchProduct } from "./api/products.js";
import { getElement } from "./utils/dom.js";

console.log("MAIN.TS IS RUNNING");

// const searchInput= getElement<HTMLInputElement>("#searchInput");
// const productGrid= getElement<HTMLDivElement>('#productGrid')

fetchProduct().then((products)=>{
  console.log(products);
}).catch((error)=>{
  console.error(error);
  
})
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
declare const lucide: any;
import { fetchProduct } from "./api/products.js";
import { Product } from "./models/product.js";
import { getElement, queryElement } from "./utils/dom.js";

console.log("MAIN.TS IS RUNNING");

const searchInput = getElement<HTMLInputElement>("#searchInput");
const menuButton = getElement<HTMLButtonElement>("#menuButton");
const closeButton = getElement<HTMLButtonElement>("#closeButton");
const sidebar = getElement<HTMLDivElement>("#sidebar");
const overlay = getElement<HTMLDivElement>("#overlay");
const sortSelect = queryElement<HTMLSelectElement>("#sortSelect");
const cartCount = queryElement<HTMLSpanElement>("#cartCount");
const favoriteCount = queryElement<HTMLSpanElement>("#favoriteCount");
const productGrid = queryElement<HTMLDivElement>('#productGrid')


menuButton.addEventListener("click", () => {
  sidebar.classList.add("open");
  overlay.classList.add("show");
});
closeButton.addEventListener("click", () => {
  sidebar.classList.remove("open");
  overlay.classList.remove("show");
});
overlay.addEventListener("click", () => {
  sidebar.classList.remove("open");
  overlay.classList.remove("show");
});
searchInput.addEventListener("input", () => {
  console.log(searchInput.value);
});
if (sortSelect){
  sortSelect.addEventListener("change", () => {
  console.log(sortSelect.value);
});
}
 



const createProductCard = (product: Product): string => {
  const card = `
    <article class="product-card">
     <div class="product-image">
       <img src="${product.image}" alt="Product image"/>
       <button class="favorite-button">
          <i data-lucide="heart"></i>
       </button>
     </div>
     <div class="product-info">
        <h3 class="product-title">${product.title}</h3>
        <p class="product-category">${product.category}</p>
        <div class="product-price">$${product.price}</div>
        <button class="add-to-cart-button">
          <i data-lucide="shopping-cart"></i>
          <span>Add to Cart</span>
        </button>
      </div>
    </article>
  `;
  return card;
};

const renderProducts=(products: Product[])=>{
  if (productGrid) {
    const cardHTML= products.map(createProductCard).join('');
   productGrid.innerHTML= cardHTML;
   lucide.createIcons();
    
  }
   
}
if (productGrid) {
  productGrid.addEventListener('click', (e:Event)=>{
    const target= e.target as HTMLElement
    const button= target.closest('button')
    if (button?.classList.contains('add-to-cart-button')) {
      console.log('add-to-cart-button clicked');
    }else if (button?.classList.contains('favorite-button')) {
      console.log('favorite button clicked');
    }
})
  
}

fetchProduct()
  .then((products) => {
    renderProducts(products);
  })
  .catch((error) => {
    console.error(error);
  });
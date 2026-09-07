declare const lucide: any;
import { fetchProduct } from "./api/products.js";
import { Product } from "./models/product.js";
import { getElement, queryElement } from "./utils/dom.js";

const searchInput = getElement<HTMLInputElement>("#searchInput");
const menuButton = getElement<HTMLButtonElement>("#menuButton");
const closeButton = getElement<HTMLButtonElement>("#closeButton");
const sidebar = getElement<HTMLDivElement>("#sidebar");
const overlay = getElement<HTMLDivElement>("#overlay");
const sortSelect = queryElement<HTMLSelectElement>("#sortSelect");
const cartCount = queryElement<HTMLSpanElement>("#cartCount");
const favoriteCount = queryElement<HTMLSpanElement>("#favoriteCount");
const productGrid = queryElement<HTMLDivElement>("#productGrid");
const category = queryElement<HTMLDivElement>("#categories");
let allProducts: Product[] = [];

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
let currentSearchTerm = "";
let currentCategory = "all";
let currentSortTerm = "feature";
const applyFilter = () => {
  let result = [...allProducts];
  result = result.filter((product) =>
    product.title.toLowerCase().trim().includes(currentSearchTerm),
  );

  if (currentCategory !== "all") {
    result = result.filter((product) => product.category === currentCategory);
  }

  if (currentSortTerm === "price-low") {
    result.sort((a, b) => a.price - b.price);
  }
  if (currentSortTerm === "price-high") {
    result.sort((a, b) => b.price - a.price);
  }
  if (currentSortTerm === "rating") {
    result.sort((a, b) => b.rating.rate - a.rating.rate);
  }
  if (currentSortTerm === "name") {
    result.sort((a, b) => a.title.localeCompare(b.title));
  }
  renderProducts(result);
};
searchInput.addEventListener("input", () => {
  currentSearchTerm = searchInput.value.toLowerCase().trim();
  applyFilter();
});

if (category) {
  category.addEventListener("click", (e: Event) => {
    const target = e.target as HTMLElement;
    const button = target.closest(".category-tab") as HTMLButtonElement | null;
    if (button) {
      currentCategory = button.dataset.category ?? "all";
      const prevBtn = category.querySelector(".category-tab.active");
      if (prevBtn) {
        prevBtn.classList.remove("active");
      }

      button.classList.add("active");
      applyFilter();
    }
  });
}
if (sortSelect) {
  sortSelect.addEventListener("change", () => {
    currentSortTerm = sortSelect.value;
    applyFilter()
  });
}

const createProductCard = (product: Product): string => {
  const card = `
    <article class="product-card" data-id= ${product.id}>
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

const renderProducts = (products: Product[]) => {
  if (productGrid) {
    const cardHTML = products.map(createProductCard).join("");
    productGrid.innerHTML = cardHTML;
    lucide.createIcons();
  }
};
if (productGrid) {
  productGrid.addEventListener("click", (e: Event) => {
    const target = e.target as HTMLElement;
    const button = target.closest("button");
    if (button?.classList.contains("add-to-cart-button")) {
      console.log("add-to-cart-button clicked");
    } else if (button?.classList.contains("favorite-button")) {
      console.log("favorite button clicked");
    }
  });
}

fetchProduct()
  .then((products) => {
    allProducts = products;
    renderProducts(products);
  })
  .catch((error) => {
    console.error(error);
  });

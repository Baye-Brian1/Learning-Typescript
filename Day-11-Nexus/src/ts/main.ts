declare const lucide: any;
import { fetchProduct } from "./api/products.js";
import { Product } from "./models/product.js";
import { getElement, queryElement } from "./utils/dom.js";
import {
  saveCart,
  loadCart,
  loadFavorite,
  saveFavorite,
} from "./state/storage.js";
import { Cart, CartItem } from "./models/cart.js";

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
const addToCartButton = queryElement<HTMLButtonElement>("#add-to-cart-button");
const favoriteSection = queryElement<HTMLDivElement>("#favoritesGrid");
const cartSection = queryElement<HTMLElement>(".cart-items-section");
const totalAmount = queryElement<HTMLElement>("#totalAmount");
const subtotalAmount = queryElement<HTMLElement>("#subtotalAmount");
let allProducts: Product[] = [];
let cart: CartItem[] = loadCart();
let favorite: number[] = loadFavorite();

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
    applyFilter();
  });
}
const createCartCard = (item: CartItem) => {
  const product = allProducts.find((product) => product.id === item.productId);
  if (!product) {
    return "";
  }

  const cardCart = `
    <article class="cart-page-item" data-id="${item.productId}">
  <div class="cart-page-image">
    <img src="${product.image}" alt="${product.title}" />
  </div>
  <div class="cart-page-details">
    <span>${product.category}</span>
    <h2>${product.title}</h2>
    <strong>$${product.price}</strong>
  </div>
  <div class="quantity-control">
    <button class="decrease-qty"><i data-lucide="minus"></i></button>
    <span>${item.quantity}</span>
    <button class="increase-qty"><i data-lucide="plus"></i></button>
  </div>
  <button class="remove-item">
    <i data-lucide="trash-2"></i>
  </button>
</article>
  `;
  return cardCart;
};
const getSubTotal = (): number => {
  const card = cart.reduce((total, item) => {
    const product = allProducts.find((p) => p.id === item.productId);
    if (!product) {
      return total;
    }
    return total + item.quantity * product.price;
  }, 0);
  return card;
};
const createProductCard = (product: Product): string => {
    const isFavorited= favorite.includes(product.id)
    const favoriteClass = isFavorited? "favorited":''
  const card = `
    <article class="product-card" data-id=" ${product.id}">
     <div class="product-image">
       <img src="${product.image}" alt="${product.title}"/>
       <button class="favorite-button ${favoriteClass}">
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

const toggleFavorite = (productId: number) => {
  if (favorite.includes(productId)) {
    favorite = favorite.filter((id) => id !== productId);
  } else {
    favorite.push(productId);
  }
  saveFavorite(favorite);
  updateCartUI();
};

const renderFavorites = () => {
  if (favoriteSection) {
    const favoriteProducts= favorite.map( id => allProducts.find(p => p.id === id))
    const validFavorites= favoriteProducts.filter( product => product !== undefined)
    const favoriteHTML= validFavorites.map(createProductCard).join('');
    favoriteSection.innerHTML = favoriteHTML 
    lucide.createIcons();
  } 

}

const renderCart = () => {
  if (cartSection) {
    const cartHTML = cart.map(createCartCard).join("");
    cartSection.innerHTML = cartHTML;
    lucide.createIcons();
  }
};
if (cartSection) {
  cartSection.addEventListener("click", (e: Event) => {
    const target = e.target as HTMLElement;
    const button = target.closest("button");

    if (button?.classList.contains("increase-qty")) {
      const card = button.closest(".cart-page-item") as HTMLElement | null;
      if (card) {
        const ProductID = Number(card.dataset.id);
        const item = cart.find((i) => i.productId === ProductID);
        if (item) {
          item.quantity += 1;
        }
      }

      updateCartUI();
      renderCart();
      saveCart(cart);
    }
    if (button?.classList.contains("decrease-qty")) {
      const card = button.closest(".cart-page-item") as HTMLElement | null;
      if (card) {
        const ProductId = Number(card.dataset.id);
        const item = cart.find((i) => i.productId === ProductId);
        if (item) {
          item.quantity -= 1;
          if (item.quantity <= 0) {
            cart = cart.filter((i) => i.quantity > 0);
          }
        }
      }
      updateCartUI();
      renderCart();
      saveCart(cart);
    }
    if (button?.classList.contains("remove-item")) {
      const card = button.closest(".cart-page-item") as HTMLDivElement | null;
      if (card) {
        const ProductId = Number(card.dataset.id);
        cart = cart.filter((item) => item.productId !== ProductId);
      }
      updateCartUI();
      renderCart();
      saveCart(cart);
    }
  });
}
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
      const card = button.closest(".product-card") as HTMLElement | null;
      if (card) {
        const productId = Number(card.dataset.id);
        addToCart(productId);
      }
    } else if (button?.classList.contains("favorite-button")) {
      const card = button.closest(".product-card") as HTMLElement | null;
      if (card) {
        const productId = Number(card.dataset.id);
        toggleFavorite(productId);
        button.classList.toggle("favorited")
      }

    }
  });
}

const getCount = (): number => {
  return cart.reduce((total, item) => total + item.quantity, 0);
};
const getFavoriteCount=():number=>{
  return favorite.length
}

const updateCartUI = () => {
  if (cartCount) {
    cartCount.textContent = String(getCount());
  }
  if (totalAmount) {
    totalAmount.textContent = `$${getSubTotal().toFixed(2)}`;
  }
  if (subtotalAmount) {
    subtotalAmount.textContent = `$${getSubTotal().toFixed(2)}`;
  }
  if (favoriteCount) {
    favoriteCount.textContent = String(getFavoriteCount());
  }
};

const addToCart = (productID: number) => {
  const existingItem = cart.find((item) => item.productId === productID);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ productId: productID, quantity: 1 });
  }
  updateCartUI();
  saveCart(cart);
};

fetchProduct()
  .then((products) => {
    allProducts = products;
    renderCart();
    renderProducts(products);
    renderFavorites();
    updateCartUI();
  })
  .catch((error) => {
    console.error(error);
  });

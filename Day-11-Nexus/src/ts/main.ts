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
import { CartItem } from "./models/cart.js";

const searchInput = getElement<HTMLInputElement>("#searchInput");
const menuButton = getElement<HTMLButtonElement>("#menuButton");
const closeButton = getElement<HTMLButtonElement>("#closeButton");
const sidebar = getElement<HTMLDivElement>("#sidebar");
const overlay = getElement<HTMLDivElement>("#overlay");
const sortSelect = queryElement<HTMLSelectElement>("#sortSelect");
const cartCount = queryElement<HTMLSpanElement>("#cartCount");
const topcartCount = queryElement<HTMLSpanElement>("#topcartCount");
const favoriteCount = queryElement<HTMLSpanElement>("#favoriteCount");
const productGrid = queryElement<HTMLDivElement>("#productGrid");
const category = queryElement<HTMLDivElement>("#categories");
const favoriteSection = queryElement<HTMLDivElement>("#favoritesGrid");
const cartSection = queryElement<HTMLElement>(".cart-items-section");
const totalAmount = queryElement<HTMLElement>("#totalAmount");
const subtotalAmount = queryElement<HTMLElement>("#subtotalAmount");
const prevPageButton = queryElement<HTMLButtonElement>("#prevPage");
const nextPageButton = queryElement<HTMLButtonElement>("#nextPage");
const pageIndicator = queryElement<HTMLElement>("#pageIndicator");
const themeToggle = queryElement<HTMLButtonElement>("#themeToggle");
const urlParams = new URLSearchParams(window.location.search);
let currentCategory = urlParams.get("category") ?? "all";

let currentPage = 1;
const productPerPages = 8;
let allProducts: Product[] = [];
let cart: CartItem[] = loadCart();
let favorite: number[] = loadFavorite();
let filteredProducts: Product[] = [];

const THEME_KEY = "nexus-theme";

const applyTheme = (theme: string): void => {
  document.documentElement.setAttribute("data-theme", theme);
  if (themeToggle) {
    themeToggle.innerHTML = `<i data-lucide="${theme === "dark" ? "sun" : "moon"}"></i>`;
  }
  lucide.createIcons();
};

const savedTheme = localStorage.getItem(THEME_KEY);
const systemPrefersDark = window.matchMedia(
  "(prefers-color-scheme: dark);",
).matches;
const intialTheme = savedTheme ?? (systemPrefersDark ? "dark" : "light");
applyTheme(intialTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });
}

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
if (category) {
  const matchingTab = category.querySelector(
    `[data-category= "${currentCategory}"]`,
  ) as HTMLButtonElement | null;
  if (matchingTab) {
    const currentActive = category.querySelector(".category-tab.active");
    if (currentActive) {
      currentActive?.classList.remove("active");
    }
    matchingTab.classList.add("active");
  }
}
let currentSearchTerm = "";
let currentSortTerm = "feature";
const emptyProducts = queryElement<HTMLElement>("#emptyProducts");
const applyFilter = () => {
  currentPage = 1;
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

  if (emptyProducts) {
    emptyProducts.hidden = result.length > 0;
  }
  filteredProducts = result;

  renderPage();
};
if (prevPageButton) {
  prevPageButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage -= 1;
      renderPage();
    }
  });
}
if (nextPageButton) {
  nextPageButton.addEventListener("click", () => {
    const totalPages = Math.ceil(filteredProducts.length / productPerPages);
    if (currentPage < totalPages) {
      currentPage += 1;
      renderPage();
    }
  });
}
const renderPage = () => {
  const totalPages = Math.ceil(filteredProducts.length / productPerPages);
  const startIndex = (currentPage - 1) * productPerPages;
  const paginatedResults = filteredProducts.slice(
    startIndex,
    startIndex + productPerPages,
  );

  if (pageIndicator) {
    pageIndicator.textContent = ` Page ${currentPage} of ${totalPages}`;
  }
  renderProducts(paginatedResults);
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
const miniCart = (item: CartItem) => {
  const product = allProducts.find((product) => product.id === item.productId);
  if (!product) {
    return "";
  }
  const miniCard = `
  <article class="mini-cart-item" data-id="${item.productId}">
    <img src="${product.image}" alt="Mens Casual T-Shirt" />
    <div class="mini-cart-info">
      <h3 class= "mini-product-title">${product.title}</h3>
      <strong>$${product.price}</strong>
    </div>
    <button aria-label="Remove item" class="remove-item">
      <i data-lucide="x"></i>
    </button>
    <div class="quantity-control">
    <button class="decrease-qty"><i data-lucide="minus"></i></button>
    <span>${item.quantity}</span>
    <button class="increase-qty"><i data-lucide="plus"></i></button>
  </div>
</article>
  `;
  return miniCard;
};
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
    <h2 class="product-title">${product.title}</h2>
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
  const isFavorited = favorite.includes(product.id);
  const favoriteClass = isFavorited ? "favorited" : "";
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
const emptyFavorites = queryElement<HTMLElement>("#emptyFavorites");
const renderFavorites = () => {
  if (favoriteSection) {
    const favoriteProducts = favorite.map((id) =>
      allProducts.find((p) => p.id === id),
    );
    const validFavorites = favoriteProducts.filter(
      (product) => product !== undefined,
    );
    const favoriteHTML = validFavorites.map(createProductCard).join("");
    favoriteSection.innerHTML = favoriteHTML;
    lucide.createIcons();
  }
  if (emptyFavorites) {
    emptyFavorites.hidden = favorite.length > 0;
  }
};
const emptyCarts = queryElement<HTMLElement>("#emptyCart");
const miniCartSection = queryElement<HTMLElement>(".cart-preview-items");
const renderMiniCarts = () => {
  if (miniCartSection) {
    const cartHTML = cart.map(miniCart).join("");
    miniCartSection.innerHTML = cartHTML;
    lucide.createIcons();
  }
};
if (miniCartSection) {
  miniCartSection.addEventListener("click", (e: Event) => {
    const target = e.target as HTMLElement;
    const button = target.closest("button");

    if (button?.classList.contains("increase-qty")) {
      const card = button.closest(".mini-cart-item") as HTMLElement | null;
      if (card) {
        const productId = Number(card.dataset.id);
        const item = cart.find((i) => i.productId === productId);
        if (item) {
          item.quantity += 1;
        }
      }

      updateCartUI();
      renderMiniCarts();
      saveCart(cart);
    }
    if (button?.classList.contains("decrease-qty")) {
      const card = button.closest(".mini-cart-item") as HTMLElement | null;
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
      renderMiniCarts();
      saveCart(cart);
    }
    if (button?.classList.contains("remove-item")) {
      const card = button.closest(".mini-cart-item") as HTMLDivElement | null;
      if (card) {
        const ProductId = Number(card.dataset.id);
        cart = cart.filter((item) => item.productId !== ProductId);
      }
      updateCartUI();
      renderMiniCarts();
      saveCart(cart);
    }
  });
}
const renderCart = () => {
  if (cartSection) {
    const cartHTML = cart.map(createCartCard).join("");
    cartSection.innerHTML = cartHTML;
    lucide.createIcons();
  }
  if (emptyCarts) {
    emptyCarts.hidden = cart.length > 0;
  }
};
if (cartSection) {
  cartSection.addEventListener("click", (e: Event) => {
    const target = e.target as HTMLElement;
    const button = target.closest("button");

    if (button?.classList.contains("increase-qty")) {
      const card = button.closest(".mini-cart-item") as HTMLElement | null;
      if (card) {
        const productId = Number(card.dataset.id);
        const item = cart.find((i) => i.productId === productId);
        if (item) {
          item.quantity += 1;
        }
      }

      updateCartUI();
      renderCart();
      saveCart(cart);
    }
    if (button?.classList.contains("decrease-qty")) {
      const card = button.closest(".mini-cart-item") as HTMLElement | null;
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
      renderMiniCarts();
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
const handleProductGridClick = (e: Event) => {
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
      button.classList.toggle("favorited");
      renderFavorites();
    }
  }
};
if (productGrid) {
  productGrid.addEventListener("click", handleProductGridClick);
}
if (favoriteSection) {
  favoriteSection.addEventListener("click", handleProductGridClick);
}
const getCount = (): number => {
  return cart.reduce((total, item) => total + item.quantity, 0);
};
const getFavoriteCount = (): number => {
  return favorite.length;
};

const miniCartCount = queryElement<HTMLElement>("#miniCartCount");
const miniSubtotal = queryElement<HTMLElement>("#miniSubtotal");

const getCategoryCount = (categoryName: string) => {
  const category = allProducts.filter(
    (p) => p.category === categoryName,
  ).length;
  return category;
};
const menCategory = queryElement<HTMLParagraphElement>("#menCategory");
const womenCategory = queryElement<HTMLParagraphElement>("#womenCategory");
const electronicCategory = queryElement<HTMLParagraphElement>(
  "#electronicCategory",
);
const jewelryCategory = queryElement<HTMLParagraphElement>("#jewelryCategory");
const updateCartUI = () => {
  if (menCategory) {
    menCategory.textContent = String(getCategoryCount("men's clothing"));
  }
  if (womenCategory) {
    womenCategory.textContent = String(getCategoryCount("women's clothing"));
  }
  if (electronicCategory) {
    electronicCategory.textContent = String(getCategoryCount("electronics"));
  }
  if (jewelryCategory) {
    jewelryCategory.textContent = String(getCategoryCount("jewelery"));
  }

  if (cartCount) {
    cartCount.textContent = String(getCount());
  }
  if (miniCartCount) {
    miniCartCount.textContent = `(${getCount()})`;
  }
  if (miniSubtotal) {
    miniSubtotal.textContent = `$${getSubTotal().toFixed(2)}`;
  }
  if (topcartCount) {
    topcartCount.textContent = String(getCount());
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

const addToCart = (productId: number) => {
  const existingItem = cart.find((item) => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ productId: productId, quantity: 1 });
  }
  updateCartUI();
  renderMiniCarts();
  saveCart(cart);
};
const featureGrid = queryElement<HTMLDivElement>("#featuredGrid");
const featureProduct = () => {
  if (featureGrid) {
    featureGrid.addEventListener("click", handleProductGridClick);
    const feature = allProducts.slice(6, 10);
    featureGrid.innerHTML = feature.map(createProductCard).join("");
    lucide.createIcons();
  }
};

if (productGrid) {
  productGrid.innerHTML = '<p class="loading-message">Loading products...</p>';
}
const showError = (container: HTMLElement, message: string) => {
  container.innerHTML = `
  <div class="empty-state">
   <i data-lucide="alert-triangle"></i>
   <h2>Something went wrong</h2>
    <p>${message}</p>
  </div>
  `;
  lucide.createIcons();
};

fetchProduct()
  .then((products) => {
    allProducts = products;
    renderCart();
    applyFilter();
    featureProduct();
    renderMiniCarts();
    renderFavorites();
    updateCartUI();
  })
  .catch((error) => {
    console.log(error);
    const message =
      "We couldn't load products right now. Please try again later.";
    if (productGrid) {
      showError(productGrid, message);
    }
    if (cartSection) {
      showError(cartSection, message);
    }
    if (favoriteSection) {
      showError(favoriteSection, message);
    }
  });

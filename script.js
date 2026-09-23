const defaultProducts = [
  {
    id: 1,
    name: "Minimal Black Jacket",
    category: "Fashion",
    price: 89,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
    description: "A clean everyday jacket with a modern silhouette and premium finish.",
    badge: "New"
  },
  {
    id: 2,
    name: "Classic White Sneakers",
    category: "Shoes",
    price: 74,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
    description: "Minimal sneakers designed for everyday comfort and effortless style.",
    badge: "Popular"
  },
  {
    id: 3,
    name: "Premium Wrist Watch",
    category: "Accessories",
    price: 129,
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=85",
    description: "Elegant timepiece with a timeless design for modern outfits.",
    badge: "Premium"
  },
  {
    id: 4,
    name: "Modern Laptop",
    category: "Technology",
    price: 899,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85",
    description: "Slim and powerful laptop designed for work, creativity and travel.",
    badge: "Featured"
  },
  {
    id: 5,
    name: "Urban Grey Hoodie",
    category: "Fashion",
    price: 59,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85",
    description: "Soft heavyweight hoodie with a relaxed urban silhouette.",
    badge: "New"
  },
  {
    id: 6,
    name: "Leather Crossbody Bag",
    category: "Accessories",
    price: 95,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85",
    description: "Compact leather bag with a refined minimalist appearance.",
    badge: "Popular"
  },
  {
    id: 7,
    name: "Running Sneakers",
    category: "Shoes",
    price: 82,
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=85",
    description: "Lightweight running sneakers with a comfortable everyday fit.",
    badge: "Sport"
  },
  {
    id: 8,
    name: "Wireless Headphones",
    category: "Technology",
    price: 149,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",
    description: "Premium wireless headphones with immersive sound and modern design.",
    badge: "New"
  },
  {
    id: 9,
    name: "Relaxed Beige Shirt",
    category: "Fashion",
    price: 48,
    image: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=900&q=85",
    description: "Versatile beige shirt designed for simple everyday outfits.",
    badge: "Essential"
  },
  {
    id: 10,
    name: "Black Leather Wallet",
    category: "Accessories",
    price: 39,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=85",
    description: "Slim leather wallet with a clean and practical design.",
    badge: "Essential"
  },
  {
    id: 11,
    name: "Smart Watch Pro",
    category: "Technology",
    price: 199,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=85",
    description: "Modern smartwatch for everyday productivity and activity tracking.",
    badge: "Pro"
  },
  {
    id: 12,
    name: "Premium Black Boots",
    category: "Shoes",
    price: 119,
    image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=900&q=85",
    description: "Premium black boots with a durable construction and modern shape.",
    badge: "Premium"
  }
];


// -------------------------
// Products
// -------------------------

function getProducts() {
  const saved = localStorage.getItem("boroProducts");

  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      localStorage.setItem("boroProducts", JSON.stringify(defaultProducts));
    }
  }

  localStorage.setItem("boroProducts", JSON.stringify(defaultProducts));
  return defaultProducts;
}

let products = getProducts();


// -------------------------
// Cart
// -------------------------

let cart = JSON.parse(localStorage.getItem("boroCart")) || [];

function saveCart() {
  localStorage.setItem("boroCart", JSON.stringify(cart));
}

function formatPrice(price) {
  return "$" + Number(price).toFixed(2);
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cartCount").textContent = count;
}

function addToCart(id) {
  const product = products.find(p => Number(p.id) === Number(id));

  if (!product) return;

  const existing = cart.find(item => Number(item.id) === Number(id));

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      id: product.id,
      quantity: 1
    });
  }

  saveCart();
  updateCartCount();
  renderCart();
  openCart();
  showToast("Added to bag");
}

function changeQuantity(id, amount) {
  const item = cart.find(item => Number(item.id) === Number(id));

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(item => Number(item.id) !== Number(id));
  }

  saveCart();
  updateCartCount();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => Number(item.id) !== Number(id));

  saveCart();
  updateCartCount();
  renderCart();
}

function renderCart() {

  const container = document.getElementById("cartItems");
  const empty = document.getElementById("cartEmpty");
  const totalElement = document.getElementById("cartTotal");

  container.innerHTML = "";

  if (cart.length === 0) {

    empty.classList.add("show");
    totalElement.textContent = "$0.00";
    return;

  }

  empty.classList.remove("show");

  let total = 0;

  cart.forEach(item => {

    const product = products.find(
      p => Number(p.id) === Number(item.id)
    );

    if (!product) return;

    total += Number(product.price) * item.quantity;

    const element = document.createElement("div");

    element.className = "cart-item";

    element.innerHTML = `
      <div class="cart-item-image">
        <img src="${product.image}" alt="${product.name}">
      </div>

      <div class="cart-item-info">

        <h4>${product.name}</h4>

        <span>${formatPrice(product.price)}</span>

        <div class="cart-item-controls">

          <div class="quantity">

            <button
              onclick="changeQuantity(${product.id}, -1)"
            >−</button>

            <span>${item.quantity}</span>

            <button
              onclick="changeQuantity(${product.id}, 1)"
            >+</button>

          </div>

          <button
            class="remove-item"
            onclick="removeFromCart(${product.id})"
          >
            Remove
          </button>

        </div>

      </div>
    `;

    container.appendChild(element);
  });

  totalElement.textContent = formatPrice(total);
}


// -------------------------
// Product Rendering
// -------------------------

function renderProducts() {

  const grid = document.getElementById("productsGrid");
  const noProducts = document.getElementById("noProducts");

  const search = document
    .getElementById("searchInput")
    .value
    .toLowerCase()
    .trim();

  const category =
    document.getElementById("categoryFilter").value;

  const filtered = products.filter(product => {

    const matchesSearch =
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search);

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  grid.innerHTML = "";

  if (filtered.length === 0) {
    noProducts.classList.add("show");
    return;
  }

  noProducts.classList.remove("show");

  filtered.forEach((product, index) => {

    const card = document.createElement("article");

    card.className = "product-card";

    card.style.animationDelay = `${index * .05}s`;

    card.innerHTML = `
      <div class="product-image">

        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        >

        <span class="product-badge">
          ${product.badge || "New"}
        </span>

        <button
          class="product-add"
          onclick="addToCart(${product.id})"
          aria-label="Add to cart"
        >
          +
        </button>

      </div>

      <div class="product-info">

        <span class="product-category">
          ${product.category}
        </span>

        <h3>${product.name}</h3>

        <div class="product-bottom">

          <strong class="product-price">
            ${formatPrice(product.price)}
          </strong>

          <button
            class="view-product"
            onclick="openProduct(${product.id})"
          >
            View details →
          </button>

        </div>

      </div>
    `;

    grid.appendChild(card);
  });
}


// -------------------------
// Product Modal
// -------------------------

let selectedProduct = null;

function openProduct(id) {

  const product = products.find(
    p => Number(p.id) === Number(id)
  );

  if (!product) return;

  selectedProduct = product;

  document.getElementById("modalImage").src = product.image;
  document.getElementById("modalImage").alt = product.name;

  document.getElementById("modalCategory").textContent =
    product.category;

  document.getElementById("modalTitle").textContent =
    product.name;

  document.getElementById("modalPrice").textContent =
    formatPrice(product.price);

  document.getElementById("modalDescription").textContent =
    product.description;

  document
    .getElementById("productModal")
    .classList.add("active");

  document.body.classList.add("no-scroll");
}

function closeProduct() {

  document
    .getElementById("productModal")
    .classList.remove("active");

  document.body.classList.remove("no-scroll");
}


// -------------------------
// Cart Drawer
// -------------------------

function openCart() {

  document
    .getElementById("cartDrawer")
    .classList.add("active");

  document
    .getElementById("cartOverlay")
    .classList.add("active");

  document.body.classList.add("no-scroll");
}

function closeCart() {

  document
    .getElementById("cartDrawer")
    .classList.remove("active");

  document
    .getElementById("cartOverlay")
    .classList.remove("active");

  document.body.classList.remove("no-scroll");
}


// -------------------------
// Checkout
// -------------------------

function openCheckout() {

  if (cart.length === 0) {
    showToast("Your bag is empty");
    return;
  }

  closeCart();

  document
    .getElementById("checkoutModal")
    .classList.add("active");

  document.body.classList.add("no-scroll");
}

function closeCheckout() {

  document
    .getElementById("checkoutModal")
    .classList.remove("active");

  document.body.classList.remove("no-scroll");
}


// -------------------------
// Toast
// -------------------------

let toastTimer;

function showToast(message) {

  const toast = document.getElementById("successToast");

  toast.querySelector("strong").textContent = message;

  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}


// -------------------------
// Dark Mode
// -------------------------

function loadTheme() {

  const theme = localStorage.getItem("boroTheme");

  if (theme === "dark") {
    document.body.classList.add("dark");
    document.getElementById("themeIcon").textContent = "☀";
  }
}

function toggleTheme() {

  document.body.classList.toggle("dark");

  const dark =
    document.body.classList.contains("dark");

  localStorage.setItem(
    "boroTheme",
    dark ? "dark" : "light"
  );

  document.getElementById("themeIcon").textContent =
    dark ? "☀" : "☾";
}


// -------------------------
// Mobile Menu
// -------------------------

document
  .getElementById("mobileMenu")
  .addEventListener("click", () => {

    document
      .getElementById("mobileNav")
      .classList.toggle("active");

  });


// -------------------------
// Events
// -------------------------

document
  .getElementById("searchInput")
  .addEventListener("input", renderProducts);

document
  .getElementById("categoryFilter")
  .addEventListener("change", renderProducts);

document
  .getElementById("themeBtn")
  .addEventListener("click", toggleTheme);

document
  .getElementById("cartBtn")
  .addEventListener("click", openCart);

document
  .getElementById("cartClose")
  .addEventListener("click", closeCart);

document
  .getElementById("cartOverlay")
  .addEventListener("click", closeCart);

document
  .getElementById("productModalClose")
  .addEventListener("click", closeProduct);

document
  .getElementById("checkoutClose")
  .addEventListener("click", closeCheckout);

document
  .getElementById("checkoutBtn")
  .addEventListener("click", openCheckout);

document
  .getElementById("modalAdd")
  .addEventListener("click", () => {

    if (!selectedProduct) return;

    addToCart(selectedProduct.id);

    closeProduct();

  });


// Category cards

document
  .querySelectorAll(".category-card")
  .forEach(card => {

    card.addEventListener("click", () => {

      const category = card.dataset.category;

      document.getElementById("categoryFilter").value =
        category;

      document
        .getElementById("shop")
        .scrollIntoView({
          behavior: "smooth"
        });

      renderProducts();
    });

  });


// Promo

document
  .getElementById("promoBtn")
  .addEventListener("click", () => {

    document
      .getElementById("shop")
      .scrollIntoView({
        behavior: "smooth"
      });

  });


// Checkout submit

document
  .getElementById("checkoutForm")
  .addEventListener("submit", event => {

    event.preventDefault();

    cart = [];

    saveCart();
    updateCartCount();
    renderCart();

    closeCheckout();

    event.target.reset();

    showToast("Order completed");

  });


// -------------------------
// Init
// -------------------------

window.addEventListener("load", () => {

  setTimeout(() => {

    document
      .getElementById("loader")
      .classList.add("hidden");

  }, 700);

  products = getProducts();

  loadTheme();
  renderProducts();
  renderCart();
  updateCartCount();

});
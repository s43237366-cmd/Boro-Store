// ======================================
// BORO STORE ADMIN PANEL
// ======================================

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


// ======================================
// Products
// ======================================

function getProducts() {

  const saved =
    localStorage.getItem("boroProducts");

  if (saved) {

    try {
      return JSON.parse(saved);
    } catch {
      localStorage.setItem(
        "boroProducts",
        JSON.stringify(defaultProducts)
      );

      return defaultProducts;
    }

  }

  localStorage.setItem(
    "boroProducts",
    JSON.stringify(defaultProducts)
  );

  return defaultProducts;
}

let products = getProducts();

function saveProducts() {

  localStorage.setItem(
    "boroProducts",
    JSON.stringify(products)
  );
}


// ======================================
// Navigation
// ======================================

const sections = {
  dashboard: document.getElementById("dashboardSection"),
  products: document.getElementById("productsSection"),
  add: document.getElementById("addSection")
};

const pageTitle =
  document.getElementById("pageTitle");

document
  .querySelectorAll(".side-link")
  .forEach(button => {

    button.addEventListener("click", () => {

      const section =
        button.dataset.section;

      openSection(section);

    });

  });

document
  .querySelectorAll("[data-open-section]")
  .forEach(button => {

    button.addEventListener("click", () => {

      openSection(
        button.dataset.openSection
      );

    });

  });

function openSection(name) {

  Object.values(sections)
    .forEach(section => {
      section.classList.remove("active");
    });

  sections[name].classList.add("active");

  document
    .querySelectorAll(".side-link")
    .forEach(button => {

      button.classList.toggle(
        "active",
        button.dataset.section === name
      );

    });

  const titles = {
    dashboard: "Dashboard",
    products: "Products",
    add: "Add Product"
  };

  pageTitle.textContent =
    titles[name];

  if (name === "dashboard") {
    renderDashboard();
  }

  if (name === "products") {
    renderProducts();
  }

  if (name === "add") {

    if (!editingProductId) {
      resetForm();
    }

  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// ======================================
// Dashboard
// ======================================

function renderDashboard() {

  products = getProducts();

  document.getElementById(
    "totalProducts"
  ).textContent = products.length;

  const categories = [
    ...new Set(
      products.map(product => product.category)
    )
  ];

  document.getElementById(
    "totalCategories"
  ).textContent = categories.length;

  const orders =
    Number(localStorage.getItem("boroOrders")) || 0;

  document.getElementById(
    "orderCount"
  ).textContent = orders;

  const recent =
    document.getElementById("recentProducts");

  recent.innerHTML = "";

  products
    .slice(-5)
    .reverse()
    .forEach(product => {

      const item =
        document.createElement("div");

      item.className = "recent-product";

      item.innerHTML = `
        <div class="recent-image">
          <img
            src="${product.image}"
            alt="${product.name}"
          >
        </div>

        <div>
          <h4>${product.name}</h4>
          <span>${product.category}</span>
        </div>

        <strong>
          $${Number(product.price).toFixed(2)}
        </strong>
      `;

      recent.appendChild(item);

    });
}


// ======================================
// Products Table
// ======================================

function renderProducts() {

  products = getProducts();

  const container =
    document.getElementById("adminProducts");

  const search =
    document
      .getElementById("adminSearch")
      .value
      .toLowerCase()
      .trim();

  const category =
    document.getElementById(
      "adminCategory"
    ).value;

  const filtered =
    products.filter(product => {

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search);

      const matchesCategory =
        category === "All" ||
        product.category === category;

      return matchesSearch &&
        matchesCategory;

    });

  container.innerHTML = "";

  if (filtered.length === 0) {

    container.innerHTML = `
      <div style="
        padding:50px;
        text-align:center;
        color:#777;
      ">
        No products found.
      </div>
    `;

    return;
  }

  filtered.forEach(product => {

    const row =
      document.createElement("div");

    row.className = "admin-product";

    row.innerHTML = `
      <div class="admin-product-image">
        <img
          src="${product.image}"
          alt="${product.name}"
        >
      </div>

      <div>
        <h4>${product.name}</h4>
        <span>${product.category}</span>
      </div>

      <div>
        <span>Price</span>
        <div class="product-price">
          $${Number(product.price).toFixed(2)}
        </div>
      </div>

      <div>
        <span>Badge</span>
        <div>${product.badge || "—"}</div>
      </div>

      <div class="product-actions">

        <button
          class="action-button"
          onclick="editProduct(${product.id})"
        >
          Edit
        </button>

        <button
          class="action-button delete"
          onclick="askDelete(${product.id})"
        >
          Delete
        </button>

      </div>
    `;

    container.appendChild(row);

  });
}


// ======================================
// Add / Edit Product
// ======================================

let editingProductId = null;

const form =
  document.getElementById("productForm");

const productId =
  document.getElementById("productId");

const productName =
  document.getElementById("productName");

const productPrice =
  document.getElementById("productPrice");

const productCategory =
  document.getElementById("productCategory");

const productImage =
  document.getElementById("productImage");

const productBadge =
  document.getElementById("productBadge");

const productDescription =
  document.getElementById("productDescription");


form.addEventListener("submit", event => {

  event.preventDefault();

  const name =
    productName.value.trim();

  const price =
    Number(productPrice.value);

  const category =
    productCategory.value;

  const image =
    productImage.value.trim();

  const badge =
    productBadge.value.trim() || "New";

  const description =
    productDescription.value.trim();

  if (
    !name ||
    !price ||
    !category ||
    !image ||
    !description
  ) {

    showToast("Please fill all fields.");

    return;
  }


  if (editingProductId) {

    const index =
      products.findIndex(
        product =>
          Number(product.id) ===
          Number(editingProductId)
      );

    if (index !== -1) {

      products[index] = {
        ...products[index],
        name,
        price,
        category,
        image,
        badge,
        description
      };

    }

    showToast("Product updated successfully.");

  } else {

    const newProduct = {

      id: Date.now(),

      name,

      price,

      category,

      image,

      badge,

      description

    };

    products.push(newProduct);

    showToast("Product added successfully.");

  }

  saveProducts();

  resetForm();

  renderDashboard();

  renderProducts();

  setTimeout(() => {
    openSection("products");
  }, 500);

});


// ======================================
// Edit
// ======================================

function editProduct(id) {

  const product =
    products.find(
      item =>
        Number(item.id) === Number(id)
    );

  if (!product) return;

  editingProductId = product.id;

  productId.value = product.id;

  productName.value = product.name;

  productPrice.value = product.price;

  productCategory.value = product.category;

  productImage.value = product.image;

  productBadge.value = product.badge || "";

  productDescription.value =
    product.description;

  document.getElementById(
    "formTitle"
  ).textContent = "Edit Product";

  document.getElementById(
    "saveProductBtn"
  ).textContent = "Update Product";

  updatePreview();

  openSection("add");
}


// ======================================
// Reset
// ======================================

function resetForm() {

  editingProductId = null;

  form.reset();

  productId.value = "";

  document.getElementById(
    "formTitle"
  ).textContent = "Add Product";

  document.getElementById(
    "saveProductBtn"
  ).textContent = "Save Product";

  document.getElementById(
    "previewName"
  ).textContent = "Product Name";

  document.getElementById(
    "previewCategory"
  ).textContent = "CATEGORY";

  document.getElementById(
    "previewPrice"
  ).textContent = "$0.00";

  document.getElementById(
    "previewImage"
  ).src =
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=85";
}


document
  .getElementById("cancelEdit")
  .addEventListener("click", () => {

    resetForm();
    openSection("products");

  });


// ======================================
// Live Preview
// ======================================

function updatePreview() {

  const name =
    productName.value.trim();

  const category =
    productCategory.value;

  const price =
    Number(productPrice.value) || 0;

  const image =
    productImage.value.trim();

  document.getElementById(
    "previewName"
  ).textContent =
    name || "Product Name";

  document.getElementById(
    "previewCategory"
  ).textContent =
    category || "CATEGORY";

  document.getElementById(
    "previewPrice"
  ).textContent =
    "$" + price.toFixed(2);

  if (image) {

    document.getElementById(
      "previewImage"
    ).src = image;

  }

}

[
  productName,
  productPrice,
  productCategory,
  productImage
].forEach(element => {

  element.addEventListener(
    "input",
    updatePreview
  );

  element.addEventListener(
    "change",
    updatePreview
  );

});


// ======================================
// Delete
// ======================================

let deletingProductId = null;

function askDelete(id) {

  deletingProductId = id;

  document
    .getElementById("deleteModal")
    .classList.add("active");
}

function closeDeleteModal() {

  deletingProductId = null;

  document
    .getElementById("deleteModal")
    .classList.remove("active");
}

document
  .getElementById("confirmDelete")
  .addEventListener("click", () => {

    if (!deletingProductId) return;

    products =
      products.filter(
        product =>
          Number(product.id) !==
          Number(deletingProductId)
      );

    saveProducts();

    closeDeleteModal();

    renderProducts();
    renderDashboard();

    showToast("Product deleted.");

  });

document
  .getElementById("cancelDelete")
  .addEventListener(
    "click",
    closeDeleteModal
  );

document
  .getElementById("closeDelete")
  .addEventListener(
    "click",
    closeDeleteModal
  );


// ======================================
// Search
// ======================================

document
  .getElementById("adminSearch")
  .addEventListener(
    "input",
    renderProducts
  );

document
  .getElementById("adminCategory")
  .addEventListener(
    "change",
    renderProducts
  );


// ======================================
// Toast
// ======================================

let toastTimeout;

function showToast(message) {

  const toast =
    document.getElementById("adminToast");

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(toastTimeout);

  toastTimeout = setTimeout(() => {

    toast.classList.remove("show");

  }, 2500);
}


// ======================================
// Init
// ======================================

renderDashboard();
renderProducts();
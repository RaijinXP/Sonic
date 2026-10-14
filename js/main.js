const productCount = document.getElementById("product-count");
const productList = document.getElementById("product-list");
const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("search-input");
const sortSelect = document.getElementById("sort-select");
let currentCategory = "all";

const cartCount = document.getElementById("cart-count");
let cart = JSON.parse(localStorage.getItem("sonic-cart")) || [];

function renderProducts(list) {
  productList.innerHTML = "";
  productCount.textContent = "Showing " + list.length + " products";
  if (list.length === 0) {
      productList.innerHTML = `<p class="empty-message">No products found.</p>`;
    return;
    }
  list.forEach(function (product) {
    let discountHTML = "";
    if (product.discount) {
      discountHTML = `<span class="discount">${product.discount}% Discount</span>`;
    }
    
    productList.innerHTML += `
      <div class="card">
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p><span>Brand:</span> ${product.brand}</p>
        ${discountHTML}
        <p class="price">$${product.price}</p>
        <button class="add-btn" data-id="${product.id}">Add to Cart</button>
      </div>
    `;
  });
}

renderProducts(products);
updateCartCount();

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    filterButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });
    button.classList.add("active");
    const category = button.dataset.category;

    currentCategory = category;
    applyFilters();
      
  });
});    


searchInput.addEventListener("input", function () {
  applyFilters();
  });

function applyFilters() {
  const text = searchInput.value.toLowerCase().trim();

  const results = products.filter(function (product) {
    const matchesCategory =
      currentCategory === "all" || product.category === currentCategory;
    const matchesSearch = product.name.toLowerCase().includes(text);

    return matchesCategory && matchesSearch;

  });

  const sortValue = sortSelect.value;

  if (sortValue === "price-asc") {
    results.sort(function (a, b) {
      return a.price - b.price;
    });
  } else if (sortValue === "price-desc") {
    results.sort(function (a, b) {
      return b.price - a.price;
    });
  } else if (sortValue === "name-asc") {
    results.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
  }

  renderProducts(results);
}

sortSelect.addEventListener("change", function () {
  applyFilters();
});

function addToCart(id) {
  const existing = cart.find(function (item) {
    return item.id === id;
  });

  if (existing) {
    existing.quantity = existing.quantity + 1;
  } else {
    cart.push({ id: id, quantity: 1 });
  }

  saveCart();
  updateCartCount();
}

function updateCartCount() {
  let total = 0;

  cart.forEach(function (item) {
    total = total + item.quantity;
  });

  cartCount.textContent = total;

  if (total === 0) {
    cartCount.style.display = "none";
  } else {
    cartCount.style.display = "inline-block";
  }
}

function saveCart() {
  localStorage.setItem("sonic-cart", JSON.stringify(cart));
}

productList.addEventListener("click", function (event) {
  if (event.target.classList.contains("add-btn")) {
    const button = event.target;
    const id = Number(button.dataset.id);
    addToCart(id);

    button.textContent = "Added ✓";

    setTimeout(function () {
      button.textContent = "Add to Cart";
    }, 1000);
  }
});
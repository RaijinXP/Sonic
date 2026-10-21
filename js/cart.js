const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const clearBtn = document.getElementById("clear-cart");

let cart = JSON.parse(localStorage.getItem("sonic-cart")) || [];

function renderCart() {
  updateCartCount();

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="empty-message">Your cart is empty.</p>`;
    cartTotal.textContent = "";
    clearBtn.style.display = "none";
    return;
  }

  clearBtn.style.display = "block";

  let total = 0;
  let html = "";

  cart.forEach(function (item) {
    const product = products.find(function (p) {
      return p.id === item.id;
    });

    if (!product) return;

    const price = getFinalPrice(product);
    const subtotal = price * item.quantity;
    total = total + subtotal;

    html += `
      <div class="cart-item">
        <img src="${product.image}" alt="${product.name}" />
        <div class="cart-info">
          <h3>${product.name}</h3>
          <p>$${price.toFixed(2)} each</p>
          <p>Quantity: ${item.quantity}</p>
          <button class="qty-btn" data-action="decrease" data-id="${product.id}">-</button>
          <button class="qty-btn" data-action="increase" data-id="${product.id}">+</button>
          <button class="remove-btn" data-id="${product.id}">Remove</button>
        </div>
        <p class="cart-subtotal">$${subtotal.toFixed(2)}</p>
      </div>
    `;
  });

  cartItems.innerHTML = html;
  cartTotal.textContent = "Total: $" + total.toFixed(2);
}

cartItems.addEventListener("click", function (event) {
  const id = Number(event.target.dataset.id);

  if (event.target.classList.contains("remove-btn")) {
    cart = cart.filter(function (item) {
      return item.id !== id;
    });
  }

  if (event.target.classList.contains("qty-btn")) {
    const item = cart.find(function (item) {
      return item.id === id;
    });

    if (event.target.dataset.action === "increase") {
      item.quantity = item.quantity + 1;
    } else if (event.target.dataset.action === "decrease") {
      item.quantity = item.quantity - 1;

      if (item.quantity === 0) {
        cart = cart.filter(function (item) {
          return item.id !== id;
        });
      }
    }
  }

  saveCart();
  renderCart();
});

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

clearBtn.addEventListener("click", function () {
  cart = [];
  
  saveCart();
  renderCart();

});

function saveCart() {
   localStorage.setItem("sonic-cart", JSON.stringify(cart));
}



renderCart();
const productCount = document.getElementById("product-count");
const productList = document.getElementById("product-list");
const filterButtons = document.querySelectorAll(".filter-btn");

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
        <button>Add to Cart</button>
      </div>
    `;
  });
}

renderProducts(products);

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
  filterButtons.forEach(function (btn) {
    btn.classList.remove("active");
  });
  button.classList.add("active");
    const category = button.dataset.category;

    if (category === "all") {
      renderProducts(products);
    } else {
      const filtered = products.filter(function (product) {
        return product.category === category;
      });
      renderProducts(filtered);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});

// Render cart items
function renderCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartItems = document.getElementById("cart-items");
  let cartCount = document.getElementById("cart-count");
  let cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    // Create list item with Remove button
    let li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `
      <div>
        <strong>${item.name}</strong> (x${item.quantity}) - sh${item.price * item.quantity}
      </div>
      <button class="btn btn-sm btn-danger remove-btn" data-index="${index}">Remove</button>
    `;

    cartItems.appendChild(li);
  });

  cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
  if (cartTotal) cartTotal.textContent = total;
  else document.getElementById("total").innerHTML = `<strong>Total: sh${total}</strong>`;

  // Attach remove button events
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      removeFromCart(this.getAttribute("data-index"));
    });
  });
}

// Remove an item from cart by index
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1); // remove item
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart(); // re-render cart
}






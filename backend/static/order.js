/*document.addEventListener("DOMContentLoaded", () => {
  renderOrderSummary();

  document.getElementById("orderForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // ✅ Save total amount before leaving
    let totalAmount = document.getElementById("order-total").textContent;
    localStorage.setItem("payment_total", totalAmount);

    // ✅ (Optional) Save order info for payment page too
    localStorage.setItem("order_name", name);
    localStorage.setItem("order_phone", phone);
    localStorage.setItem("order_address", address);

    // ⚠️ DO NOT remove cart here — keep it for payment page
    // localStorage.removeItem("cart");

    // Redirect to payment page
    window.location.href = "/payment";
  });
});

// ✅ Render order summary
function renderOrderSummary() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let orderSummary = document.getElementById("order-summary");
  let orderTotal = document.getElementById("order-total");

  orderSummary.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    let li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `<span>${item.name} (x${item.quantity})</span> <span>sh${item.price * item.quantity}</span>`;
    orderSummary.appendChild(li);
  });

  orderTotal.textContent = total;
}

*/
document.addEventListener("DOMContentLoaded", () => {
  renderOrderSummary();

  document.getElementById("orderForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      alert("❌ Your cart is empty!");
      return;
    }

    // ✅ Get the total amount from the page
    let totalAmount = document.getElementById("order-total").textContent;

    // ✅ Save total amount to localStorage for the payment page
    localStorage.setItem("payment_total", totalAmount);

    // ✅ (Optional) Save order info (if needed for payment page or confirmation)
    localStorage.setItem("order_name", name);
    localStorage.setItem("order_phone", phone);
    localStorage.setItem("order_address", address);

    // ⚠️ DO NOT clear the cart yet — keep it for payment page
    // localStorage.removeItem("cart");

    // ✅ Redirect user to payment page
    window.location.href = "/payment";
  });
});

// ✅ Render order summary from cart
function renderOrderSummary() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let orderSummary = document.getElementById("order-summary");
  let orderTotal = document.getElementById("order-total");

  orderSummary.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    let li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `<span>${item.name} (x${item.quantity})</span> <span>sh${item.price * item.quantity}</span>`;
    orderSummary.appendChild(li);
  });

  // ✅ Display the total cost
  orderTotal.textContent = total;
}


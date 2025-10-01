
/*let cart = [];
let total = 0;

function addToCart(productName, price) {
  // Add product to cart array
  cart.push({ name: productName, price: price });

  // Update cart count
  document.getElementById("cart-count").textContent = cart.length;

  // Update cart items
  let cartItems = document.getElementById("cart-items");
  let li = document.createElement("li");
  li.textContent = productName + " - sh" + price;
  cartItems.appendChild(li);

  // Update total price
  total += price;
  document.getElementById("cart-total").textContent = total;
}
*/

function addToCart(productName, price, imageUrl) {
  // Get existing cart or create empty
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if item already exists (increase quantity)
  let existingItem = cart.find(item => item.name === productName);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name: productName, price: price, image: imageUrl, quantity: 1 });
  }

  // Save back to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update cart count in navbar
  document.getElementById("cart-count").textContent =
    cart.reduce((sum, item) => sum + item.quantity, 0);
}

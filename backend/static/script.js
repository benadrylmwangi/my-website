

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

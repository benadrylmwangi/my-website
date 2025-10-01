const customerData = {
  name: "Jane Mwangi",
  email: "janemwangi@gmail.com",
  phone: "+254 712 345 678",
  address: "Embu, Kenya",
  orders: [
    { id: 1050, item: "Blue Dress", price: "KSh 3,000" },
    { id: 1049, item: "Sandals", price: "KSh 1,200" },
    { id: 1048, item: "Handbag", price: "KSh 2,800" }
  ]
};

// Load customer data into profile page
document.getElementById("customerName").textContent = customerData.name;
document.getElementById("customerEmail").textContent = customerData.email;
document.getElementById("customerPhone").textContent = customerData.phone;
document.getElementById("customerAddress").textContent = customerData.address;

// Load orders
const orderList = document.getElementById("orderList");
orderList.innerHTML = "";
customerData.orders.forEach(order => {
  const li = document.createElement("li");
  li.textContent = `Order #${order.id} - ${order.item} - ${order.price}`;
  orderList.appendChild(li);
});

// Edit profile button
document.getElementById("editProfileBtn").addEventListener("click", () => {
  alert("Redirecting to Edit Profile Page...");
  // window.location.href = "edit-profile.html";
});

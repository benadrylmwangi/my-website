
document.addEventListener("DOMContentLoaded", () => {
  const paymentAmount = document.getElementById("paymentAmount");
  const paymentMethod = document.getElementById("method");
  const cardFields = document.getElementById("cardFields");
  const mpesaFields = document.getElementById("mpesaFields");
  const airtelFields = document.getElementById("airtelFields");
  const paymentForm = document.getElementById("paymentForm");
  const confirmation = document.getElementById("confirmation");

  // ✅ 1. Load total amount from localStorage or allow manual input
  const savedAmount = localStorage.getItem("payment_total");
  if (savedAmount) {
    paymentAmount.value = savedAmount;
  } else {
    paymentAmount.removeAttribute("readonly");
    paymentAmount.placeholder = "Enter amount";
  }

  // ✅ 2. Show / Hide payment method fields
  paymentMethod.addEventListener("change", () => {
    cardFields.style.display = "none";
    mpesaFields.style.display = "none";
    airtelFields.style.display = "none";

    if (paymentMethod.value === "card") {
      cardFields.style.display = "block";
    } else if (paymentMethod.value === "mpesa") {
      mpesaFields.style.display = "block";
    } else if (paymentMethod.value === "airtel") {
      airtelFields.style.display = "block";
    }
  });

  // ✅ 3. Validate and handle payment form submission
  paymentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const amount = parseFloat(paymentAmount.value);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid payment amount.");
      return;
    }

    if (paymentMethod.value === "") {
      alert("Please select a payment method.");
      return;
    }

    // Additional validation based on method
    if (paymentMethod.value === "card") {
      const cardNumber = document.getElementById("cardNumber").value.trim();
      const expiry = document.getElementById("expiry").value;
      const cvv = document.getElementById("cvv").value.trim();

      if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
        alert("Enter a valid 16-digit card number.");
        return;
      }
      if (!expiry) {
        alert("Enter your card expiry date.");
        return;
      }
      if (cvv.length !== 3 || !/^\d+$/.test(cvv)) {
        alert("Enter a valid 3-digit CVV.");
        return;
      }
    }

    if (paymentMethod.value === "mpesa") {
      const mpesaPhone = document.getElementById("mpesaPhone").value.trim();
      if (!/^07\d{8}$/.test(mpesaPhone)) {
        alert("Enter a valid M-Pesa phone number (e.g., 07XXXXXXXX).");
        return;
      }
    }

    if (paymentMethod.value === "airtel") {
      const airtelPhone = document.getElementById("airtelPhone").value.trim();
      if (!/^07\d{8}$/.test(airtelPhone)) {
        alert("Enter a valid Airtel Money phone number (e.g., 07XXXXXXXX).");
        return;
      }
    }

    // ✅ 4. If everything is valid, show confirmation
    confirmation.innerHTML = `
      <div style="margin-top:20px; padding:10px; background:#e6ffed; border:1px solid #4CAF50;">
        ✅ Payment of <strong>KES ${amount}</strong> using <strong>${paymentMethod.value.toUpperCase()}</strong> is being processed...
      </div>
    `;

    // (Optional) Redirect to a success page after 3 seconds
    setTimeout(() => {
      window.location.href = "/payment-success"; // Change this route if needed
    }, 3000);
  });
});

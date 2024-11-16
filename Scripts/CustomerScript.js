	document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateLocalStorage() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Add to cart functionality
    document.querySelectorAll(".addToCart").forEach((button) => {
        button.addEventListener("click", (event) => {
            const item = event.target.closest(".recommended-item");
            const name = item.querySelector(".item-name").textContent.trim();
            const price = parseFloat(item.querySelector(".item-price").dataset.price);
            const quantityInput = item.querySelector(".quantity-input");
            const quantity = parseInt(quantityInput.value);
            const description = item.querySelector(".item-details p").textContent.trim();
            const image = item.querySelector("img").src;

            // Check if item is already in cart
            const existingItem = cart.find((product) => product.name === name);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({ name, price, quantity, description, image });
            }

            updateLocalStorage();
            alert(`Product has been added to the cart.`);

            // Reset quantity to 1
            quantityInput.value = 1;
        });
    });

    // Quantity adjustment buttons
    document.querySelectorAll(".quantity-btn.plus").forEach((button) => {
        button.addEventListener("click", (event) => {
            const quantityInput = event.target.parentNode.querySelector(".quantity-input");
            quantityInput.value = parseInt(quantityInput.value) + 1;
        });
    });

    document.querySelectorAll(".quantity-btn.minus").forEach((button) => {
        button.addEventListener("click", (event) => {
            const quantityInput = event.target.parentNode.querySelector(".quantity-input");
            quantityInput.value = Math.max(1, parseInt(quantityInput.value) - 1);
        });
    });

    // Redirect to cart page
    document.getElementById("my-cart").addEventListener("click", (event) => {
        updateLocalStorage();
        window.location.href = "CartPage.html";
    });
});

// Load Dark Mode preference on page load
document.addEventListener("DOMContentLoaded", () => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    
    if (isDarkMode) {
        document.body.classList.add("dark-mode");
        const darkModeToggle = document.getElementById("darkModeToggle");
        if (darkModeToggle) darkModeToggle.checked = true;
    }
});

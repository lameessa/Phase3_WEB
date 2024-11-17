document.addEventListener("DOMContentLoaded", () => {
    let cart = []; // Simpler variable for cart storage

    // Add to cart functionality
    document.querySelectorAll(".addToCart").forEach((button) => {
        button.addEventListener("click", (event) => {
            const item = event.target.closest(".recommended-item");
            const name = item.querySelector(".item-name").textContent.trim();
            const price = parseFloat(item.querySelector(".item-price").textContent);
            const quantityInput = item.querySelector(".quantity-input");
            const quantity = parseInt(quantityInput.value);

            cart.push({ name, price, quantity });
            alert(`${name} has been added to the cart.`);

            // Reset quantity
            quantityInput.value = 1;
        });
    });

    // Quantity adjustment buttons
    document.querySelectorAll(".quantity-btn.plus").forEach((button) => {
        button.addEventListener("click", () => {
            const quantityInput = button.parentNode.querySelector(".quantity-input");
            quantityInput.value = parseInt(quantityInput.value) + 1;
        });
    });

    document.querySelectorAll(".quantity-btn.minus").forEach((button) => {
        button.addEventListener("click", () => {
            const quantityInput = button.parentNode.querySelector(".quantity-input");
            quantityInput.value = Math.max(1, parseInt(quantityInput.value) - 1);
        });
    });

    // Dark mode toggle
    const darkModeToggle = document.getElementById("darkModeToggle");
    darkModeToggle.addEventListener("change", () => {
        if (darkModeToggle.checked) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    });
});

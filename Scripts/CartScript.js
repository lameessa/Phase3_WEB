// Retrieve cart data from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update the cart display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    // Loop through each item in the cart and create HTML for it
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.classList.add('cart-item');

        // Create item HTML structure, including description and checkbox
        li.innerHTML = `
            <label class="hide-label" for="item-${index}">Select ${item.name}</label>
            <input type="checkbox" id="item-${index}" checked onchange="updateSummary()">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="item-info">
                <h2>${item.name}</h2>
                <p>${item.description}</p>
            </div>
            <div class="quantity">
                <label class="hide-label" for="quantity-${index}">Quantity</label>
                <button class="quantity-btn minus" data-id="${index}">-</button>
                <input type="text" id="quantity-${index}" value="${item.quantity}" min="1" onchange="updateSummary()" class="quantity-input">
                <button class="quantity-btn plus" data-id="${index}">+</button>
            </div>
            <div class="price" id="price-${index}">$${(item.price * item.quantity).toFixed(2)}</div>
            <button class="remove-item" type="button" onclick="removeFromCart(${index})">X</button>
        `;

        // Append item to the cart
        cartItemsContainer.appendChild(li);
    });

    // Attach event listeners to the `+` and `-` buttons
    document.querySelectorAll('.quantity-btn.plus').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent form submission
            const index = parseInt(button.getAttribute('data-id'));
            updateQuantity(index, 'increase');
        });
    });

    document.querySelectorAll('.quantity-btn.minus').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent form submission
            const index = parseInt(button.getAttribute('data-id'));
            updateQuantity(index, 'decrease');
        });
    });

    // Update the summary initially
    updateSummary();
}

// Function to update the quantity based on button click
function updateQuantity(index, action) {
    const quantityInput = document.getElementById(`quantity-${index}`);
    let currentQuantity = parseInt(quantityInput.value);

    if (action === 'increase') {
        currentQuantity += 1;
    } else if (action === 'decrease' && currentQuantity > 1) {
        currentQuantity -= 1;
    }

    // Update the quantity input field and save it to the cart
    quantityInput.value = currentQuantity;
    cart[index].quantity = currentQuantity;
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the individual item's price and the overall summary
    updateSummary();
}

// Function to update the summary section based on selected items
function updateSummary() {
    let subtotal = 0;

    // Loop through each cart item and calculate subtotal for selected items only
    cart.forEach((item, i) => {
        const checkbox = document.getElementById(`item-${i}`);
        const quantityInput = document.getElementById(`quantity-${i}`);
        
        // Only calculate for selected items
        if (checkbox && checkbox.checked) {
            const quantity = parseInt(quantityInput.value) || 1;
            item.quantity = quantity; // Update the cart item quantity
            subtotal += item.price * quantity;

            // Update the individual item's price in the DOM
            document.getElementById(`price-${i}`).innerText = `$${(item.price * quantity).toFixed(2)}`;
        }
    });

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    const total = subtotal + 20; // Include delivery fee

    // Update the summary section in the DOM
    document.getElementById('sub-total').innerText = `$${subtotal.toFixed(2)}`;
    document.getElementById('total').innerText = `$${total.toFixed(2)}`;
}

// Function to handle checkout
function handleCheckout(event) {
    event.preventDefault(); // Prevent the default form submission

    // Calculate the total with delivery fee
    let subtotal = 0;

    cart.forEach((item, index) => {
        const checkbox = document.getElementById(`item-${index}`);
        const quantityInput = document.getElementById(`quantity-${index}`);
        
        // Only include selected items in subtotal
        if (checkbox && checkbox.checked) {
            const quantity = parseInt(quantityInput.value) || 1;
            subtotal += item.price * quantity;
        }
    });

    const total = subtotal + 20; // Add a fixed delivery fee

    // Show popup with the calculated total
    alert(`Checkout complete! Total Price: $${total.toFixed(2)}`);

    // Redirect to Review page
    window.location.href = "ReviewPage.html";
}

// Function to remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove item from cart array
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    updateCartDisplay(); // Refresh cart display
}

// Function to select all items
document.getElementById("selectAll-btn").addEventListener("click", () => {
    document.querySelectorAll(".cart-items input[type='checkbox']").forEach((checkbox) => {
        checkbox.checked = true;
    });
    updateSummary(); // Update summary after selecting all
});

// Function to remove all selected items
document.getElementById("removeAll-btn").addEventListener("click", () => {
    cart = cart.filter((_, index) => {
        const checkbox = document.getElementById(`item-${index}`);
        return !checkbox.checked;
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay(); // Refresh cart display
});

// Load Dark Mode preference
document.addEventListener("DOMContentLoaded", () => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    if (isDarkMode) {
        document.body.classList.add("dark-mode");
    }
    updateCartDisplay(); // Initial display of cart items
});

// Attach checkout handler
document.querySelector(".cart-form").addEventListener("submit", handleCheckout);

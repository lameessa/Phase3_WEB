let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateQuantity(productId, action) {
    const quantityInput = document.getElementById(`${productId}-quantity`);
    let currentQuantity = parseInt(quantityInput.value);
    if (action === 'increase') {
        currentQuantity += 1;
    } else if (action === 'decrease' && currentQuantity > 1) {
        currentQuantity -= 1;
    }
    quantityInput.value = currentQuantity;
}

function addToCart(productId) {
    const item = document.querySelector(`#${productId}`);
    const quantity = parseInt(document.getElementById(`${productId}-quantity`).value);
    const name = item.querySelector('h3').innerText;
    const price = parseFloat(item.querySelector('.price').innerText.replace('$', ''));
    const description = item.querySelector('p').innerText;
    const image = item.querySelector('img').src;

    // chack if item is already in cart
    const existingItemIndex = cart.findIndex(product => product.id === productId);
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: name,
            price: price,
            quantity: quantity,
            description: description,
            image: image
        });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById(`${productId}-quantity`).value = 1;
    alert(`${name} has been added to cart`);
	
	 // redirect to cart page
    document.getElementById("my-cart").addEventListener("click", (event) => {
    updateLocalStorage();
    window.location.href = "CartPage.html";   });
}

document.querySelectorAll('.increase').forEach(button => {
    button.addEventListener('click', (event) => {
        const productId = event.target.getAttribute('data-id');
        updateQuantity(productId, 'increase');
    });
});

document.querySelectorAll('.decrease').forEach(button => {
    button.addEventListener('click', (event) => {
        const productId = event.target.getAttribute('data-id');
        updateQuantity(productId, 'decrease');
    });
});

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        const productId = event.target.getAttribute('data-id');
        addToCart(productId);
    });
});

// Sorting 
document.getElementById('sort').addEventListener('change', (e) => {
    const sortValue = e.target.value;
    const itemsList = document.getElementById('itemList');
    const items = Array.from(itemsList.querySelectorAll('.item'));

    if (sortValue === 'low-to-high') {
        items.sort((a, b) => parseFloat(a.querySelector('.price').textContent.replace('$', '')) - parseFloat(b.querySelector('.price').textContent.replace('$', '')));
    } else if (sortValue === 'high-to-low') {
        items.sort((a, b) => parseFloat(b.querySelector('.price').textContent.replace('$', '')) - parseFloat(a.querySelector('.price').textContent.replace('$', '')));
    } else if (sortValue === 'A-Z') {
        items.sort((a, b) => a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent));
    } else if (sortValue === 'Z-A') {
        items.sort((a, b) => b.querySelector('h3').textContent.localeCompare(a.querySelector('h3').textContent));
    }

    itemsList.innerHTML = '';
    items.forEach(item => itemsList.appendChild(item));
});

//  Dark Mode 
document.addEventListener("DOMContentLoaded", () => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    
    if (isDarkMode) {
        document.body.classList.add("dark-mode");
        const darkModeToggle = document.getElementById("darkModeToggle");
        if (darkModeToggle) darkModeToggle.checked = true;
    }
});
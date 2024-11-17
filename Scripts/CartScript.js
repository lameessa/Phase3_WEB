let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartDisplay() {
const cartItemsContainer = document.getElementById('cart-items');
cartItemsContainer.innerHTML = '';
cart.forEach((item, index) => {
const li = document.createElement('li');
li.classList.add('cart-item');

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
		<button class="remove-item" type="button" onclick="removeFromCart(${index})">X</button>       `;

cartItemsContainer.appendChild(li);   });


document.querySelectorAll('.quantity-btn.plus').forEach(button => {
	button.addEventListener('click', (event) => {
	event.preventDefault(); // prevent submission
	const index = parseInt(button.getAttribute('data-id'));
	updateQuantity(index, 'increase');	});
	});

document.querySelectorAll('.quantity-btn.minus').forEach(button => {
	button.addEventListener('click', (event) => {
	event.preventDefault(); //prevent submission
	const index = parseInt(button.getAttribute('data-id'));
	updateQuantity(index, 'decrease');	});
	});


    updateSummary();	}// end cart display


function updateQuantity(index, action) {
const quantityInput = document.getElementById(`quantity-${index}`);
let currentQuantity = parseInt(quantityInput.value);
if (action === 'increase') {
	currentQuantity += 1;	} 
	else if (action === 'decrease' && currentQuantity > 1) {
		currentQuantity -= 1;	 }

	quantityInput.value = currentQuantity;
	cart[index].quantity = currentQuantity;
	localStorage.setItem('cart', JSON.stringify(cart));
	
	updateSummary();	} //end update quantity

function updateSummary() {
	let subtotal = 0;
	cart.forEach((item, i) => {
		const checkbox = document.getElementById(`item-${i}`);
		const quantityInput = document.getElementById(`quantity-${i}`);
		if (checkbox && checkbox.checked) { //on;y checked
			const quantity = parseInt(quantityInput.value) || 1;
			item.quantity = quantity; 
			subtotal += item.price * quantity;
			document.getElementById(`price-${i}`).innerText = `$${(item.price * quantity).toFixed(2)}`;       }
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    const total = subtotal + 20; //  delivery fee
    document.getElementById('sub-total').innerText = `$${subtotal.toFixed(2)}`;
    document.getElementById('total').innerText = `$${total.toFixed(2)}`;
}//end summary

function handleCheckout(event) {
    event.preventDefault(); // prevent submission
    let subtotal = 0;
    cart.forEach((item, index) => {
        const checkbox = document.getElementById(`item-${index}`);
        const quantityInput = document.getElementById(`quantity-${index}`);
        if (checkbox && checkbox.checked) { //only checked
            const quantity = parseInt(quantityInput.value) || 1;
            subtotal += item.price * quantity;       }
    });
    const total = subtotal + 20; // Add a fixed delivery fee
    alert(`Checkout complete! Total Price: $${total.toFixed(2)}`);
    cart = []; //clear cart
    localStorage.removeItem("cart");
    updateCartDisplay(); 
    window.location.href = "ReviewPage.html"; //redirect to review page
}


function removeFromCart(index) {
    cart.splice(index, 1); // remove item from cart array
    localStorage.setItem('cart', JSON.stringify(cart)); 
    updateCartDisplay(); 
}



document.getElementById("selectAll-btn").addEventListener("click", () => {
    document.querySelectorAll(".cart-items input[type='checkbox']").forEach((checkbox) => {
	checkbox.checked = true;
    });
    updateSummary(); 	});

document.getElementById("removeAll-btn").addEventListener("click", () => {
    cart = [];
    localStorage.removeItem("cart");
    updateCartDisplay();	});



document.querySelector(".cart-form").addEventListener("submit", handleCheckout);

//  Dark Mode 
document.addEventListener("DOMContentLoaded", () => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    if (isDarkMode) {
        document.body.classList.add("dark-mode");	    }
    updateCartDisplay(); 	});


function setRating(score) {
    document.getElementById("rating").value = score;
    const stars = document.querySelectorAll(".rating-stars button img");
    stars.forEach((star, index) => {
        star.style.opacity = index < score ? "1" : "0.5";
    });
}

// Handle form submission
document.getElementById("review-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const orderSelect = document.getElementById("list-order-rev");
    const rating = document.getElementById("rating").value;
    const productSelect = document.getElementById("product-select");
    const selectedOrder = orderSelect.options[orderSelect.selectedIndex].text;
    const selectedProduct = productSelect.options[productSelect.selectedIndex].text;

    // check if order and rating are selected
    if (orderSelect.value === "" && rating === "") {
        alert("Please select an order and provide a rating.");
        return;    }
		
     if (orderSelect.value === "") {
        alert("Please select an order.");
        return;    }

    if (rating === "") {
        alert("Please provide a rating.");
        return;    }
		
    alert(`Thank you for your feedback!\nYour rating for ${selectedProduct} is ${rating}.`);
    // redirect to HomePage.html
    window.location.href = "HomePage.html";		});

//  Dark Mode 
document.addEventListener("DOMContentLoaded", () => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    
    if (isDarkMode) {
        document.body.classList.add("dark-mode");
        const darkModeToggle = document.getElementById("darkModeToggle");
        if (darkModeToggle) darkModeToggle.checked = true;
    }
});
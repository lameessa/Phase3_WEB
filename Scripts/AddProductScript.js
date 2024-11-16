document.addEventListener("DOMContentLoaded", () => {
    const productForm = document.querySelector("form");
    const fileInput = document.getElementById("file-upload");

    productForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Get input values
        const productName = document.getElementById("product-name").value.trim();
        const price = document.getElementById("price").value.trim();
        const category = document.getElementById("category-list").value;
        const numItems = document.getElementById("num-items").value.trim();
        const description = document.getElementById("description").value.trim();

        // Check for empty fields
        if (!productName || !price || !category || !numItems || !description) {
            alert("Please fill in all fields.");
            return;
        }

        // Check if the product name starts with a number
        if (/^\d/.test(productName)) {
            alert("The product name should not start with a number.");
            return;
        }

        // Check if price and quantity are valid numbers
        if (isNaN(price) || isNaN(numItems)) {
            alert("Price and quantity should be valid numbers.");
            return;
        }

        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageUrl = e.target.result;

                // Store the product data in localStorage
                let products = JSON.parse(localStorage.getItem("products")) || [];
                const newProduct = {
                    name: productName,
                    price: parseFloat(price),
                    category: category,
                    numItems: parseInt(numItems, 10),
                    description: description,
                    imageUrl: imageUrl 
                };
                products.push(newProduct);
                localStorage.setItem("products", JSON.stringify(products));

                // Alert for successful product addition
                alert(`Product added successfully: ${productName}`);

                // Clear the form
                productForm.reset();
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please upload a product image.");
        }
    });
});
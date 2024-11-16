    document.addEventListener("DOMContentLoaded", () => {
      
        const productList = document.getElementById("product-list");

   
        let products = JSON.parse(localStorage.getItem("products")) || [];

 
        if (products.length > 0) {
            products.forEach((product) => {
              
                const productItem = document.createElement("div");
                productItem.classList.add("product");
                productItem.innerHTML = `
                    <img src="${product.imageUrl || 'default-image.png'}" alt="${product.name}">
                    <h4>${product.name}</h4>
                    <p>${product.description}</p>
                    <p>Quantity: ${product.numItems}</p>
                    <p>Price: $${product.price.toFixed(2)}</p>
                `;
           
                productList.appendChild(productItem);
            });
        } else {
           
            document.getElementById("no-products-msg").style.display = 'block';
        }
    });
	
	

   // Dark mode toggle
document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    
    if (isDarkMode) {
        document.body.classList.add("dark-mode");
        darkModeToggle.checked = true;
    }

    darkModeToggle.addEventListener("change", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", darkModeToggle.checked);
    });
});

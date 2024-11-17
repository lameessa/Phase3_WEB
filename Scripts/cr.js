document.addEventListener("DOMContentLoaded", () => {
    const cart = [
        { name: "Item 1", price: 10, quantity: 2 },
        { name: "Item 2", price: 20, quantity: 1 },
    ];

    function calculateTotal() {
        let subtotal = 0;
        cart.forEach((item) => {
            subtotal += item.price * item.quantity;
        });
        const total = subtotal + 20; // Fixed delivery fee
        alert(`Subtotal: $${subtotal}\nTotal (with delivery): $${total}`);
    }

    // Checkout button
    document.getElementById("checkout-btn").addEventListener("click", (event) => {
        calculateTotal();
        alert("Thank you for your purchase!");
    });
});

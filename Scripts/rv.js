document.addEventListener("DOMContentLoaded", () => {
    const stars = document.querySelectorAll(".rating-stars button");

    stars.forEach((star, index) => {
        star.addEventListener("click", () => {
            stars.forEach((s, i) => {
                s.style.opacity = i <= index ? "1" : "0.5"; // Highlight selected stars
            });
            alert(`You rated this ${index + 1} stars.`);
        });
    });

    document.getElementById("review-form").addEventListener("submit", (event) => {
        event.preventDefault();
        alert("Thank you for your feedback!");
    });
});

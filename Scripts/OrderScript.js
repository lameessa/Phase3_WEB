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

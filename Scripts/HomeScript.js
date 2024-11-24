    function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    // Save user preference to localStorage
    const isDarkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkMode);

    // Change the vision section image based on the mode
    const visionImage = document.querySelector(".vision-image img");
    visionImage.src = isDarkMode ? "images/Image-1 2.png" : "images/vision.png";
}

// Load Dark Mode preference on page load
document.addEventListener("DOMContentLoaded", () => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    
    if (isDarkMode) {
        document.body.classList.add("dark-mode");
        document.getElementById("darkModeToggle").checked = true;
        
        // Set the dark mode image on page load if dark mode is enabled
        const visionImage = document.querySelector(".vision-image img");
        visionImage.src = "images/Image-1 2.png";
    } else {
        const visionImage = document.querySelector(".vision-image img");
        visionImage.src = "images/vision.png";
    }
});

// Function to get the start of the current week (Sunday)
function getWeekStartDate() {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 is Sunday, 1 is Monday, etc.
    const weekStart = new Date(now); // Copy the current date

    // Calculate the difference to get back to Sunday
    weekStart.setDate(now.getDate() - dayOfWeek);

    // Format the date as "Day DD Month, YYYY"
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return weekStart.toLocaleDateString('en-SA', options);
}

// Display the date at the beginning of the homepage
document.addEventListener("DOMContentLoaded", () => {
    const dateElement = document.querySelector(".week-start-date");
    dateElement.textContent = `This week's start date: ${getWeekStartDate()}`;
});



document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("toggleOffersButton");
    const additionalOffers = document.querySelector(".additional-offers");

    toggleButton.addEventListener("click", () => {
        additionalOffers.classList.toggle("hidden");

        // Change the button text based on the state
        if (additionalOffers.classList.contains("hidden")) {
            toggleButton.textContent = "More";
        } else {
            toggleButton.textContent = "Less";
        }
    });
});

   // Display offers from localStorage and include existing hardcoded offers
document.addEventListener("DOMContentLoaded", () => {
    const offersContainer = document.querySelector(".offers-container");
    const toggleButton = document.getElementById("toggleOffersButton");

    // Load offers from localStorage
    let offers = JSON.parse(localStorage.getItem("offers")) || [];

    // Get existing hardcoded offers from the page
    const existingOffers = Array.from(offersContainer.querySelectorAll(".offer-item")).map(offerItem => ({
        title: offerItem.querySelector("h3").textContent,
        description: offerItem.querySelector("p").textContent,
        imageUrl: offerItem.querySelector("img").src,
        discount: offerItem.querySelector("p:last-of-type")
            ? parseInt(
                offerItem.querySelector("p:last-of-type").textContent
                    .replace('Discount: ', '')
                    .replace('%', '')
            ) || null
            : null // Extract numeric discount
    }));

    // Combine hardcoded and stored offers
    offers = [...existingOffers, ...offers];

    // Initial state to show only the first 3 offers
    let showAll = false;

    // Function to display offers with a limit
    function displayOffers() {
        offersContainer.innerHTML = ''; // Clear existing offers to re-render correctly

        // Display the initial 3 offers or all offers based on the state
        const offersToShow = showAll ? offers : offers.slice(0, 3);

        // Render all offers (hardcoded + new)
        offersToShow.forEach((offer, index) => {
            const offerItem = document.createElement("div");
            offerItem.classList.add("offer-item");
            offerItem.id = `offer-${index}`;
            offerItem.innerHTML = `
                <h3>${offer.title}</h3>
                <img src="${offer.imageUrl || 'default-image.png'}" alt="${offer.title}">
                <p>${offer.description}</p>
                ${
                    offer.discount !== null
                        ? `<p>Discount: ${offer.discount}%</p>` // Always add percentage symbol
                        : ''
                }
            `;
            offersContainer.appendChild(offerItem);
        });

        // Update button visibility and text
        if (offers.length > 3) {
            toggleButton.style.display = 'block';
            toggleButton.textContent = showAll ? 'Less' : 'More';
        } else {
            toggleButton.style.display = 'none';
        }
    }

    // Initial display of offers
    displayOffers();

    // Event listener for the "More" button
    toggleButton.addEventListener('click', () => {
        showAll = !showAll;
        displayOffers();
    });
});
// Add hover effect for review items
document.addEventListener("DOMContentLoaded", () => {
    const reviewItems = document.querySelectorAll(".review-item");

    reviewItems.forEach((item) => {
        const hoverInfo = item.querySelector(".hover-info");

        if (hoverInfo) {
            // Show hover-info on mouseover
            item.addEventListener("mouseover", () => {
                hoverInfo.style.display = "block";
            });

            // Hide hover-info on mouseout
            item.addEventListener("mouseout", () => {
                hoverInfo.style.display = "none";
            });
        }
    });
});

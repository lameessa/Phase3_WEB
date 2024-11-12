// Select elements in the page
const deleteButton = document.querySelector(".delete-button");
const offersContainer = document.querySelector(".offers-container");
const offerForm = document.querySelector(".add-offer-form");

// Load offers from localStorage or initialize an empty array
let offers = JSON.parse(localStorage.getItem("offers")) || [];

// Function to render offers
function renderOffers() {
    offersContainer.innerHTML = ''; // Clear existing offers

    if (offers.length > 0) {
        offers.forEach((offer, index) => {
            const offerItem = document.createElement("div");
            offerItem.classList.add("offer-item");
            offerItem.innerHTML = `
                <label class="hide-label">Select Offer ${index + 1}</label>
                <input type="checkbox" class="offer-checkbox" data-index="${index}">
                <img src="${offer.imageUrl || 'default-image.png'}" alt="${offer.title}">
                <div class="offer-details">
                    <h3>${offer.title}</h3>
                    <p>${offer.description}</p>
                    <p>Discount: ${offer.discount}%</p>
                </div>
            `;
            offersContainer.appendChild(offerItem);
        });
    } else {
        const noOffersMsg = document.createElement("p");
        noOffersMsg.textContent = "No offers available. Please add a new offer.";
        offersContainer.appendChild(noOffersMsg);
    }
}

// Initial render of offers
renderOffers();

// Add a new offer
offerForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Validate inputs
    const title = document.getElementById("offer-title").value.trim();
    const description = document.getElementById("offer-description").value.trim();
    const discount = document.getElementById("offer-discount").value.trim();
    const imageInput = document.getElementById("offer-upload").files[0];

    if (!title || !description || !discount || !imageInput) {
        alert("Please fill in all fields.");
        return;
    }

    // Create a new offer object
    const reader = new FileReader();
    reader.onload = () => {
        const newOffer = {
            title: title,
            description: description,
            discount: parseInt(discount, 10),
            imageUrl: reader.result
        };

        // Add the new offer to the array and update localStorage
        offers.push(newOffer);
        localStorage.setItem("offers", JSON.stringify(offers));
        renderOffers(); // Re-render the offers
        alert("New offer has been added successfully.");

        // Reset the form
        offerForm.reset();
    };
    reader.readAsDataURL(imageInput);
});
// Delete selected offers
deleteButton.addEventListener("click", () => {
    const offerCheckboxes = offersContainer.querySelectorAll(".offer-checkbox");
    const selectedIndexes = Array.from(offerCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => parseInt(checkbox.getAttribute("data-index")));

    if (selectedIndexes.length === 0) {
        alert("Please select at least one offer");
        return;
    }

    const confirmDelete = confirm("Are you sure you want to delete the selected offers?");
    if (confirmDelete) {
        // Remove selected offers from the array
        offers = offers.filter((_, index) => !selectedIndexes.includes(index));
        localStorage.setItem("offers", JSON.stringify(offers)); // Update localStorage
        renderOffers(); // Re-render the offers
        alert("Selected offers have been deleted.");
    }
});

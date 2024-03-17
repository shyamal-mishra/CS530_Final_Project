function showProductDetails(productId) {
    // Simulate fetching product details from a server
    const productDetails = getProductDetails(productId);

    // Display product details in a new page or modal
    // Here, we'll just log the details to the console
    console.log("Product Details:", productDetails);
}

function getProductDetails(productId) {
    // Simulate fetching product details from a server based on productId
    // In a real application, you would make an AJAX request to your backend server
    // and retrieve the details of the product with the given productId
    // For demonstration purposes, we'll return static data
    return {
        id: productId,
        name: "Product " + productId,
        description: "Description of Product " + productId,
        poster: "John Doe",
        postedDate: "March 8, 2024"
    };
}


document.addEventListener("DOMContentLoaded", function() {
    const productsContainer = document.querySelector(".product-container");
    const products = [...document.querySelectorAll(".product")];
    const filterButtons = document.querySelectorAll(".filter-button");

    // Initial sort based on position (assuming "All Listings" is initially selected)
    sortProducts(products);



    filterButtons.forEach(button => {
        button.addEventListener("click", function() {
            const category = this.dataset.category;
            if (category === "all-listing") {
                sortProducts(products); // Display all products when "All Listings" button is clicked
            } else {
                const sortedProducts = products.filter(product => {
                    return product.dataset.category === category;
                });
                sortProducts(sortedProducts);
            }
        });
    });

    products.forEach(product => {
        const savedButton = product.querySelector(".save-button"); // Assuming your "Saved" button has a class "save-button"
        if (savedButton) {
            savedButton.addEventListener("click", function() {
                // Change the category of the product to "saved-listing"
                product.dataset.category = "saved-listing";
                // Re-sort products based on the current filter
                const currentFilter = document.querySelector(".filter-button.active").dataset.category;
                const filteredProducts = products.filter(product => {
                    return currentFilter === "all" || product.dataset.category === currentFilter;
                });
                sortProducts(filteredProducts);
            });
        }
    });

    function sortProducts(sortedProducts) {
        productsContainer.innerHTML = ""; // Clear product container
        sortedProducts.forEach((product, index) => {
            productsContainer.appendChild(product); // Append sorted products to container
            // Shift the sorted item from position 0
            if (index === 0) {
                productsContainer.insertBefore(product, productsContainer.firstChild);
            }
        });
    }
});



document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const products = document.querySelectorAll(".product");

    function filterProducts(searchTerm) {
        products.forEach(function(product) {
            const productName = product.querySelector("h3").textContent.toLowerCase();
            if (productName.includes(searchTerm)) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        });
    }

    searchButton.addEventListener("click", function() {
        const searchTerm = searchInput.value.toLowerCase();
        filterProducts(searchTerm);
    });

    searchInput.addEventListener("input", function() {
        const searchTerm = searchInput.value.toLowerCase();
        filterProducts(searchTerm);
    });
});





document.addEventListener("DOMContentLoaded", function() {
    // Make an AJAX request to fetch the user's listings
    fetch('/user_listings')
        .then(response => response.json())
        .then(data => {
            // Handle the fetched listings data
            displayUserListings(data);
        })
        .catch(error => {
            console.error('Error fetching user listings:', error);
        });
    
    // Function to display the user's listings
    function displayUserListings(listings) {
        // Assuming you have a container element to display the listings
        const listingsContainer = document.getElementById('user-listings-container');
        
        // Clear the container before adding new listings
        listingsContainer.innerHTML = '';
        
        // Iterate over the fetched listings and create HTML elements to display them
        listings.forEach(listing => {
            const listingElement = document.createElement('div');
            listingElement.innerHTML = `
                <h3>${listing.title}</h3>
                <p>${listing.description}</p>
                <!-- Add other listing details as needed -->
            `;
            listingsContainer.appendChild(listingElement);
        });
    }
});


// Get references to the image container and the next button
const imageContainer = document.querySelector('.image-container');
const nextButton = document.getElementById('next-button');

// Array containing the paths of your images
const images = ['static/img/resort-911968_1280.jpg', 'static/img/pexels-photo-2582818.jpeg', 'third_image.jpg'];

// Variable to keep track of the current image index
let currentIndex = 0;

// Function to update the image displayed
function updateImage() {
    imageContainer.innerHTML = `<img src="${images[currentIndex]}" alt="Image ${currentIndex + 1}">`;
}

// Event listener for the next button
nextButton.addEventListener('click', function() {
    // Increment the current index
    currentIndex++;
    // If currentIndex exceeds the last index, loop back to the first image
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    // Update the image displayed
    updateImage();
});

// Display the initial image
updateImage();








function displaySelectedImages(input) {
    const container = document.getElementById('selectedImagesContainer');
    container.innerHTML = ''; // Clear previous images

    if (input.files && input.files.length > 0) {
        for (let i = 0; i < input.files.length; i++) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const image = document.createElement('img');
                image.src = e.target.result;
                image.classList.add('selected-image');
                container.appendChild(image);
            }
            reader.readAsDataURL(input.files[i]);
        }
    }
}


// Assuming you have a function to trigger sorting/rearranging products
function sortAndRearrangeProducts() {
    // Your sorting/rearranging logic goes here

    // Add animation class to products
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        product.classList.add('animated');
        // Remove animation class after animation completes
        product.addEventListener('animationend', () => {
            product.classList.remove('animated');
        });
    });
}

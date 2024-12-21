document.getElementById("company-details").addEventListener("sectionEnter",async ()=>{
    
    displayCompanyDetails(await fetchCompanyDetailsData(window.location.hash.split('?')[1].split('=')[1]));
    autoScrollProducts();

}); 
async function fetchCompanyDetailsData(id) {
    var companies ;
    await fetch(`http://localhost:5500/data/companyDetails${id}.json`).then(response => response.json()).then(data => {
        companies =data;
    }).catch(error => {
        console.error('Error fetching companies:', error);
    });
    return companies;
}
function displayCompanyDetails(companyDetails) {
    var companiesDiv = document.getElementById('company-details-header');
    companiesDiv.innerHTML = `
    <div class="company-details">
        <div class="logo">
            <img src="${companyDetails.imagePath}" alt="logo">
            <div>
                <h1>${companyDetails.name}</h1>
                <p class="location">${companyDetails.address}</p>
                <p class="description">${companyDetails.description}</p>
            </div>
        </div>
        <button class="be-cofounder">Be Co-Founder</button>
    </div>
    
    `;
    var productsSection = document.getElementById('product-grid');
    companyDetails.products.forEach(product => {
        var productDiv = document.createElement('div');
        productDiv.className = 'product-card';
        productDiv.setAttribute('data-name', product.name.toLowerCase())
        productDiv.setAttribute('onclick', `prodctDetails(${product.id})`)
        productDiv.innerHTML = `
            <div class="card-image">
            <img src="${product.imagePath}" alt="${product.name}">
            </div>
            <div class= "card-content">
                <h3>${product.name}</h3>
                <h3> ${product.price}</h3>
                <p class="description">${product.description}</p>
                <button onclick="addToCart(event, ${product.id}, 1)">Buy</button>
            </div>
            `;
        productsSection.appendChild(productDiv);
    });

    var jobsSection = document.getElementById('jobs-grid');
    companyDetails.jobOffers.forEach(job => {
        var jobDiv = document.createElement('div');
        jobDiv.className = 'container-fluid mt-5 p-4 border bg-muted rounded-5 ';
        jobDiv.innerHTML = `
        <div class="d-flex justify-content-between m-5">
            <h1>${job.title}</h1>
            <button class="btn btn-secondary">APPLY</button>
        </div>
        <div class="container p-4 border bg-muted text-dark mt-4 rounded-3">
            <h5>Job Description..</h5>
            <p>${job.location}</p>
            <p>${job.description}</p>
        </div>`
        jobsSection.appendChild(jobDiv);
    });
}

function addToCart(event, productId, number) {
    event.stopPropagation();
    // Retrieve the cart from local storage or initialize an empty object if not present
    let cart = JSON.parse(localStorage.getItem('cart')) || {};

    // Check if the product already exists in the cart
    if (cart[productId]) {
        // If it exists, increase the value by the given number
        cart[productId] += number;
    } else {
        // If it does not exist, set the initial value to the given number
        cart[productId] = number;
    }

    // Save the updated cart back to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to filter products by name
function filterProducts() {
    const searchText = document.getElementById('search-in-products').value.toLowerCase();
    const productCards = document.querySelectorAll('#product-grid .product-card');

    productCards.forEach(productCard => {
        const productName = productCard.getAttribute('data-name');
        if (productName.includes(searchText)) {
            productCard.style.display = 'inline-block'; // Show product
        } else {
            productCard.style.display = 'none'; // Hide product
        }
    });
}

var scrollInterval;
function autoScrollProducts() {
    const productGrid = document.getElementById('product-grid');
    const resetThreshold =   productGrid.scrollWidth - productGrid.clientWidth+150;
    let scrollAmount = 0;
    var scrollSpeed = 5;
    scrollInterval = setInterval(() => {
        productGrid.scrollBy(scrollSpeed,0);
        scrollAmount += scrollSpeed;
        if (scrollAmount >= resetThreshold ||scrollAmount <= 0) {
            scrollSpeed = -scrollSpeed;
        }
    }, 100);
}


function prodctDetails(id){
    window.location.hash = `#product-details?id=${id}`;
}

document.getElementById("company-details").addEventListener("sectionLeave", () => {
    clearInterval(scrollInterval);
});

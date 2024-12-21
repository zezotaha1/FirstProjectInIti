document.getElementById("product-details").addEventListener("sectionEnter",async ()=>{
    let productDetails= await fetchProductDetailsData(window.location.hash.split('?')[1].split('=')[1])
    displayProductDetails(productDetails)
});
async function fetchProductDetailsData(id) {
    var product;
    await fetch(`http://localhost:5500/data/product${id}.json`).then(response => response.json()).then(data => {
        product= data;
    }).catch(error => {
        console.error('Error fetching companies:', error);
    });
    return product;
}
function displayProductDetails(productDetails) {
    document.getElementById("productImage").src = productDetails.imagePath;
    document.getElementById("productName").innerText = productDetails.name;
    document.getElementById("productDescription").innerText = productDetails.description;

    rate=document.getElementById("rating");
    for(let i=0;i<5;i++){
        if(i<productDetails.rate)
            rate.innerHTML+="<i class='fa-solid fa-star checked'></i>";
        else
            rate.innerHTML+="<i class='fa-solid fa-star'></i>";
    }
    rate.innerHTML+= `  <span>${productDetails.numberOfReviws} Reviews</span>`;
    document.getElementById("productPrice").innerText ="$"+ productDetails.price;
    document.getElementById("productAddTocart").setAttribute("onclick",`addToCart(event,${productDetails.id},1)`);
    

}
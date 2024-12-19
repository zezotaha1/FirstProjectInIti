window.addEventListener("load",async ()=>{
    displayTestimonial(await fetchTestimonial());
    $('.clients-carousel').owlCarousel({
        loop: true,
        nav: false,
        autoplay: true,
        autoplayTimeout: 5000,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 450,
        margin: 30,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            991: {
                items: 2
            },
            1200: {
                items: 3
            },
            1920: {
                items: 3
            }
        }
    });
});
async function fetchTestimonial() {
    var testimoinals ;
    await fetch('http://localhost:5500/data/testimonial.json').then(response => response.json()).then(data => {
        testimoinals =data;
    }).catch(error => {
        console.error('Error fetching testimoinals:', error);
    });
    return testimoinals;
}
function displayTestimonial(testimoinals) {
    var testimoinalsDiv = document.getElementById('testimoinal-list');
    testimoinalsDiv.innerHTML = '';
    testimoinals.forEach(testimoinal => {
        var testimoinalDiv = document.createElement('div');
        testimoinalDiv.className = 'single-box';
        testimoinalDiv.innerHTML = `
                <div class="img-area"><img alt="" class="img-fluid" src="${testimoinal.image}"></div>
                <div class="content">
                  <p>${testimoinal.content}</p>
                  <h4>${testimoinal.name}</h4>
                </div>
            `;
        testimoinalsDiv.appendChild(testimoinalDiv);
    });
}
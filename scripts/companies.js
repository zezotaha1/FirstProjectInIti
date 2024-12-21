document.getElementById("companies").addEventListener("sectionEnter",async ()=>{
    displayCompanies(await fetchCompanies());
});
async function fetchCompanies() {
    var companies ;
    await fetch('http://localhost:5500/data/companies.json').then(response => response.json()).then(data => {
        companies =data;
    }).catch(error => {
        console.error('Error fetching companies:', error);
    });
    return companies;
}
function displayCompanies(companies) {
    var companiesDiv = document.getElementById('company-list');
    companiesDiv.innerHTML = '';
    companies.forEach(company => {
        var companyDiv = document.createElement('div');
        companyDiv.className = 'company-card';
        companyDiv.innerHTML = `
            <div class="card-image">
            <img src="${company.imagePath}" alt="${company.name}">
            </div>
            <div class= "card-content">
                <h3>${company.name}</h3>
                <p class="Founded">Founded in :${company.createdAt}</p>
                <p class="Specialization">Specialization: ${company.specialization}</p>
                <a href="/#company-details?id=${company.id}"><button>View Detailsy</button></a>
            </div>
            `;
        companiesDiv.appendChild(companyDiv);
    });
}

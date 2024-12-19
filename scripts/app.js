// Select all sections and hide them initially
const sections = document.querySelectorAll("main > section");
sections.forEach((section) => (section.style.display = "none"));

// Function to navigate between routes
function navigate() {
  const hash = window.location.hash || "#home"; // Default route
  sections.forEach((section) => {
    if (`#${section.id}` === hash) {
      section.style.display = "block";
    } else {
      section.style.display = "none";
    }
  });
}

// Listen to hash changes
window.addEventListener("hashchange", navigate);

// Navigate to the initial route on page load
window.addEventListener("load", navigate);

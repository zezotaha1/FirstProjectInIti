// Select all sections and hide them initially
const sections = document.querySelectorAll("main > section");
sections.forEach((section) => (section.style.display = "none"));

// Function to parse query parameters
function getQueryParams(url) {
  const queryString = url.split("?")[1];
  const params = {};
  if (queryString) {
    queryString.split("&").forEach((param) => {
      const [key, value] = param.split("=");
      params[key] = decodeURIComponent(value);
    });
  }
  return params;
}

// Function to navigate between routes
function navigate() {
  const hash = window.location.hash.split("?")[0] || "#home"; // Default route

  sections.forEach((section) => {
    if (`#${section.id}` === hash) {
      section.style.display = "block";
      const event = new Event("sectionEnter");
      section.dispatchEvent(event);
    } else {
      section.style.display = "none";
      const event = new Event("sectionLeave");
      section.dispatchEvent(event);
    }
  });
}

// Listen to hash changes
window.addEventListener("hashchange", navigate);

// Navigate to the initial route on page load
window.addEventListener("load", navigate);

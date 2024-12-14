document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const showPasswordIcon = document.getElementById("showPassword");
    const form = document.querySelector("form");

    // Show/hide password functionality
    showPasswordIcon.addEventListener("click", function () {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            showPasswordIcon.textContent = "🙈"; // Change icon to hide password
        } else {
            passwordInput.type = "password";
            showPasswordIcon.textContent = "👁️"; // Change icon back to show password
        }
    });

    // Form submission and validation
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const emailValue = emailInput.value.trim();
        const passwordValue = passwordInput.value.trim();

        // Simple email regex validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(emailValue)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (passwordValue.length < 8) {
            alert("Password must be at least 8 characters long.");
            return;
        }

        // Success message
        alert("Login successful!");
        form.submit(); // Uncomment this to proceed with form submission
    });
});

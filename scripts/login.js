document.getElementById("loginForm").addEventListener("submit", function (event) {
    if(validateFullName() && validateEmail() && validatePasswordComplexity() && validateConfirmPassword() && validateBirthdate() && validateGender() && validateTerms())
        event.preventDefault();

});

// Real-time validation
const inputs = document.querySelectorAll("#loginForm input");
inputs.forEach(input => {
    input.addEventListener("input", () => validateField(input));
    input.addEventListener("blur", () => validateField(input));
});

function validateField(input) {
    const id = input.id;
    const value = input.value.trim();

    // Clear existing error
    clearError(input);

    // Validate each field
    if (id === "email") {
        validateEmail();
    } else if (id === "password") {
        validatePasswordComplexity();
    }
}

// email validation
function validateEmail() {
    const email = document.getElementById("email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if( emailRegex.test(email.value)){
        clearError(email);
        return true;
    }
    showError("email", "Please enter a valid email address.");
    return false;
}

// Password Validation: Complexity
function validatePasswordComplexity() {
    const password = document.getElementById("password");
    const complexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if( complexityRegex.test(password.value)){
        clearError(password);
        return true;
    }
    showError(
        "password",
        "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character."
    );
    return false;
}

// Helper Functions
function clearError(input) {
    var errorMessage ;
    errorMessage=input.parentElement.parentElement.querySelector(".error-message");
    if (errorMessage) {
        errorMessage.style.display = "none";
    }
}

function showError(inputId, message) {
    const inputElement = document.getElementById(inputId);
    let errorElement = inputElement.parentElement.parentElement.querySelector(".error-message");
    if (!errorElement) {
        errorElement = document.createElement("div");
        errorElement.className = "error-message";
        errorElement.style.color = "red";
        errorElement.style.fontSize = "10px";
        errorElement.style.fontWeight = "bold";
        errorElement.style.textAlign = "start";
        errorElement.style.marginBottom = "10px";
        inputElement.parentElement.parentElement.append(errorElement);
    }

    errorElement.textContent = message;
    errorElement.style.display = "block";
}

// Password Show/Hide Toggle
var showPasswordIcon = document.getElementById("showPassword");
var passwordInput = document.getElementById("password");
showPasswordIcon.addEventListener("click", () =>
    togglePasswordVisibility(showPasswordIcon, passwordInput)
);
function togglePasswordVisibility(passwordIcon, passwordField) {
    if (passwordField.type === "password") {
        passwordField.type = "text";
        passwordIcon.textContent = "🙈";
    } else {
        passwordField.type = "password";
        passwordIcon.textContent = "👁️";
    }
}


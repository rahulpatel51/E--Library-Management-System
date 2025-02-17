// JS/login.js

// Password visibility toggle
const togglePassword = document.getElementById("togglePassword");
const passwordField = document.getElementById("password");

togglePassword.addEventListener("click", () => {
    const type = passwordField.type === "password" ? "text" : "password";
    passwordField.type = type;
    togglePassword.textContent = type === "password" ? "👁️" : "🙈";
});

// Login form submission
document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        if (response.ok) {
            // Store the JWT token in localStorage or sessionStorage
            localStorage.setItem("token", result.token); // Store token in localStorage

            alert("Login successful!");
            // Redirect to a dashboard or homepage
            window.location.href = "../user/UserDashboard.html";
        } else {
            alert(result.message || "Invalid email or password!");
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("Something went wrong. Please try again later.");
    }
});

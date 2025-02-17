document.getElementById("signup-form").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent form submission

    const name = document.getElementById("name").value;
    const number = document.getElementById("number").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:5000/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, number, email, address, password }),
        });

        const result = await response.json();

        if (response.ok) {
            alert("Signup successful! Your Student ID is: " + result.studentId);
            window.location.href = "login.html"; // Redirect to login
        } else {
            alert(result.message || "Signup failed. Try again!");
        }
    } catch (error) {
        console.error("Error during signup:", error);
        alert("Something went wrong. Please try again later.");
    }
});

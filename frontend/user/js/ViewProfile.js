document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("You are not logged in.");
        window.location.href = "../login.html"; // Redirect if no token is found
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/user/profile", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`, // Send token in the Authorization header
            },
        });

        const result = await response.json();

        if (response.ok) {
            // Log the response data to check if name and email are coming through
            console.log(result);

            // Update the profile fields
            document.getElementById("userName").value = result.name;
            document.getElementById("userEmail").value = result.email;
            document.getElementById("userMobile").value = result.number;
            document.getElementById("userAddress").value = result.address;
            document.getElementById("studentId").innerText = result.studentId;

            // Update the navbar fields (Make sure the navbar elements exist)
            document.getElementById("navbarUserName").innerText = result.name;
            document.getElementById("navbarUserEmail").innerText = result.email;

        } else {
            alert(result.message || "Failed to load profile.");
        }
    } catch (error) {
        console.error("Error fetching profile:", error);
        alert("Something went wrong. Please try again later.");
    }
});

document.getElementById('logoutBtn').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent the default anchor link behavior
    
    // Remove the token from localStorage or sessionStorage
    localStorage.removeItem('authToken'); // If you're using localStorage
    sessionStorage.removeItem('authToken'); // If you're using sessionStorage
    
    // Clear all session data (like user info stored in session)
    sessionStorage.clear();  // Clears all session data in the current tab
    
    // Redirect to the login page
    window.location.href = '/login.html';  // Adjust the path as needed
    
    // Prevent the user from going back to the previous page
    window.history.pushState(null, '', window.location.href); // Add a new entry in the browser history
    window.onpopstate = function () {
        window.history.go(1); // If user tries to click back, stay on the login page
    };
});

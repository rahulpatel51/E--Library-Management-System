document.addEventListener("DOMContentLoaded", function () {
    // Fetch the stats dynamically from the backend
    fetchCounts();

    // Admin dropdown functionality (Bootstrap handles this now)
    const dropdownButtons = document.querySelectorAll(".dropdown > a");
    dropdownButtons.forEach(button => {
        button.addEventListener("click", function (e) {
            const dropdownContent = this.nextElementSibling;
            if (dropdownContent) {
                dropdownContent.classList.toggle("show");
            }
        });
    });

    // Close all dropdowns when clicking outside
    document.addEventListener("click", function (e) {
        dropdownButtons.forEach(button => {
            const dropdownContent = button.nextElementSibling;
            if (dropdownContent && !dropdownContent.contains(e.target) && !button.contains(e.target)) {
                dropdownContent.classList.remove("show");
            }
        });
    });

    // Check if the AdminToken is available in localStorage
    const token = localStorage.getItem("AdminToken");
    if (!token) {
        redirectToLogin(); // If no token, redirect to login
    } else {
        handleAuthToken(token); // Process the token and fetch user details
    }
});

// Fetch stats from the backend
function fetchCounts() {
    fetch('/api/admin/stats')  // Ensure the endpoint matches the backend
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();  // Parse response as JSON
    })
    .then(data => {
        console.log(data);  // Log the response to check the data

        // Ensure the data contains the required properties
        document.getElementById("authorCount").textContent = data.authorCount || 'N/A';
        document.getElementById("userCount").textContent = data.userCount || 'N/A';
        document.getElementById("bookCount").textContent = data.bookCount || 'N/A';
        document.getElementById("categoryCount").textContent = data.categoryCount || 'N/A';
        document.getElementById("issuedBookCount").textContent = data.issuedBookCount || 'N/A';
        document.getElementById("feedbackCount").textContent = data.feedbackCount || 'N/A'; // Feedback count
    })
    .catch(error => {
        console.error('Error fetching stats:', error);
        // Show error message in the UI if needed
        document.getElementById("authorCount").textContent = 'Error loading data';
        document.getElementById("userCount").textContent = 'Error loading data';
        document.getElementById("bookCount").textContent = 'Error loading data';
        document.getElementById("categoryCount").textContent = 'Error loading data';
        document.getElementById("issuedBookCount").textContent = 'Error loading data';
        document.getElementById("feedbackCount").textContent = 'Error loading data'; // Feedback count error
    });
}


// Function to handle JWT token (decoding and displaying admin info)
function handleAuthToken(token) {
    try {
        // Decode the JWT token (Base64 decode the payload part)
        const decoded = JSON.parse(atob(token.split(".")[1])); // Decode the payload part of the JWT token
        console.log(decoded); // Log the decoded token for debugging

        // Extract name and email from the decoded token (for admin)
        const adminName = decoded.name || "Admin Name Not Available"; // Use name for admin
        const adminEmail = decoded.email || "Email Not Available"; // Use email for admin

        // Update the name and email in the DOM
        document.getElementById("admin-name").textContent = adminName;
        document.getElementById("admin-email").textContent = adminEmail;

        // If the name or email is missing, you can fetch it from the server (optional)
        if (!adminName || !adminEmail) {
            fetchUserDetails(token);
        }
    } catch (error) {
        console.error("Invalid token:", error);
        redirectToLogin(); // Redirect to login if token is invalid
    }
}

// Function to fetch user details (optional)
function fetchUserDetails(token) {
    fetch('/api/admin/details', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.name && data.email) {
            document.getElementById("admin-name").textContent = data.name;
            document.getElementById("admin-email").textContent = data.email;
        }
    })
    .catch(error => {
        console.error("Error fetching user details:", error);
    });
}

// Function to redirect to login page
function redirectToLogin() {
    window.location.href = "Adminlogin.html"; // Redirect to login page if not authenticated
} 

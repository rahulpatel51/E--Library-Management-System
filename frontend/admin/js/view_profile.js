// Function to fetch admin profile details
function fetchAdminProfile(token) {
    fetch('/api/admin/profile', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    .then(response => response.json())
    .then(data => {
        // Check if the response contains the necessary data
        if (data.name && data.email && data.number && data.address) {
            // Populate HTML elements with the admin's profile data
            document.getElementById("adminName").value = data.name;
            document.getElementById("adminEmail").value = data.email;
            document.getElementById("admin-mobile").value = data.number;
            document.getElementById("admin-address").value = data.address;
        } else {
            console.error("Profile data is incomplete.");
        }
    })
    .catch(error => {
        console.error("Error fetching admin profile:", error);
        redirectToLogin(); // Redirect to login page in case of error or unauthorized access
    });
}

// Function to redirect to login page if token is not found or user is not authenticated
function redirectToLogin() {
    window.location.href = "Adminlogin.html"; // Redirect to login page if not authenticated
}

// Check if the token is available in localStorage
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('AdminToken');  // Get token from localStorage

    if (!token) {
        console.error("No token found, redirecting to login.");
        redirectToLogin();  // If no token is found, redirect to login page
    } else {
        // Fetch and display the admin profile if token is available
        fetchAdminProfile(token);
    }
});

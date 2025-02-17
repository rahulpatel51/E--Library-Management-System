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
        if (data.name && data.email && data.number && data.address) {
            // Populate form fields with fetched profile data
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

// Function to update admin profile
document.getElementById('editProfileForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('adminName').value;
    const email = document.getElementById('adminEmail').value;
    const mobile = document.getElementById('admin-mobile').value;
    const address = document.getElementById('admin-address').value;
    const token = localStorage.getItem('AdminToken');

    // Sending the updated data to the server
    fetch('/api/admin/profile', {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, mobile, address }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Profile updated successfully!");
            window.location.href = "view_profile.html"; // Redirect to view profile page
        } else {
            alert("Failed to update profile.");
        }
    })
    .catch(error => {
        console.error("Error updating admin profile:", error);
        alert("Error updating profile.");
    });
});

// Check if the token is available in localStorage
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('AdminToken');
    if (!token) {
        redirectToLogin(); // If no token is found, redirect to login
    } else {
        fetchAdminProfile(token); // Fetch admin profile if token is available
    }
});

// Redirect to login page if no token is found
function redirectToLogin() {
    window.location.href = "Adminlogin.html"; // Redirect to login page if not authenticated
}

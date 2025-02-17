document.addEventListener('DOMContentLoaded', () => {
    const categoriesTable = document.getElementById('categoriesTable');
    const categoriesBody = document.getElementById('categoriesBody');
    const loadingDiv = document.getElementById('loading');

    // Fetch and display categories
    async function fetchCategories() {
        try {
            const response = await fetch('/api/admin/categories'); // Adjust the API URL
            const data = await response.json();

            if (data.categories && data.categories.length > 0) {
                categoriesBody.innerHTML = ''; // Clear table
                data.categories.forEach(category => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${category.categoryId}</td>
                        <td>${category.name}</td>
                        <td>${category.description}</td>
                    `;
                    categoriesBody.appendChild(row);
                });

                loadingDiv.style.display = 'none';
                categoriesTable.style.display = 'table';
            } else {
                loadingDiv.textContent = 'No categories available.';
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            loadingDiv.textContent = 'Failed to load categories. Please try again.';
        }
    }

    // Call fetchCategories on page load
    fetchCategories();

    // Search categories functionality
    document.getElementById('search-bar').addEventListener('keyup', debounce(searchCategories, 300));

    function searchCategories() {
        const filter = document.getElementById('search-bar').value.toLowerCase();
        const rows = document.querySelectorAll('#categoriesBody tr');

        rows.forEach(row => {
            const cells = row.getElementsByTagName('td');
            const match = Array.from(cells).some(cell => cell.textContent.toLowerCase().includes(filter));
            row.style.display = match ? '' : 'none';
        });
    }

    // Debounce function to optimize search
    function debounce(func, delay) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => func.apply(this, args), delay);
        };
    }
});


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
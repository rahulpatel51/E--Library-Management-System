document.addEventListener('DOMContentLoaded', () => {
    const authorsTable = document.getElementById('authorsTable');
    const authorsBody = document.getElementById('authorsBody');
    const loadingDiv = document.getElementById('loading');
    const searchBar = document.getElementById('search-bar');  // Grab search bar element

    // Fetch authors from the backend
    fetchAuthors();

    function fetchAuthors() {
        loadingDiv.style.display = 'block';
        authorsTable.style.display = 'none';

        fetch('/api/authors')
            .then(response => response.json())
            .then(data => {
                if (data.authors) {
                    displayAuthors(data.authors);
                } else {
                    alert('No authors found.');
                }
            })
            .catch(error => {
                console.error('Error fetching authors:', error);
                loadingDiv.innerHTML = 'Error fetching authors!';
            });
    }

    function displayAuthors(authors) {
        loadingDiv.style.display = 'none';
        authorsTable.style.display = 'table';
        authorsBody.innerHTML = ''; // Clear previous authors

        authors.forEach(author => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${author._id}</td>
                <td>${author.authorName}</td>
                <td>${author.authorBio}</td>
                <td>${author.authorCountry}</td>
            `;
            authorsBody.appendChild(row);
        });
    }

    // Search authors by name
    searchBar.addEventListener('keyup', () => {
        const filter = searchBar.value.toLowerCase(); // Get search input
        const rows = authorsBody.querySelectorAll('tr'); // Get all rows in the table

        rows.forEach(row => {
            const cells = row.getElementsByTagName('td');
            let match = false;

            // Loop through each cell of the row to check if it contains the search term
            Array.from(cells).forEach(cell => {
                if (cell.textContent.toLowerCase().includes(filter)) {
                    match = true; // If there's a match, set match to true
                }
            });

            // Show or hide the row based on whether it matches the search term
            row.style.display = match ? '' : 'none';
        });
    });
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
document.addEventListener('DOMContentLoaded', () => {
    const loadingDiv = document.getElementById('loading');
    const booksTable = document.getElementById('booksTable');
    const booksBody = document.getElementById('booksBody');
    const searchBar = document.getElementById('search-bar'); // Search bar reference

    fetchBooks();

    function getAuthToken() {
        return localStorage.getItem('Authorization') || sessionStorage.getItem('Authorization');
    }

    function fetchBooks() {
        toggleLoading(true);

        fetch('/api/admin/books', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.books && data.books.length > 0) {
                    displayBooks(data.books);
                } else {
                    alert('No books found.');
                }
                toggleLoading(false);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
                alert('Failed to load books.');
                toggleLoading(false);
            });
    }

    function displayBooks(books) {
        booksBody.innerHTML = ''; // Clear the table body before adding new rows

        books.forEach(book => {
            const row = document.createElement('tr');

            // Create and append Book ID cell
            const idCell = document.createElement('td');
            idCell.textContent = book._id;
            row.appendChild(idCell);

            // Create and append Title cell
            const titleCell = document.createElement('td');
            titleCell.textContent = book.title;
            row.appendChild(titleCell);

            // Create and append Author cell
            const authorCell = document.createElement('td');
            authorCell.textContent = book.author ? book.author.name : 'Unknown';
            row.appendChild(authorCell);

            // Create and append Category cell
            const categoryCell = document.createElement('td');
            categoryCell.textContent = book.category ? book.category.name : 'Unknown';
            row.appendChild(categoryCell);

            // Create and append ISBN cell
            const isbnCell = document.createElement('td');
            isbnCell.textContent = book.isbn;
            row.appendChild(isbnCell);

            // Create and append Description cell
            const descriptionCell = document.createElement('td');
            descriptionCell.textContent = book.description;
            row.appendChild(descriptionCell);

            // Create and append Number of Copies cell
            const copiesCell = document.createElement('td');
            copiesCell.textContent = book.noOfCopies || 'N/A';
            row.appendChild(copiesCell);

            // No "Actions" cell needed anymore, so just append the row
            booksBody.appendChild(row);
        });

        searchBar.addEventListener('input', searchBooks); // Attach search functionality
    }

    function toggleLoading(show) {
        loadingDiv.style.display = show ? 'block' : 'none';
        booksTable.style.display = show ? 'none' : 'table';
    }

    function searchBooks() {
        const searchInput = searchBar.value.toLowerCase();
        const rows = booksBody.getElementsByTagName('tr');

        Array.from(rows).forEach(row => {
            const title = row.cells[1]?.textContent.toLowerCase() || '';
            const author = row.cells[2]?.textContent.toLowerCase() || '';
            const category = row.cells[3]?.textContent.toLowerCase() || '';

            if (title.includes(searchInput) || author.includes(searchInput) || category.includes(searchInput)) {
                row.style.display = ''; // Show row if it matches the search
            } else {
                row.style.display = 'none'; // Hide row if it doesn't match
            }
        });
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
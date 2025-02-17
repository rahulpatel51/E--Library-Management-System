// Run the script when the page is loaded
document.addEventListener('DOMContentLoaded', async () => {
    const userId = "123";  // Replace this with logic to get the logged-in student's ID (from session or local storage)

    // Function to fetch and display issued books for the student
    const loadIssuedBooks = async () => {
        try {
            const response = await fetch(`/api/user/issued-books/${userId}`);
            const result = await response.json();

            if (response.ok) {
                // Get the table body element
                const tableBody = document.getElementById('bookList');
                tableBody.innerHTML = '';  // Clear any previous data

                // Loop through the issued books and display them in the table
                result.books.forEach(book => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${book.bookTitle}</td>
                        <td>${book.issueDate}</td>
                        <td>${book.returnDate}</td>
                    `;
                    tableBody.appendChild(row);
                });
            } else {
                alert(result.message || 'Failed to load issued books.');
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while fetching the issued books.");
        }
    };

    loadIssuedBooks();
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

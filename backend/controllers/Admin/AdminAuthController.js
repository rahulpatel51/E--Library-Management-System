document.addEventListener('DOMContentLoaded', () => {
    const loadingDiv = document.getElementById('loading');
    const booksTable = document.getElementById('booksTable');
    const booksBody = document.getElementById('booksBody');
    const searchBar = document.getElementById('search-bar'); // Search bar reference

    // Simulate loading books on page load
    fetchBooks();

    // Function to get token from localStorage or sessionStorage
    function getAuthToken() {
        return localStorage.getItem('Authorization') || sessionStorage.getItem('Authorization');
    }

    // Fetch all books for the Manage Books page
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

    // Display books in the table
    function displayBooks(books) {
        booksBody.innerHTML = ''; // Clear the table body before adding new rows
        books.forEach(book => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${book._id}</td>
                <td>${book.title}</td>
                <td>${book.author ? book.author.name : 'Unknown'}</td>
                <td>${book.category ? book.category.name : 'Unknown'}</td>
                <td>${book.isbn}</td>
                <td>${book.description}</td>
                <td>${book.noOfCopies || 'N/A'}</td>
                <td>
                    <button class="btn btn-success" onclick="editBook('${book._id}')">Edit</button>
                    <button class="btn btn-danger" onclick="deleteBook('${book._id}')">Delete</button>
                </td>
            `;
            booksBody.appendChild(row);
        });

        // Attach the searchBooks functionality to the search input
        searchBar.addEventListener('input', searchBooks);
    }

    // Show/Hide Loading Indicator
    function toggleLoading(show) {
        loadingDiv.style.display = show ? 'block' : 'none';
        booksTable.style.display = show ? 'none' : 'table';
    }

    // Search books by title, author, or category
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

    // Handle delete book
    function deleteBook(bookId) {
        if (confirm('Are you sure you want to delete this book?')) {
            toggleLoading(true);
            fetch(`/api/admin/books/${bookId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${getAuthToken()}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('Book deleted successfully!');
                        fetchBooks(); // Refresh the book list
                    } else {
                        alert(`Failed to delete book: ${data.message || 'Unknown error'}`);
                    }
                    toggleLoading(false);
                })
                .catch(error => {
                    alert(`Error deleting book: ${error.message}`);
                    toggleLoading(false);
                });
        }
    }
});

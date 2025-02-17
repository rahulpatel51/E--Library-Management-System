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

            // Create and append Actions cell
            const actionsCell = document.createElement('td');

            // Edit button
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('btn', 'btn-success');
            editButton.addEventListener('click', () => editBook(book._id));
            actionsCell.appendChild(editButton);

            // Delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('btn', 'btn-danger', 'ml-2');
            deleteButton.addEventListener('click', () => deleteBook(book._id));
            actionsCell.appendChild(deleteButton);

            row.appendChild(actionsCell);
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

    function editBook(bookId) {
        alert(`Edit functionality for book ID: ${bookId} will be implemented.`);
        // Redirect to edit page or show a modal for editing
    }
});



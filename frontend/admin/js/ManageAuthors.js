document.addEventListener('DOMContentLoaded', () => {
    const authorsTable = document.getElementById('authorsTable');
    const authorsBody = document.getElementById('authorsBody');
    const loadingDiv = document.getElementById('loading');
    const searchBar = document.getElementById('search-bar');

    // Fetch authors from the server on page load
    fetchAuthors();

    // Fetch authors from the server
    function fetchAuthors() {
        loadingDiv.style.display = 'block';
        authorsTable.style.display = 'none';

        fetch('/api/authors') // Replace with your actual API endpoint
            .then(response => response.json())
            .then(data => {
                if (data.authors) {
                    displayAuthors(data.authors);
                }
            })
            .catch(error => {
                console.error('Error fetching authors:', error);
            });
    }

    // Display authors in the table
    function displayAuthors(authors) {
        loadingDiv.style.display = 'none';
        authorsTable.style.display = 'table';
        authorsBody.innerHTML = ''; // Clear previous authors
        authors.forEach(author => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${author._id}</td>
                <td>${author.authorName}</td>
                <td>${author.authorCountry}</td>
                <td>
                    <button class="btn btn-danger" data-id="${author._id}">Delete</button>
                </td>
            `;
            authorsBody.appendChild(row);
        });

        // Add event listeners to delete buttons dynamically
        const deleteButtons = document.querySelectorAll('.btn-danger');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const authorId = e.target.getAttribute('data-id');
                deleteAuthor(authorId);
            });
        });
    }

    // Delete author by ID
    function deleteAuthor(authorId) {
        console.log('Sending DELETE request for author with ID:', authorId);

        fetch(`/api/authors/${authorId}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            console.log('Response data:', data); // Log the data to check what response comes
            if (data.success) {
                alert('Author deleted successfully');
                fetchAuthors(); // Refresh the list
            } else {
                alert('Error deleting author');
            }
        })
        .catch(error => {
            console.error('Error deleting author:', error);
        });
    }

    // Search authors by name
    searchBar.addEventListener('keyup', () => {
        const filter = searchBar.value.toLowerCase();
        const rows = authorsBody.querySelectorAll('tr');

        rows.forEach(row => {
            const cells = row.getElementsByTagName('td');
            const match = Array.from(cells).some(cell => cell.textContent.toLowerCase().includes(filter));
            row.style.display = match ? '' : 'none';
        });
    });
});



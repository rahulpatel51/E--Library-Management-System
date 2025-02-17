document.addEventListener('DOMContentLoaded', async () => {
    // Fetch the issued books data from the backend
    const loadIssuedBooks = async () => {
        try {
            const response = await fetch('/api/admin/issuebook/view');
            const result = await response.json();

            if (response.ok) {
                // Hide the loading message
                document.getElementById('loading').style.display = 'none';
                // Display the table
                const table = document.getElementById('issuedBooksTable');
                table.style.display = 'table';

                // Populate the table with issued book data
                const tableBody = document.getElementById('issuedBooksBody');
                tableBody.innerHTML = ''; // Clear the table body first

                result.books.forEach(book => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${book.studentId}</td>
                        <td>${book.bookTitle}</td>
                        <td>${book.studentName}</td>
                        <td>${book.issueDate}</td>
                        <td>${book.returnDate}</td>
                    `;
                    tableBody.appendChild(row);
                });
            } else {
                // Handle failure
                alert(result.message || 'Failed to load issued books.');
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while fetching the issued books.");
        }
    };

    loadIssuedBooks();

    // Function to search issued books
    window.searchIssuedBooks = () => {
        const searchTerm = document.getElementById('search-bar').value.toLowerCase();
        const rows = document.querySelectorAll('#issuedBooksBody tr');
        rows.forEach(row => {
            const studentId = row.cells[0].textContent.toLowerCase();
            const bookTitle = row.cells[1].textContent.toLowerCase();
            const studentName = row.cells[2].textContent.toLowerCase();

            if (
                studentId.includes(searchTerm) ||
                bookTitle.includes(searchTerm) ||
                studentName.includes(searchTerm)
            ) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    };
});

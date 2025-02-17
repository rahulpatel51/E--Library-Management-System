
document.getElementById('studentId').addEventListener('input', function() {
    const studentId = this.value;

    if (studentId) {
        // Fetch student data by student ID (replace with actual API URL)
        fetch(`/api/student/${studentId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.getElementById('studentName').value = data.student.name;
                } else {
                    alert('Student not found.');
                    document.getElementById('studentName').value = '';
                }
            })
            .catch(error => {
                console.error('Error fetching student data:', error);
                document.getElementById('studentName').value = '';
            });
    } else {
        document.getElementById('studentName').value = '';
    }
});

// Fetch the list of available books for selection
fetch('/api/books')  // Replace with your actual API URL to get books
    .then(response => response.json())
    .then(data => {
        const bookTitleSelect = document.getElementById('bookTitle');
        if (data.success) {
            data.books.forEach(book => {
                const option = document.createElement('option');
                option.value = book.title;  // Assuming `title` is the book's name
                option.textContent = book.title;
                bookTitleSelect.appendChild(option);
            });
        } else {
            alert('No books available.');
        }
    })
    .catch(error => {
        console.error('Error fetching books:', error);
    });
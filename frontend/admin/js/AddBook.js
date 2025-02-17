document.addEventListener('DOMContentLoaded', () => {
    const loadingDiv = document.getElementById('loading');
    const addBookForm = document.getElementById('addBookForm');
    const bookCategorySelect = document.getElementById('bookCategory');
    const bookAuthorSelect = document.getElementById('bookAuthor');

    // Simulate loading categories and authors
    setTimeout(() => {
        fetchCategories();
        fetchAuthors();
    }, 1000); // Simulate loading delay

    // Function to get token from localStorage or sessionStorage (whichever is used)
    function getAuthToken() {
        return localStorage.getItem('Authorization') || sessionStorage.getItem('Authorization');
    }
    

    // Fetch Categories from the backend
    function fetchCategories() {
        fetch('/api/admin/categories', {  // Adjust this endpoint as necessary
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`  // Include token in the header
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.categories && data.categories.length > 0) {
                data.categories.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category._id;  // Assuming _id is the category ID
                    option.textContent = category.name;
                    bookCategorySelect.appendChild(option);
                });
            } else {
                alert('No categories available.');
            }
            hideLoading(); // Hide loading after categories are fetched
        })
        .catch(error => {
            console.error('Error fetching categories:', error);
            alert('Failed to load categories.');
            hideLoading(); // Hide loading if error occurs
        });
    }

    // Fetch Authors from the backend
    function fetchAuthors() {
        fetch('/api/authors', {  // Replace with your actual API endpoint to fetch authors
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`  // Include token in the header
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.authors && data.authors.length > 0) {
                data.authors.forEach(author => {
                    const option = document.createElement('option');
                    option.value = author._id;  // Assuming _id is the author ID
                    option.textContent = author.authorName;  // Assuming 'authorName' is the author's name field
                    bookAuthorSelect.appendChild(option);
                });
            } else {
                alert('No authors available.');
            }
            hideLoading(); // Hide loading after authors are fetched
        })
        .catch(error => {
            console.error('Error fetching authors:', error);
            alert('Failed to load authors.');
            hideLoading(); // Hide loading if error occurs
        });
    }

    // Hide loading indicator after data is loaded
    function hideLoading() {
        loadingDiv.style.display = 'none';  // Make sure this is correctly hiding the loading indicator
    }

    // Handle form submission
    addBookForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const bookTitle = document.getElementById('bookTitle').value;
        const bookAuthor = document.getElementById('bookAuthor').value;
        const bookCategory = document.getElementById('bookCategory').value;
        const bookDescription = document.getElementById('bookDescription').value;
        const bookISBN = document.getElementById('bookISBN').value;

        const bookData = {
            title: bookTitle,
            author: bookAuthor,
            category: bookCategory,
            description: bookDescription,
            isbn: bookISBN
        };

        // Show loading indicator while sending data
        loadingDiv.style.display = 'block';

        fetch('/api/admin/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            },
            body: JSON.stringify(bookData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);  // Log the response
            if (data.success) {
                alert('Book added successfully!');
                addBookForm.reset();
            } else {
                alert(`Failed to add book: ${data.message || 'Unknown error'}`);
            }
            hideLoading(); // Hide loading after data is submitted
        })
        .catch(error => {
            alert(`Error adding book: ${error.message}`);
            hideLoading(); // Hide loading if error occurs
        });
    });
});

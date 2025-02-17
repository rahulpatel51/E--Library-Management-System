document.addEventListener('DOMContentLoaded', () => {
    const loadingDiv = document.getElementById('loading');
    const categoriesTable = document.getElementById('categoriesTable');
    const categoriesBody = document.getElementById('categoriesBody');
    const searchBar = document.getElementById('search-bar'); // Search bar reference

    fetchCategories();

    function getAuthToken() {
        return localStorage.getItem('Authorization') || sessionStorage.getItem('Authorization');
    }

    function fetchCategories() {
        toggleLoading(true);

        fetch('/api/admin/categories', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.categories && data.categories.length > 0) {
                    displayCategories(data.categories);
                } else {
                    alert('No categories found.');
                }
                toggleLoading(false);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
                alert('Failed to load categories.');
                toggleLoading(false);
            });
    }

    function displayCategories(categories) {
        categoriesBody.innerHTML = ''; // Clear the table body before adding new rows

        categories.forEach(category => {
            const row = document.createElement('tr');

            // Create and append Category ID cell
            const idCell = document.createElement('td');
            idCell.textContent = category.categoryId;
            row.appendChild(idCell);

            // Create and append Category Name cell
            const nameCell = document.createElement('td');
            nameCell.textContent = category.name;
            row.appendChild(nameCell);

            // Create and append Category Description cell
            const descriptionCell = document.createElement('td');
            descriptionCell.textContent = category.description;
            row.appendChild(descriptionCell);

            // Create and append Actions cell
            const actionsCell = document.createElement('td');

            // Edit button
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('btn', 'btn-info');
            editButton.addEventListener('click', () => editCategory(category._id));
            actionsCell.appendChild(editButton);

            // Delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('btn', 'btn-danger', 'ml-2');
            deleteButton.addEventListener('click', () => deleteCategory(category._id));
            actionsCell.appendChild(deleteButton);

            row.appendChild(actionsCell);
            categoriesBody.appendChild(row);
        });

        searchBar.addEventListener('input', searchCategories); // Attach search functionality
    }

    function toggleLoading(show) {
        loadingDiv.style.display = show ? 'block' : 'none';
        categoriesTable.style.display = show ? 'none' : 'table';
    }

    function searchCategories() {
        const searchInput = searchBar.value.toLowerCase();
        const rows = categoriesBody.getElementsByTagName('tr');

        Array.from(rows).forEach(row => {
            const name = row.cells[1]?.textContent.toLowerCase() || '';
            const description = row.cells[2]?.textContent.toLowerCase() || '';

            if (name.includes(searchInput) || description.includes(searchInput)) {
                row.style.display = ''; // Show row if it matches the search
            } else {
                row.style.display = 'none'; // Hide row if it doesn't match
            }
        });
    }

    function deleteCategory(categoryId) {
        if (confirm('Are you sure you want to delete this category?')) {
            toggleLoading(true);
            
            fetch(`/api/admin/category/${categoryId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${getAuthToken()}`
                }
            })
            .then(response => {
                console.log('Response Status:', response.status); // Log response status
                return response.json();
            })
            .then(data => {
                console.log('Response Data:', data); // Log response data
    
                if (data.success) {
                    alert('Category deleted successfully!');
                    fetchCategories(); // Refresh the categories list
                } else {
                    alert(`Failed to delete category: ${data.message || 'Unknown error'}`);
                }
                toggleLoading(false);
            })
            .catch(error => {
                console.error('Error deleting category:', error); // Log the error
                alert(`Error deleting category: ${error.message}`);
                toggleLoading(false);
            });
        }
    }
    
});



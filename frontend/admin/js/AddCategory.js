document.getElementById('addCategoryForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const categoryName = document.getElementById('categoryName').value.trim();
    const categoryDescription = document.getElementById('categoryDescription').value.trim();

    if (!categoryName || !categoryDescription) {
        alert('Please fill in all fields.');
        return;
    }

    try {
        const response = await fetch('/api/admin/category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: categoryName, description: categoryDescription }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Category added successfully!');
            document.getElementById('addCategoryForm').reset();
        } else {
            alert(data.message || 'Failed to add category.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
});



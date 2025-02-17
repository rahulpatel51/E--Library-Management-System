document.addEventListener('DOMContentLoaded', () => {
    const loadingDiv = document.getElementById('loading');
    const addAuthorForm = document.getElementById('addAuthorForm');

    // Simulate API call delay for loading
    setTimeout(() => {
        loadingDiv.style.display = 'none';
    }, 1000); // Hide loading after 1 second

    // Handle form submission
    addAuthorForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent form submission from refreshing the page

        // Get form data
        const authorName = document.getElementById('authorName').value;
        const authorBio = document.getElementById('authorBio').value;
        const authorCountry = document.getElementById('authorCountry').value;

        if (authorName && authorBio && authorCountry) {
            try {
                const response = await fetch('/api/authors/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        authorName,
                        authorBio,
                        authorCountry,
                    }),
                });

                const data = await response.json();
                if (response.ok) {
                    alert(`New author added successfully!\nName: ${data.author.authorName}\nCountry: ${data.author.authorCountry}`);
                    addAuthorForm.reset(); // Reset the form after successful submission
                } else {
                    alert(`Error: ${data.message}`);
                }
            } catch (error) {
                alert('Failed to add author. Please try again.');
                console.error(error);
            }
        } else {
            alert('Please fill all the fields!');
        }
    });
});


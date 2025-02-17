document.getElementById('Alogin-form').addEventListener('submit', async (e) => {
    e.preventDefault();  // Prevents the form from submitting in the default way

    // Get form data
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Basic form validation
    if (!email || !password) {
        alert('Please fill in both fields');
        return;
    }

    // Basic email format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    try {
        // Send a POST request to the login endpoint
        const response = await fetch('http://localhost:5000/api/auth/Adminlogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            }),
        });

        // Check if the response status is not 2xx (Success)
        if (!response.ok) {
            const errorDetails = await response.json(); // Fetching the error response as JSON
            console.error('Server responded with an error:', errorDetails);
            alert(`Failed to login: ${errorDetails.message}`);
            return;
        }

        // Parse the response from the server
        const data = await response.json();

        // If login is successful
        if (data.message === 'Login successful') {
            // Save AdminToken to localStorage
            localStorage.setItem('AdminToken', data.token);
            
            // Optionally, store admin details (if required)
            localStorage.setItem('AdminName', data.admin.name);
            localStorage.setItem('AdminEmail', data.admin.email);

            // Redirect the user to the Admin Dashboard page
            window.location.href = '../admin/AdminDashboard.html';
        } else {
            alert(data.message || 'An error occurred. Please try again.');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An unexpected error occurred. Please try again later.');
    }
});

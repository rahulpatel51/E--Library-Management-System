document.getElementById('Asignup-form').addEventListener('submit', async (e) => {
    e.preventDefault();  // Prevents the form from submitting in the default way

    // Get form data
    const name = document.getElementById('name').value;
    const number = document.getElementById('number').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const password = document.getElementById('password').value;

    // Basic form validation
    if (!name || !number || !email || !address || !password) {
        alert('Please fill in all fields');
        return;
    }

    // Basic email format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    try {
        // Send a POST request to the signup endpoint
        const response = await fetch('http://localhost:5000/api/auth/Adminsignup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                number,
                email,
                address,
                password
            }),
        });

        // Check if the response status is not 2xx (Success)
        if (!response.ok) {
            const errorDetails = await response.json(); // Fetching the error response as JSON
            console.error('Server responded with an error:', errorDetails);
            const errorMessage = `Failed to sign up. Server responded with: ${response.status}, Message: ${errorDetails.message}`;
            alert(errorMessage);  // Show alert for the server error
            return;
        }

        // Parse the response from the server
        const data = await response.json();

        // If the signup is successful
        if (data.message === 'Admin registered successfully') {  
            // Reset the form fields after successful signup
            document.getElementById('Asignup-form').reset(); 

            // Check if the token is included in the response (assuming it's in `data.token`)
            if (data.token) {
                // Store the AdminToken in localStorage or sessionStorage
                localStorage.setItem('AdminToken', data.token);

                // Optionally, you can also store other admin details if needed
                localStorage.setItem('AdminName', data.admin.name);
                localStorage.setItem('AdminEmail', data.admin.email);

                // Redirect the user to the login page after successful signup
                window.location.href = 'Adminlogin.html';  // Adjust this URL if needed
            } else {
                alert('Signup successful, but token is missing!');
            }
        } else {
            alert(data.message || 'An error occurred. Please try again.');
        }
    } catch (error) {
        console.error('Error during signup:', error);
        alert('An unexpected error occurred. Please try again later.');
    }
});

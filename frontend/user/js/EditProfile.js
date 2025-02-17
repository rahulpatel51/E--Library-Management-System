function updateProfile() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const address = document.getElementById('address').value;

    // Mock saving to a server
    alert(`Profile Updated:\nName: ${name}\nEmail: ${email}\nMobile: ${mobile}\nAddress: ${address}`);
}



document.getElementById('logoutBtn').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent the default anchor link behavior
    
    // Remove the token from localStorage or sessionStorage
    localStorage.removeItem('authToken'); // If you're using localStorage
    sessionStorage.removeItem('authToken'); // If you're using sessionStorage
    
    // Clear all session data (like user info stored in session)
    sessionStorage.clear();  // Clears all session data in the current tab
    
    // Redirect to the login page
    window.location.href = '/login.html';  // Adjust the path as needed
    
    // Prevent the user from going back to the previous page
    window.history.pushState(null, '', window.location.href); // Add a new entry in the browser history
    window.onpopstate = function () {
        window.history.go(1); // If user tries to click back, stay on the login page
    };
});

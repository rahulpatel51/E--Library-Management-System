document.addEventListener("DOMContentLoaded", function () {
    // Fetch the stats and user data dynamically from the backend
    fetchCounts();
    fetchUsersData(); // Call the function to fetch users data

    // Check if the AdminToken is available in localStorage
    const token = localStorage.getItem("AdminToken");
    if (!token) {
        redirectToLogin(); // If no token, redirect to login
    } else {
        handleAuthToken(token); // Process the token and fetch user details
    }
});

// Fetch and display users data
function fetchUsersData() {
    fetch('/api/admin/users', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('AdminToken')}`
        }
    })
        .then(response => response.json())
        .then(users => {
            console.log(users); // Log the users data to verify

            const usersTable = document.getElementById("usersTable");
            const usersBody = document.getElementById("usersBody");
            const loadingDiv = document.getElementById("loading");

            if (users && users.length > 0) {
                loadingDiv.style.display = 'none';
                usersTable.style.display = 'table';

                users.forEach(user => {
                    const row = document.createElement("tr");

                    row.innerHTML = `
                        <td>${user.studentId || 'N/A'}</td>
                        <td>${user.name || 'N/A'}</td>
                        <td>${user.email || 'N/A'}</td>
                        <td>${user.number || 'N/A'}</td>
                        <td>${user.membershipDate ? new Date(user.membershipDate).toLocaleDateString() : 'N/A'}</td>
                        <td>${user.address || 'N/A'}</td>
                    `;

                    usersBody.appendChild(row);
                });
            } else {
                loadingDiv.textContent = 'No users found.';
            }
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            document.getElementById("loading").textContent = 'Failed to load users. Please try again.';
        });
}

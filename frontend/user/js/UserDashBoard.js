document.addEventListener("DOMContentLoaded", () => {
    const dropbtn = document.querySelector(".dropbtn");
    const dropdown = document.querySelector(".dropdown");

    // Toggle dropdown on click
    dropbtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent clicks from closing immediately
        dropdown.classList.toggle("open");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target) && dropdown.classList.contains("open")) {
            dropdown.classList.remove("open");
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token'); // Get token from localStorage or cookies
    if (token) {
        // Fetch user data from the backend
        fetch('/api/user/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user profile');
            }
            return response.json();
        })
        .then(data => {
            // Populate the user data in the navbar
            document.getElementById('userName').textContent = data.name || 'Name not available';
            document.getElementById('userEmail').textContent = data.email || 'Email not available';
        })
        .catch(error => {
            console.error('Error fetching user profile:', error);
            alert('Something went wrong. Please try again later.');
        });
    } else {
        console.error('User is not authenticated');
        alert('User not authenticated. Please login again.');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const feedbackForm = document.getElementById('feedbackForm');
    const feedbackResponse = document.getElementById('feedbackResponse');

    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        const message = document.getElementById('feedbackMessage').value;

        if (!message) {
            feedbackResponse.textContent = 'Feedback message cannot be empty.';
            feedbackResponse.style.color = 'red';
            return;
        }

        fetch('/api/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ message }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    feedbackResponse.textContent = data.message;
                    feedbackResponse.style.color = 'green';
                    feedbackForm.reset();
                } else {
                    feedbackResponse.textContent = 'Something went wrong. Please try again later.';
                    feedbackResponse.style.color = 'red';
                }
            })
            .catch(error => {
                console.error('Error submitting feedback:', error);
                feedbackResponse.textContent = 'Something went wrong. Please try again later.';
                feedbackResponse.style.color = 'red';
            });
    });
});

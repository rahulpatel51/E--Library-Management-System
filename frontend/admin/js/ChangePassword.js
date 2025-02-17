document.getElementById('passwordForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const oldPassword = document.getElementById('oldPassword').value;
    const newPassword = document.getElementById('newPassword').value;

    // Mock validation
    const mockCurrentPassword = "admin123"; // Replace with actual password validation logic

    if (oldPassword === mockCurrentPassword) {
        alert("Password updated successfully.");
        window.location.href = "admin_dashboard.html";
    } else {
        alert("Incorrect current password. Please try again.");
    }
});



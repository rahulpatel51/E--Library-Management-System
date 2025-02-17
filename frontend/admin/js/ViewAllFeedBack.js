document.addEventListener("DOMContentLoaded", () => {
    const feedbackBody = document.getElementById("feedbackBody");

    // Fetch feedback data
    fetch("/api/admin/feedback", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                const feedbacks = data.feedback;
                feedbackBody.innerHTML = ""; // Clear the table body

                feedbacks.forEach((feedback) => {
                    const row = document.createElement("tr");

                    const timestamp = new Date(feedback.timestamp);
                    const options = {
                        year: 'numeric', month: '2-digit', day: '2-digit',
                        hour: '2-digit', minute: '2-digit', second: '2-digit',
                        hour12: false,
                        timeZone: 'Asia/Kolkata'  // Adjust to your timezone
                    };
                    const formattedDate = timestamp.toLocaleString('en-IN', options);

                    row.innerHTML = `
                        <td>${feedback.studentId}</td>
                        <td>${feedback.name}</td>
                        <td>${feedback.message}</td>
                        <td>${formattedDate.split(',')[0]}</td>
                        <td>${formattedDate.split(',')[1]}</td>
                    `;

                    feedbackBody.appendChild(row);
                });
            } else {
                feedbackBody.innerHTML = `<tr><td colspan="5">No feedback available.</td></tr>`;
            }
        })
        .catch((error) => {
            console.error("Error fetching feedback:", error);
            feedbackBody.innerHTML = `<tr><td colspan="5">Failed to load feedback. Please try again later.</td></tr>`;
        });
});

// Fetch tasks from the server
function fetchTasks() {
  fetch("/tasks")
    .then((response) => response.json())
    .then((tasks) => {
      // Display tasks on the page
    });
}

// Handle form submission
document
  .getElementById("addTaskForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let title = document.getElementById("taskTitle").value;
    let description = document.getElementById("taskDescription").value;

    fetch("/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        status: "To Do",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the page
        fetchTasks();
      });
  });

// Edit task
function editTask(id, title, description, status) {
  fetch(`/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      description: description,
      status: status,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Update the page
      fetchTasks();
    });
}

// Delete task
function deleteTask(id) {
  fetch(`/tasks/${id}`, {
    method: "DELETE",
  }).then((response) => {
    // Update the page
    fetchTasks();
  });
}

// Fetch tasks when the page loads
fetchTasks();

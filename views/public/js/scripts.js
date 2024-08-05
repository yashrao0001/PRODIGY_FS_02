document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("employee-list")) {
    loadEmployees();
  }

  if (document.getElementById("employee-form")) {
    document
      .getElementById("employee-form")
      .addEventListener("submit", handleFormSubmit);
    document
      .getElementById("delete-button")
      .addEventListener("click", handleDelete);
  }

  document.getElementById("add-employee")?.addEventListener("click", () => {
    window.location.href = "/employee/new";
  });
});

async function loadEmployees() {
  try {
    const response = await fetch("/api/employees");
    const employees = await response.json();
    const employeeList = document.getElementById("employee-list");
    employeeList.innerHTML = employees
      .map(
        (employee) => `
      <tr>
        <td>${employee.name}</td>
        <td>${employee.position}</td>
        <td>${employee.department}</td>
        <td>${employee.salary}</td>
        <td>
          <a href="/employee/${employee._id}">Edit</a>
        </td>
      </tr>
    `
      )
      .join("");
  } catch (err) {
    console.error("Error loading employees:", err);
  }
}

async function handleFormSubmit(e) {
  e.preventDefault();
  const id = document.getElementById("employee-id").value;
  const name = document.getElementById("name").value;
  const position = document.getElementById("position").value;
  const department = document.getElementById("department").value;
  const salary = document.getElementById("salary").value;

  const method = id ? "PUT" : "POST";
  const url = id ? `/api/employees/${id}` : "/api/employees";
  const data = { name, position, department, salary };

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": "your_jwt_token", // replace with actual JWT token
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      window.location.href = "/employees";
    } else {
      console.error("Error saving employee:", await response.text());
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

async function handleDelete() {
  const id = document.getElementById("employee-id").value;

  try {
    const response = await fetch(`/api/employees/${id}`, {
      method: "DELETE",
      headers: {
        "x-auth-token": "your_jwt_token", // replace with actual JWT token
      },
    });
    if (response.ok) {
      window.location.href = "/employees";
    } else {
      console.error("Error deleting employee:", await response.text());
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

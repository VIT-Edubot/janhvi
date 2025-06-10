// Array to store employee data
let employees = [];
let nextEmployeeId = 1; // Simple counter for unique IDs
let editingEmployeeId = null; // Stores the ID of the employee being edited

// Get DOM elements
const employeeForm = document.getElementById('employee-form');
const formTitle = document.getElementById('form-title');
const employeeIdInput = document.getElementById('employee-id');
const nameInput = document.getElementById('name');
const positionInput = document.getElementById('position');
const departmentInput = document.getElementById('department');
const submitButton = document.getElementById('submit-btn');
const employeeCardsContainer = document.getElementById('employee-cards-container');
const noEmployeesMessage = document.getElementById('no-employees-message');

/**
 * Renders all employee cards in the DOM.
 */
function renderEmployeeCards() {
    employeeCardsContainer.innerHTML = ''; // Clear existing cards

    if (employees.length === 0) {
        noEmployeesMessage.style.display = 'block'; // Show "No employees" message
    } else {
        noEmployeesMessage.style.display = 'none'; // Hide message
        employees.forEach(employee => {
            const employeeCard = document.createElement('div');
            employeeCard.classList.add('employee-card');
            employeeCard.dataset.id = employee.id; // Store ID for easy access

            employeeCard.innerHTML = `
                <h3>${employee.name}</h3>
                <p><strong>Position:</strong> ${employee.position}</p>
                <p><strong>Department:</strong> ${employee.department}</p>
                <div class="actions">
                    <button class="edit-btn" data-id="${employee.id}">Edit</button>
                    <button class="delete-btn" data-id="${employee.id}">Delete</button>
                </div>
            `;
            employeeCardsContainer.appendChild(employeeCard);
        });
    }

    // Attach event listeners to the new buttons
    attachCardButtonListeners();
}

/**
 * Attaches click listeners to all edit and delete buttons.
 * This is called after re-rendering to ensure new buttons are interactive.
 */
function attachCardButtonListeners() {
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.removeEventListener('click', handleEditEmployee); // Prevent duplicate listeners
        button.addEventListener('click', handleEditEmployee);
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.removeEventListener('click', handleDeleteEmployee); // Prevent duplicate listeners
        button.addEventListener('click', handleDeleteEmployee);
    });
}

/**
 * Handles form submission for adding or updating an employee.
 * @param {Event} event - The submit event.
 */
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent default form submission and page reload

    const name = nameInput.value.trim();
    const position = positionInput.value.trim();
    const department = departmentInput.value.trim();

    if (!name || !position || !department) {
        alert('All fields are required!');
        return;
    }

    if (editingEmployeeId !== null) {
        // --- Edit Employee Logic ---
        const employeeIndex = employees.findIndex(emp => emp.id === editingEmployeeId);
        if (employeeIndex !== -1) {
            employees[employeeIndex].name = name;
            employees[employeeIndex].position = position;
            employees[employeeIndex].department = department;
        }
        editingEmployeeId = null; // Reset editing state
    } else {
        // --- Add New Employee Logic ---
        const newEmployee = {
            id: nextEmployeeId++,
            name,
            position,
            department
        };
        employees.push(newEmployee);
    }

    employeeForm.reset(); // Clear form fields
    resetFormForAdd(); // Reset form button and title
    renderEmployeeCards(); // Re-render the updated list
}

/**
 * Handles the click event for the 'Edit' button on an employee card.
 * Populates the form with the selected employee's data.
 * @param {Event} event - The click event.
 */
function handleEditEmployee(event) {
    const employeeId = parseInt(event.target.dataset.id);
    const employeeToEdit = employees.find(employee => employee.id === employeeId);

    if (employeeToEdit) {
        // Populate form fields
        nameInput.value = employeeToEdit.name;
        positionInput.value = employeeToEdit.position;
        departmentInput.value = employeeToEdit.department;
        employeeIdInput.value = employeeToEdit.id; // Store ID in hidden field
        editingEmployeeId = employeeToEdit.id; // Set editing state

        // Change form title and button text
        formTitle.textContent = 'Edit Employee';
        submitButton.textContent = 'Update Employee';
    }
}

/**
 * Handles the click event for the 'Delete' button on an employee card.
 * Removes the employee from the array and updates the DOM.
 * @param {Event} event - The click event.
 */
function handleDeleteEmployee(event) {
    const employeeId = parseInt(event.target.dataset.id);
    const confirmed = confirm(`Are you sure you want to delete this employee (ID: ${employeeId})?`);

    if (confirmed) {
        // Filter out the employee to be deleted
        employees = employees.filter(employee => employee.id !== employeeId);

        // If currently editing the deleted employee, reset the form
        if (editingEmployeeId === employeeId) {
            employeeForm.reset();
            resetFormForAdd();
        }

        renderEmployeeCards(); // Re-render the list
    }
}

/**
 * Resets the form back to 'Add New Employee' state.
 */
function resetFormForAdd() {
    formTitle.textContent = 'Add New Employee';
    submitButton.textContent = 'Add Employee';
    editingEmployeeId = null;
    employeeIdInput.value = ''; // Clear hidden ID
}

// --- Event Listeners ---
employeeForm.addEventListener('submit', handleFormSubmit);

// Initial render when the page loads
renderEmployeeCards();
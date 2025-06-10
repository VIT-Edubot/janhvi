// Define the array of employee objects
let employees = [
    { id: 1, name: 'Alice Johnson', position: 'Software Engineer', department: 'Engineering', isActive: true },
    { id: 2, name: 'Bob Williams', position: 'Product Manager', department: 'Product', isActive: false },
    { id: 3, name: 'Charlie Brown', position: 'UX Designer', department: 'Design', isActive: true },
    { id: 4, name: 'Diana Miller', position: 'QA Engineer', department: 'Engineering', isActive: true },
    { id: 5, name: 'Eve Davis', position: 'HR Specialist', department: 'Human Resources', isActive: false },
    { id: 6, name: 'Frank White', position: 'Sales Manager', department: 'Sales', isActive: true },
    { id: 7, name: 'Grace Taylor', position: 'Marketing Coordinator', department: 'Marketing', isActive: true }
];

const employeeListDiv = document.getElementById('employee-list');
const showAllBtn = document.getElementById('showAllBtn');
const showActiveBtn = document.getElementById('showActiveBtn');
const sortByNameBtn = document.getElementById('sortByNameBtn');

/**
 * Renders the employee list based on the provided array.
 * @param {Array<Object>} employeeArray - The array of employee objects to display.
 */
function renderEmployees(employeeArray) {
    employeeListDiv.innerHTML = ''; // Clear previous content

    if (employeeArray.length === 0) {
        employeeListDiv.innerHTML = '<p>No employees to display.</p>';
        return;
    }

    employeeArray.forEach(employee => {
        const employeeCard = document.createElement('div');
        employeeCard.classList.add('employee-card');
        employeeCard.dataset.employeeId = employee.id; // Store ID for toggling

        const statusClass = employee.isActive ? 'active' : 'inactive';
        const statusText = employee.isActive ? 'Active' : 'Inactive';

        employeeCard.innerHTML = `
            <h3>${employee.name}</h3>
            <p><strong>Position:</strong> ${employee.position}</p>
            <p><strong>Department:</strong> ${employee.department}</p>
            <p><strong>Status:</strong> <span class="status ${statusClass}">${statusText}</span></p>
            <button class="toggle-status-btn" data-employee-id="${employee.id}">Toggle Status</button>
        `;
        employeeListDiv.appendChild(employeeCard);
    });

    // Attach event listeners to new toggle buttons
    attachToggleStatusListeners();
}

/**
 * Attaches event listeners to all 'Toggle Status' buttons.
 */
function attachToggleStatusListeners() {
    document.querySelectorAll('.toggle-status-btn').forEach(button => {
        // Remove existing listener to prevent duplicates if re-rendering
        button.removeEventListener('click', toggleEmployeeStatus);
        button.addEventListener('click', toggleEmployeeStatus);
    });
}

/**
 * Toggles an employee's active status and updates the DOM.
 * @param {Event} event - The click event.
 */
function toggleEmployeeStatus(event) {
    const employeeId = parseInt(event.target.dataset.employeeId);
    const employeeIndex = employees.findIndex(emp => emp.id === employeeId);

    if (employeeIndex > -1) {
        // Toggle the isActive property
        employees[employeeIndex].isActive = !employees[employeeIndex].isActive;

        // Re-render the list to reflect the change
        // We re-render the currently displayed view (e.g., all, or filtered active)
        // This makes the UI consistent with the applied filter/sort
        let currentEmployeesToRender = [...employees]; // Start with all employees

        // Check if the "Show Only Active Employees" button is currently selected/active
        // This is a simple way; for complex UIs, use state management
        if (showActiveBtn.classList.contains('active-filter')) { // Assuming we add an 'active-filter' class
             currentEmployeesToRender = employees.filter(emp => emp.isActive);
        } else if (sortByNameBtn.classList.contains('active-sort')) { // Assuming 'active-sort' class
             currentEmployeesToRender.sort((a, b) => a.name.localeCompare(b.name));
        }

        renderEmployees(currentEmployeesToRender);

        // Optionally, update the specific card directly without re-rendering the whole list
        // const card = event.target.closest('.employee-card');
        // const statusSpan = card.querySelector('.status');
        // if (employees[employeeIndex].isActive) {
        //     statusSpan.textContent = 'Active';
        //     statusSpan.classList.remove('inactive');
        //     statusSpan.classList.add('active');
        // } else {
        //     statusSpan.textContent = 'Inactive';
        //     statusSpan.classList.remove('active');
        //     statusSpan.classList.add('inactive');
        // }
    }
}

// Initial display of all employees when the page loads
renderEmployees(employees);

// --- Higher-Order Functions and Button Event Listeners ---

// Filter Active Employees
showActiveBtn.addEventListener('click', () => {
    const activeEmployees = employees.filter(employee => employee.isActive);
    renderEmployees(activeEmployees);
    // Add/remove classes to indicate active filter/sort for better UX
    showActiveBtn.classList.add('active-filter');
    showAllBtn.classList.remove('active-filter');
    sortByNameBtn.classList.remove('active-sort');
});

// Show All Employees
showAllBtn.addEventListener('click', () => {
    renderEmployees(employees);
    showAllBtn.classList.add('active-filter');
    showActiveBtn.classList.remove('active-filter');
    sortByNameBtn.classList.remove('active-sort');
});

// Sort Employees by Name
sortByNameBtn.addEventListener('click', () => {
    // Create a copy to avoid modifying the original 'employees' array directly if not desired
    // Or, if sorting the original is okay, just use employees.sort()
    const sortedEmployees = [...employees].sort((a, b) => a.name.localeCompare(b.name));
    renderEmployees(sortedEmployees);
    sortByNameBtn.classList.add('active-sort');
    showAllBtn.classList.remove('active-filter');
    showActiveBtn.classList.remove('active-filter');
});

// Map Employee Names to a New Array and display in console
const employeeNames = employees.map(employee => employee.name);
console.log('All Employee Names (using map()):', employeeNames);

// Optional: Add some basic styling for active/selected buttons
const style = document.createElement('style');
style.textContent = `
    button.active-filter, button.active-sort {
        background-color: #28a745; /* A success green */
        color: white;
        border-color: #28a745;
    }
    button.active-filter:hover, button.active-sort:hover {
        background-color: #218838;
    }
`;
document.head.appendChild(style);
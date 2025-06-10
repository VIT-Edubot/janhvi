# LaunchDarkly Employee Portal

This project implements a dynamic employee portal demonstrating fundamental JavaScript concepts: arrays, objects, DOM manipulation, higher-order functions (`filter`, `sort`, `map`), and event handling.

## Project Structure

* `index.html`: The main HTML file providing the structure for the employee display and control buttons.
* `employees.js`: The JavaScript file containing all the logic for managing employee data, rendering, filtering, sorting, and handling user interactions.

## How to Run

1.  Save `index.html` and `employees.js` in the same directory.
2.  Open `index.html` in your web browser. (You can simply double-click the file, or use an extension like Live Server in VS Code for a better development experience).
3.  Open your browser's developer console (usually F12) to see the output from the `map()` function.

## Assignment Tasks & Implementation Details

### 1. Create and Display Employee Data (Arrays and Objects)

* **Data Structure**: Employee data is stored in a JavaScript array named `employees`. Each element in this array is an `object` representing an employee, with properties like `id`, `name`, `position`, `department`, and `isActive`.
    ```javascript
    let employees = [
        { id: 1, name: 'Alice Johnson', position: 'Software Engineer', department: 'Engineering', isActive: true },
        // ... more employee objects
    ];
    ```
* **Dynamic Display (DOM Manipulation)**:
    * The `renderEmployees(employeeArray)` function is responsible for dynamically generating the HTML.
    * It clears the existing content of the `<div id="employee-list">`.
    * It then iterates through the provided `employeeArray` using `forEach()`.
    * For each employee, a new `<div>` element with the class `employee-card` is created.
    * Employee details (name, position, department, and status) are injected into the `innerHTML` of this `div`.
    * The status text and styling (`active` or `inactive` class) are dynamically set based on the `isActive` property.
    * Each generated `employee-card` is appended to the `employee-list` container in the HTML.

### 2. Filter Active Employees (Higher-Order Function - `filter()`)

* The `filter()` higher-order function is used on the `employees` array to create a new array containing only active employees.
* The `showActiveBtn` has an event listener. When clicked, it calls:
    ```javascript
    const activeEmployees = employees.filter(employee => employee.isActive);
    renderEmployees(activeEmployees);
    ```
    This filters the `employees` array, keeping only those objects where `employee.isActive` is `true`, and then re-renders the display with this filtered subset.

### 3. Sort Employees by Name (Higher-Order Function - `sort()`)

* The `sort()` higher-order function is used to arrange the employees alphabetically by their `name`.
* The `sortByNameBtn` has an event listener. When clicked, it calls:
    ```javascript
    const sortedEmployees = [...employees].sort((a, b) => a.name.localeCompare(b.name));
    renderEmployees(sortedEmployees);
    ```
    * `[...employees]` creates a shallow copy of the `employees` array to avoid modifying the original array's order directly if it's not the desired behavior for subsequent operations (though in this case, it simply ensures the `employees` array maintains its original order if you were to re-render "all" employees without another sort).
    * The `sort()` method uses a compare function (`(a, b) => a.name.localeCompare(b.name)`) to sort strings alphabetically.
    * The `renderEmployees` function is then called with the newly sorted array.

### 4. Map Employee Names to a New Array (Higher-Order Function - `map()`)

* The `map()` higher-order function transforms the `employees` array into a new array containing only the names of the employees.
* This operation is performed once when the script loads:
    ```javascript
    const employeeNames = employees.map(employee => employee.name);
    console.log('All Employee Names (using map()):', employeeNames);
    ```
* The resulting `employeeNames` array is then logged to the browser's console.

### 5. Bonus: Update Employee Status (Basic DOM Manipulation with Events)

* **Toggle Button**: A "Toggle Status" button is dynamically added next to each employee's status within their respective employee card.
* **Event Listener**: The `attachToggleStatusListeners()` function is called after each `renderEmployees` operation to ensure all newly created toggle buttons have an event listener attached. This listener calls the `toggleEmployeeStatus` function when a button is clicked.
* **`toggleEmployeeStatus(event)` Function**:
    * It identifies the clicked employee's `id` using `event.target.dataset.employeeId`.
    * It uses `findIndex()` to locate the corresponding employee object in the `employees` array.
    * It then flips the `isActive` boolean property (`employees[employeeIndex].isActive = !employees[employeeIndex].isActive;`).
    * Finally, it re-renders the entire employee list (`renderEmployees(...)`) to reflect the updated status in the UI. This ensures that any active filters or sorts are reapplied correctly.

## Challenges Faced & Overcoming Them

1.  **Re-attaching Event Listeners**:
    * **Challenge**: When dynamically re-rendering the entire employee list (e.g., after filtering or sorting), any previously attached event listeners on the `Toggle Status` buttons would be lost because the old elements are removed from the DOM and new ones are created. This meant the toggle buttons wouldn't work after the first rendering or any filter/sort action.
    * **Overcoming**: The `attachToggleStatusListeners()` function was created. It's called *after* every `renderEmployees()` call. Inside this function, `querySelectorAll('.toggle-status-btn')` selects all existing toggle buttons, and an event listener is attached to each. `removeEventListener` is also used defensively to prevent duplicate listeners if `renderEmployees` is called multiple times without fully clearing the DOM.

2.  **Maintaining Current View State After Status Toggle**:
    * **Challenge**: When an employee's status is toggled, if the user was currently viewing only "Active Employees" or a "Sorted by Name" list, simply toggling the `isActive` property in the `employees` array and re-rendering with `employees` would revert the view to "all unsorted employees".
    * **Overcoming**: In `toggleEmployeeStatus`, after updating the `isActive` property, I added logic to check which filter/sort button is "active" (by adding a CSS class like `active-filter` or `active-sort` to the buttons). Based on this, the appropriate filter or sort is re-applied to the `employees` array before calling `renderEmployees`, ensuring the UI consistently reflects the user's current view preference.

3.  **Preventing Direct Modification of Original Array for Sort**:
    * **Challenge**: The `sort()` method modifies the array in place. If we wanted to preserve the original `employees` array's order for a "Show All" function, directly sorting it would be problematic.
    * **Overcoming**: For the `sortByNameBtn` click, I used the spread syntax (`[...employees]`) to create a shallow copy of the `employees` array before sorting it. This way, the original `employees` array remains in its initial order, while the `renderEmployees` function receives a sorted copy.

This project effectively demonstrates the power of JavaScript in creating interactive and dynamic web applications by leveraging fundamental data structures and functional programming paradigms.
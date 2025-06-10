# Feedback Form - JavaScript Interactivity

## Overview
This project enhances the feedback form by adding dynamic interactivity using JavaScript. It includes features like form validation, event handling, and dynamic messages.

## Features
1. **Conditionals for Validation:**
   - Checks if the name is empty.
   - Validates if the email contains an "@" symbol.
   - Ensures a rating is selected.

2. **Loops for Dynamic Feedback:**
   - Displays feedback scores from an array using a `forEach` loop.

3. **Event Handling:**
   - Attaches event listeners for form submission, reset button, and rating change.

4. **Dynamic Rating System:**
   - Displays a thank-you message when a user selects a rating.

## Challenges and Solutions
- **Challenge:** Dynamically validating multiple fields.
  - **Solution:** Created a reusable `validateFields` function.
- **Challenge:** Resetting dynamic messages.
  - **Solution:** Used the `resetForm` function to clear form fields and messages.

## How to Run
1. Open `feedback_form.html` in a web browser.
2. Fill out the form and interact with the rating system.
3. Submit the form to see validations and logs in the console.
4. Reset the form using the reset button.

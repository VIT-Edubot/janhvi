// feedback.js

// Declaring variables
var userName = "";  // Name of the user (String)
let userEmail = ""; // Email of the user (String)
const isSatisfied = false; // User satisfaction (Boolean)

// Function to validate form inputs
function validateForm(event) {
    event.preventDefault(); // Prevent form submission

    // Getting input values
    let nameInput = document.getElementById("name").value.trim();
    let emailInput = document.getElementById("email").value.trim();
    let feature1 = parseInt(document.getElementById("feature1").value) || 0;
    let feature2 = parseInt(document.getElementById("feature2").value) || 0;
    let feature3 = parseInt(document.getElementById("feature3").value) || 0;

    // Assign values to variables
    userName = nameInput;
    userEmail = emailInput;

    // Validation checks
    if (userName === "") {
        console.error("Error: Name field cannot be empty.");
        return;
    }
    
    if (!userEmail.includes("@")) {
        console.error("Error: Invalid email format.");
        return;
    }

    // Calculate and log the total score
    let totalScore = calculateScore(feature1, feature2, feature3);
    console.log(`User Name: ${userName}`);
    console.log(`User Email: ${userEmail}`);
    console.log(`Total Score: ${totalScore}`);
}

// Function to calculate total score and return the average
function calculateScore(f1, f2, f3) {
    let sum = f1 + f2 + f3;
    let avg = sum / 3;
    return avg;
}

// Attach validateForm function to the submit button
document.getElementById("feedbackForm").addEventListener("submit", validateForm);

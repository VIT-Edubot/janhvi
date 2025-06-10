// Function to handle rating change
function handleRatingChange(event) {
  const selectedRating = event.target.value;
  document.getElementById("ratingMessage").textContent = `Thank you for rating us: ${selectedRating}`;
}

// Function to validate fields
function validateFields() {
  const userName = document.getElementById("userName").value.trim();
  const userEmail = document.getElementById("userEmail").value.trim();
  const selectedRating = document.querySelector('input[name="rating"]:checked');

  if (userName === "") {
    alert("Name cannot be empty.");
    return false;
  }
  if (!userEmail.includes("@")) {
    alert("Invalid email format.");
    return false;
  }
  if (!selectedRating) {
    alert("Please select a rating.");
    return false;
  }
  return true;
}

// Function to handle form submission
function submitFeedback(event) {
  event.preventDefault(); // Prevent default form submission

  // Validate form fields
  if (!validateFields()) {
    return;
  }

  const feedbackScores = [5, 4, 3, 5, 2];
  console.log("Feedback scores:");
  feedbackScores.forEach((score) => console.log(score));

  alert("Feedback submitted successfully!");
}

// Function to reset the form
function resetForm() {
  document.getElementById("feedbackForm").reset();
  document.getElementById("ratingMessage").textContent = "";
}

// Attach event listeners
document.getElementById("feedbackForm").addEventListener("submit", submitFeedback);
document.getElementById("resetButton").addEventListener("click", resetForm);

document.querySelectorAll('input[name="rating"]').forEach((radio) => {
  radio.addEventListener("change", handleRatingChange);
});

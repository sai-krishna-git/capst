document.addEventListener("DOMContentLoaded", () => {
  const continueButton = document.getElementById("continueToBusiness");

  // Initially disable the button
  continueButton.disabled = true;

  // Add validation message dynamically for each field
  const validateFields = () => {
    let isValid = true;

    // List of fields to validate
    const fields = [
      {
        id: "firstName",
        errorId: "firstNameError",
        errorMessage: "First Name is required",
      },
      {
        id: "lastName",
        errorId: "lastNameError",
        errorMessage: "Last Name is required",
      },
      {
        id: "contactMobile",
        errorId: "contactMobileError",
        errorMessage: "Contact Mobile is required",
      },
      {
        id: "contactEmail",
        errorId: "contactEmailError",
        errorMessage: "Contact Email is required",
      },
      {
        id: "password",
        errorId: "passwordError",
        errorMessage: "Password is required",
      },
      {
        id: "confirmPassword",
        errorId: "confirmPasswordError",
        errorMessage: "Confirm Password is required",
      },
    ];

    // Loop through each field and validate
    fields.forEach((field) => {
      const input = document.getElementById(field.id);
      const errorDiv = document.getElementById(field.errorId);

      if (!input.value.trim()) {
        errorDiv.textContent = field.errorMessage;
        isValid = false;
      } else {
        errorDiv.textContent = ""; // Clear error if valid
      }
    });

    return isValid;
  };

  // Enable or disable the button based on validation
  document
    .getElementById("personalDetailsForm")
    .addEventListener("input", () => {
      continueButton.disabled = !validateFields();
    });

  // Handle button click
  continueButton.addEventListener("click", (e) => {
    if (!validateFields()) {
      e.preventDefault();
    } else {
      const personalDetails = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        contactMobile: document.getElementById("contactMobile").value,
        contactEmail: document.getElementById("contactEmail").value,
        password: document.getElementById("password").value,
      };
      localStorage.setItem("personalDetails", JSON.stringify(personalDetails));
      window.location.href = "business-details.html";
    }
  });
});

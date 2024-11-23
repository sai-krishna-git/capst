document.addEventListener("DOMContentLoaded", () => {
    const submitButton = document.getElementById("submitBusinessDetails");
  
    // Validate all required fields before enabling the submit button
    document.getElementById("businessDetailsForm").addEventListener("input", () => {
      const gstNumber = document.getElementById("gstNumber").value.trim();
      const panNumber = document.getElementById("panNumber").value.trim();
      const yearsOperation = document.getElementById("yearsOperation").value.trim();
      const pharmacyLicense = document.getElementById("pharmacyLicense").value.trim();
      const cdscoCertificate = document.getElementById("cdscoCertificate").value.trim();
      const sourcesMedicines = document.getElementById("sourcesMedicines").value.trim();
      const bankDetails = document.getElementById("bankDetails").value.trim();
      const incomeTax = document.getElementById("incomeTax").value.trim();
  
      submitButton.disabled = !(
        gstNumber && panNumber && yearsOperation && pharmacyLicense &&
        cdscoCertificate && sourcesMedicines && bankDetails && incomeTax
      );
    });
  
    // Handle form submission
    submitButton.addEventListener("click", () => {
      alert("Form submitted successfully!");
      window.location.href = "success.html";
    });
  });
  
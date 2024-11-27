document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.getElementById("submitBusinessDetails");

  // Validate all required fields before enabling the submit button
  document
    .getElementById("businessDetailsForm")
    .addEventListener("input", () => {
      const companyName = document.getElementById("companyName").value.trim();
      const businessAddress = document
        .getElementById("businessAddress")
        .value.trim();
      const pinCode = document.getElementById("pinCode").value.trim();
      const city = document.getElementById("city").value.trim();
      const gstNumber = document.getElementById("gstNumber").value.trim();
      const panNumber = document.getElementById("panNumber").value.trim();
      const yearsOperation = document
        .getElementById("yearsOperation")
        .value.trim();
      const pharmacyLicense = document
        .getElementById("pharmacyLicense")
        .value.trim();
      const cdscoCertificate = document
        .getElementById("cdscoCertificate")
        .value.trim();
      const sourcesMedicines = document
        .getElementById("sourcesMedicines")
        .value.trim();
      const bankDetails = document.getElementById("bankDetails").value.trim();
      const incomeTax = document.getElementById("incomeTax").value.trim();

      submitButton.disabled = !(
        companyName &&
        businessAddress &&
        pinCode &&
        city &&
        gstNumber &&
        panNumber &&
        yearsOperation &&
        pharmacyLicense &&
        cdscoCertificate &&
        sourcesMedicines &&
        bankDetails &&
        incomeTax
      );
    });
  submitButton.addEventListener("click", async () => {
    console.log("submitButton clicked");
    const businessDetails = {
      companyName: document.getElementById("companyName").value,
      businessAddress: document.getElementById("businessAddress").value,
      pinCode: document.getElementById("pinCode").value,
      city: document.getElementById("city").value,
      gstNumber: document.getElementById("gstNumber").value,
      panNumber: document.getElementById("panNumber").value,
      yearsOperation: document.getElementById("yearsOperation").value,
      pharmacyLicense: document.getElementById("pharmacyLicense").value,
      cdscoCertificate: document.getElementById("cdscoCertificate").value,
      sourcesMedicines: document.getElementById("sourcesMedicines").value,
      bankDetails: document.getElementById("bankDetails").value,
      incomeTax: document.getElementById("incomeTax").value,
    };
    const personalDetails = JSON.parse(localStorage.getItem("personalDetails"));
    const sellerData = { ...personalDetails, ...businessDetails };
    console.log(sellerData);

    try {
      const response = await fetch("http://localhost:3000/api/seller/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sellerData),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("seller", "true");
        //window.location.href = "portal.html";
      } else {
        const error = await response.json();
        alert("Error: " + error.error);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
    }
  });
});
// onboarder/poral.js

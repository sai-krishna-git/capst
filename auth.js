document.addEventListener("DOMContentLoaded", () => {
    const authForm = document.getElementById("authForm");
  
    if (!authForm) {
      console.error("Auth form not found in the DOM.");
      return;
    }
  
    authForm.addEventListener("submit", async (e) => {
      e.preventDefault(); // Prevent page reload
  
      const emailInput = document.getElementById("email");
      const passwordInput = document.getElementById("password");
  
      if (!emailInput || !passwordInput) {
        console.error("Email or Password input field not found.");
        alert("An internal error occurred. Please refresh the page.");
        return;
      }
  
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
  
      if (!email || !password) {
        alert("Email and Password are required.");
        return;
      }
  
      try {
        const endpoint = "http://127.0.0.1:5000/auth/signup"; // Adjust endpoint as needed
  
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          alert(data.message || "Authentication successful!");
          window.location.href = "results.html"; // Redirect on success
        } else {
          alert(data.message || "An error occurred. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to connect to the server. Please try again later.");
      }
    });
  });
  
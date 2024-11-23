const API_URL = "http://localhost:3000/api";

// Handle Sign Up
if (document.getElementById("signupForm")) {
  document
    .getElementById("signupForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phoneNumber: document.getElementById("phoneNumber").value,
        password: document.getElementById("password").value,
      };

      try {
        const response = await fetch(`${API_URL}/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          // Store token in localStorage
          localStorage.setItem("token", data.token);
          // Redirect to home page
          window.location.href = "/auth.html";
        } else {
          alert(data.error);
        }
      } catch (error) {
        console.log(error);
        alert("An error occurred. Please try again.");
      }
    });
}

// Handle Sign In
if (document.getElementById("signinForm")) {
  document
    .getElementById("signinForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      };

      try {
        const response = await fetch(`${API_URL}/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          // Store token in localStorage
          localStorage.setItem("token", data.token);
          // Redirect to home page
          window.location.href = "/";
        } else {
          alert(data.error);
        }
      } catch (error) {
        alert("An error occurred. Please try again.");
      }
    });
}
// Check Authentication Status
function checkAuthStatus() {
  const token = localStorage.getItem("token");
  const authDiv = document.querySelector(".d-flex");

  if (token) {
    // User is logged in
    authDiv.innerHTML = `
            <a href="profile.html" class="btn btn-outline-light">
                <i class="fas fa-user"></i> Profile
            </a>
        `;
  } else {
    // User is not logged in
    authDiv.innerHTML = `
            <a href="./onboarder/on.html" class="btn btn-outline-light me-2">Become a Seller</a>
            <a href="auth.html" class="btn btn-outline-light">
                <i class="fas fa-user"></i> Sign in / Sign up
            </a>
        `;
  }
}

// Logout Function
function logout() {
  localStorage.removeItem("token");
  window.location.href = "/auth.html";
}

// Load navbar
fetch("navbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar-placeholder").innerHTML = data;
  })
  .then(() => {
    checkAuthStatus();
  });

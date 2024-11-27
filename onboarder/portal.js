document.addEventListener("DOMContentLoaded", () => {
  fetch("../navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar-placeholder").innerHTML = data;
    })
    .then(() => {
      checkAuthStatus();
    });
  const profileLink = document.getElementById("profileLink");
  const medicinesLink = document.getElementById("medicinesLink");
  const profileSection = document.getElementById("profileSection");
  const medicinesSection = document.getElementById("medicinesSection");

  // Toggle between profile and medicines sections
  profileLink.addEventListener("click", () => {
    profileSection.classList.add("active");
    medicinesSection.classList.remove("active");
    profileLink.classList.add("active");
    medicinesLink.classList.remove("active");
  });

  medicinesLink.addEventListener("click", () => {
    profileSection.classList.remove("active");
    medicinesSection.classList.add("active");
    profileLink.classList.remove("active");
    medicinesLink.classList.add("active");
  });
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "../auth.html";
    return;
  }
  fetch("http://localhost:3000/api/seller/profile", {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => response.json())
    .then((seller) => {
      console.log("Seller details:", seller);
      document.getElementById(
        "sellerName"
      ).textContent = `${seller.firstName} ${seller.lastName}`;
      document.getElementById("sellerEmail").textContent = seller.contactEmail;
      document.getElementById("companyName").textContent = seller.companyName;
      // Display other details
    })
    .catch((error) => {
      console.error("Error fetching seller details:", error);
    });
});

function logout() {
  localStorage.removeItem("seller");
  localStorage.removeItem("token");
  window.location.href = "../auth.html";
}
function checkAuthStatus() {
  const token = localStorage.getItem("token");
  const authDiv = document.querySelector(".d-flex");

  if (token) {
    // User is logged in
    authDiv.innerHTML = `
            <a href="../profile.html" class="btn btn-outline-light">
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

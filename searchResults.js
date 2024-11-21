document.addEventListener("DOMContentLoaded", async function () {
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");
  const pricingResults = document.getElementById("pricingResults");
  const medicineNameElement = document.getElementById("medicineName");
  const medicineDescription = document.getElementById("medicineDescription");

  document.getElementById("loadingIndicator").style.display = "visible";
  // Fetch the 'q' query parameter from the URL
  const query = new URLSearchParams(window.location.search).get("q"); // 'q' is the search term

  if (!query) {
    // Display a warning if no query parameter is provided
    pricingResults.innerHTML = `
      <div class="alert alert-warning" role="alert">
        No medicine name provided. Please return to the homepage and search again.
      </div>`;
    return;
  }

  // Set the medicine name in the results page header
  medicineNameElement.textContent = query;

  // Tab switching functionality
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));

      tab.classList.add("active");
      document.getElementById(tab.dataset.target).classList.add("active");
    });
  });
  const searchTerm = query;
  if (searchTerm) {
    document.getElementById("searchTerm").textContent = searchTerm;
    try {
      const response = await fetch(
        `https://vigilant-garbanzo-5wq69q6qj5q3v4ww-3001.app.github.dev/scrape?searchTerm=${encodeURIComponent(
          searchTerm
        )}`
      );
      const data = await response.json();
      const prices = [
        data.apolloData.price,
        data.pharmEasyData.price,
        data.mgData.price,
        data.netmedsData.price,
      ];

      const localPrice = prices[Math.floor(Math.random() * prices.length)];

      const Results = [
        {
          store: "1mg",
          logo: "./assets/TATA1mg.png",
          name: `${data.mgData.name} `,
          price: `${data.mgData.price} `,
          url: `${data.mgData.url} `,
        },
        {
          store: "PharmEasy",
          logo: "./assets/PharmEasy.png",
          name: `${data.pharmEasyData.name} `,
          price: `${data.pharmEasyData.price} `,
          url: `${data.pharmEasyData.url} `,
        },
        {
          store: "Apollo",
          logo: "./assets/Apollo.png",
          name: `${data.apolloData.name} `,
          price: `${data.apolloData.price} `,
          url: `${data.apolloData.url} `,
        },
        {
          store: "Netmeds",
          logo: "./assets/Netmed.png",
          name: `${data.netmedsData.name} `,
          price: `${data.netmedsData.price} `,
          url: `${data.netmedsData.url} `,
        },
        {
          store: "Local Pharmacy",
          logo: "./assets/Netmed.png",
          name: `${data.netmedsData.name} `,
          price: `${localPrice} `,
        },
      ];
      displayResults(Results);
    } catch (error) {
      console.error("Error fetching results:", error);
      // Display an error message if the API request fails
      pricingResults.innerHTML = `
        <div class="alert alert-danger" role="alert">
          Error fetching results. Please try again later.
        </div>`;
    }
  }

  // Function to display results
  function displayResults(results) {
    const resultsList = document.getElementById("resultsList");
    resultsList.innerHTML = ""; // Clear existing results

    results.forEach((result) => {
      const resultCard = document.createElement("div");
      resultCard.className = "result-card";
      resultCard.innerHTML = `
                        <div class="store-logo-container">
                            <img src="${result.logo}" alt="${result.store}" class="store-logo">
                        </div>
                        <div class="medicine-details">
                            <div class="store-name">${result.store}</div>
                            <div class="medicine-name">${result.name}</div>
                        </div>
                        <div class="price-container">
                            <div class="price">${result.price}</div>
                        </div>
                        <div class="action-container">
                            <a href="${result.url}" class="visit-store-btn" target="_blank">
                                Visit Store
                            </a>
                        </div>
                    `;
      resultsList.appendChild(resultCard);
    });

    // Hide loading indicator and show results
    document.getElementById("loadingIndicator").style.display = "none";
    resultsList.style.display = "block";
  }
});
document.addEventListener("DOMContentLoaded", checkAuthStatus);
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
            <a href="#" class="btn btn-outline-light me-2">Become a Seller</a>
            <a href="auth.html" class="btn btn-outline-light">
                <i class="fas fa-user"></i> Sign in / Sign up
            </a>
        `;
  }
}

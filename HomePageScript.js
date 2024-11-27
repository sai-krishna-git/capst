document.getElementById("searchForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const query = document.getElementById("searchInput").value.trim();
  if (query) {
    document.getElementById("loader").style.display = "block";
    setTimeout(() => {
      window.location.href = `./searchResults.html?q=${encodeURIComponent(
        query
      )}`;
    }, 500); // Simulate loading delay
  }
});

const searchInput = document.getElementById("searchInput");
const suggestionsBox = document.getElementById("suggestions");

async function fetchSuggestions(query) {
  const apiKey = "AIzaSyCCfq1bJKLkWbBDfdBDRqFlBMwJzQHBkuw";
  const cx = "50c18fbca139043c2";
  const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(
    query
  )}&num=5`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.items) {
      return data.items.map((item) => item.title);
    }
    return [];
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return [];
  }
}

function displaySuggestions(suggestions) {
  suggestionsBox.innerHTML = "";
  suggestions.forEach((suggestion) => {
    const div = document.createElement("div");
    div.classList.add("suggestion-item");
    div.textContent = suggestion;
    div.addEventListener("click", () => {
      searchInput.value = suggestion;
      suggestionsBox.innerHTML = "";
    });
    suggestionsBox.appendChild(div);
  });
}

searchInput.addEventListener("input", async function () {
  const query = this.value.trim();
  if (query.length > 2) {
    const suggestions = await fetchSuggestions(query);
    displaySuggestions(suggestions);
  } else {
    suggestionsBox.innerHTML = "";
  }
});

// Accessibility fix: Close suggestions when clicking outside
document.addEventListener("click", function (event) {
  if (
    !event.target.closest("#searchInput") &&
    !event.target.closest("#suggestions")
  ) {
    suggestionsBox.innerHTML = "";
  }
});
document.addEventListener("DOMContentLoaded", checkAuthStatus);
function checkAuthStatus() {
  const token = localStorage.getItem("token");
  const authDiv = document.querySelector(".d-flex");

  if (token) {
    // User is logged in
    authDiv.innerHTML = `
            <a href="./profile.html" class="btn btn-outline-light">
                <i class="fas fa-user"></i> Profile
            </a>
        `;
  } else {
    // User is not logged in
    authDiv.innerHTML = `
            <a href="./onboarder/on.html" class="btn btn-outline-light me-2">Become a Seller</a>
            <a href="./auth.html" class="btn btn-outline-light">
                <i class="fas fa-user"></i> Sign in / Sign up
            </a>
        `;
  }
}

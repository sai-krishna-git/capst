document.addEventListener("DOMContentLoaded", () => {
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
  });
  
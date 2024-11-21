const axios = require("axios");
const cheerio = require("cheerio");
// URL of the product page on Truemeds
const url = "https://www.truemeds.in/search/dolo"; // Replace with the actual product URL

// Function to scrape the price using Puppeteer
async function getPrice() {
  // Launch a headless browser

  try {
    // Navigate to the product page
    const response = await axios.get(url);

    // Load the HTML into cheerio
    const $ = cheerio.load(response.data);

    // Inspect the webpage and identify the selector for the price element
    // Example: If the price is in a span with a class 'product-price', use that class
    const price = $.text().trim();
    // Extract the price

    // Display the extracted price
    if (price) {
      console.log(`The price of the product is: ${price}`);
    } else {
      console.log(
        "Price element not found or may have changed on the website."
      );
    }
  } catch (error) {
    console.error("Error scraping the product page:", error);
  }
}

// Run the function
getPrice();

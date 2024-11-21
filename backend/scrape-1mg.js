const puppeteer = require("puppeteer");

let browser; // Declare the browser instance
let page; // Declare the page instance

async function initializeBrowser() {
  if (!browser) {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage(); // Create a persistent page instance
  }
}

async function scrapeMedicine(searchTerm) {
  try {
    // Initialize the browser and page if not already done
    await initializeBrowser();

    // Navigate to the desired page
    await page.goto("https://www.1mg.com/search/all?name=" + searchTerm, {
      waitUntil: "domcontentloaded",
    });
    await page.waitForSelector(
      ".style__title___2UmnD" || ".style__container___jkjS2",
      {
        timeout: 20000,
      }
    );

    // Scrape the price data
    const medicineData = await page.evaluate(() => {
      const item =
        document.getElementsByClassName("style__container___cTDz0")[0] ||
        document.getElementsByClassName("style__container___jkjS2")[0];
      const link = item.querySelector("a");

      // Get the href attribute value
      const hrefValue = link ? link.getAttribute("href") : null;
      const name =
        item
          .querySelector(".style__product-description___zY35s")
          ?.textContent.trim() ||
        item.querySelector(".style__pro-title___3zxNC")?.textContent.trim() +
          " " +
          item.querySelector(".style__pack-size___254Cd")?.textContent.trim() ||
        "N/A";
      var price =
        item.querySelector(".style__price-tag___B2csA")?.textContent.trim() ||
        item.querySelector(".style__price-tag___KzOkY")?.textContent.trim() ||
        "N/A";
      // Remove "MRP" from price if it exists
      price = price.replace("MRP", "").trim();
      return { name, price, url: `https://www.1mg.com${hrefValue}` };
    });

    return medicineData;
  } catch (error) {
    console.error("Error occurred:", error);
    return null;
  }
}

async function closeBrowser() {
  if (browser) {
    await browser.close();
    browser = null; // Reset the browser instance
    page = null; // Reset the page instance
  }
}

module.exports = scrapeMedicine;

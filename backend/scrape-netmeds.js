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
    await page.goto(
      "https://www.netmeds.com/catalogsearch/result/" + searchTerm + "/all",
      {
        waitUntil: "domcontentloaded",
      }
    );

    await page.waitForSelector(".ais-InfiniteHits", {
      timeout: 20000,
    });

    // Scrape the price data
    const medicineData = await page.evaluate(() => {
      const item = document.getElementsByClassName("ais-InfiniteHits")[0];
      const link = item.querySelector("a");

      // Get the href attribute value
      const hrefValue = link ? link.getAttribute("href") : null;
      const name =
        item.querySelector(".clsgetname")?.textContent.trim() || "N/A";
      const price =
        item.querySelector(".final-price")?.textContent.trim() ||
        item.querySelector(".price-box")?.textContent.trim() ||
        "N/A";
      return { name, price, url: `https://www.netmeds.com${hrefValue}` };
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

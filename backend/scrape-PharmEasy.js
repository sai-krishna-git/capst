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
    await page.goto("https://pharmeasy.in/search/all?name=" + searchTerm, {
      waitUntil: "domcontentloaded",
    });

    await page.waitForSelector(".Search_medicineLists__hM5Hk", {
      timeout: 20000,
    });

    // Scrape the price data
    const medicineData = await page.evaluate(() => {
      const item = document.getElementsByClassName(
        "Search_medicineLists__hM5Hk"
      )[0];
      const link = item.querySelector("a");

      // Get the href attribute value
      const hrefValue = link ? link.getAttribute("href") : null;
      const name =
        item
          .querySelector(".ProductCard_medicineName__8Ydfq")
          ?.textContent.trim() || "N/A";
      const price =
        item
          .querySelector(".ProductCard_ourPrice__yDytt")
          ?.textContent.trim() ||
        item
          .querySelector(".ProductCard_gcdDiscountContainer__CCi51 span")
          ?.textContent.trim() ||
        "N/A";
      return { name, price, url: `https://pharmeasy.in${hrefValue}` };
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

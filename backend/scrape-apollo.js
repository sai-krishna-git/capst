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
      "https://www.apollopharmacy.in/search-medicines/" + searchTerm,
      {
        waitUntil: "domcontentloaded",
      }
    );

    await page.waitForSelector(".ProductCard_productCardGrid__NHfRH", {
      timeout: 20000,
    });

    // Scrape the price data
    const medicineData = await page.evaluate(() => {
      const item = document.getElementsByClassName(
        "ProductCard_productCardGrid__NHfRH"
      )[0];
      const link = item.querySelector("a");

      // Get the href attribute value
      const hrefValue = link ? link.getAttribute("href") : null;
      const name =
        (item.querySelector(".XV")?.textContent.trim() || "N/A") +
        (item.querySelector(".wd")?.textContent.trim() || "");
      const price = item.querySelector(".Vd")?.textContent.trim() || "N/A";
      console.log(price);
      return { name, price, url: `https://www.apollopharmacy.in${hrefValue}` };
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

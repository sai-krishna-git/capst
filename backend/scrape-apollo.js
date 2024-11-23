const puppeteer = require("puppeteer");

let browser;
let page;
let page2;

async function initializeBrowser() {
  if (!browser) {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    page2 = await browser.newPage();
  }
}

async function scrapeMedicine(searchTerm) {
  try {
    await initializeBrowser();

    await page.goto(
      `https://www.apollopharmacy.in/search-medicines/${searchTerm}`,
      { waitUntil: "domcontentloaded" }
    );

    await page.waitForSelector(".ProductCard_productCardGrid__NHfRH", {
      timeout: 20000,
    });

    const medicineData = await page.evaluate(() => {
      const item = document.getElementsByClassName(
        "ProductCard_productCardGrid__NHfRH"
      )[0];
      if (!item) return null;

      const link = item.querySelector("a");
      const hrefValue = link ? link.getAttribute("href") : null;
      const name =
        (item.querySelector(".XV")?.textContent.trim() || "N/A") +
        (item.querySelector(".wd")?.textContent.trim() || "");
      const price = item.querySelector(".Vd")?.textContent.trim() || "N/A";

      return {
        name,
        price,
        url: hrefValue ? `https://www.apollopharmacy.in${hrefValue}` : null,
      };
    });

    if (!medicineData || !medicineData.url) {
      throw new Error("Medicine data or description URL not found.");
    }

    await page2.goto(medicineData.url, { waitUntil: "domcontentloaded" });
    await page2.waitForSelector(".gn", { timeout: 20000 });

    const description = await page2.evaluate(() => {
      const element = document.getElementsByClassName("gn")[0]; // Get the first element with class "gn"
      const htmlContent = element.innerHTML; // Get the HTML inside the element

      return htmlContent;
    });

    return { medicineData, description };
  } catch (error) {
    console.error("Error occurred:", error);
    return null;
  }
}

async function closeBrowser() {
  if (browser) {
    await browser.close();
    browser = null;
    page = null;
    page2 = null;
  }
}

module.exports = scrapeMedicine;

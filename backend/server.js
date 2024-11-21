const express = require("express");
const cors = require("cors");
const scrapeApollo = require("./scrape-apollo");
const scrapePharmEasy = require("./scrape-PharmEasy");
const scrape1mg = require("./scrape-1mg");
const scrapeNetmeds = require("./scrape-netmeds");

const app = express();
const PORT = 3001;
app.use(cors());

app.get("/scrape", async (req, res) => {
  const { searchTerm } = req.query;
  if (!searchTerm) {
    return res.status(400).json({ error: "Search term is required" });
  }

  try {
    const [apolloData, pharmEasyData, mgData, netmedsData] = await Promise.all([
      scrapeApollo(searchTerm),
      scrapePharmEasy(searchTerm),
      scrape1mg(searchTerm),
      scrapeNetmeds(searchTerm),
    ]);
    console.log({ apolloData, pharmEasyData, mgData, netmedsData });
    res.json({ apolloData, pharmEasyData, mgData, netmedsData });
  } catch (error) {
    console.error("Error fetching results:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

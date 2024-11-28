const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./server/config/db");
const authRoutes = require("./server/routes/auth");
const sellerRoutes = require("./server/routes/seller");
const scrapeApollo = require("./backend/scrape-apollo");
const scrapePharmEasy = require("./backend/scrape-PharmEasy");
const scrape1mg = require("./backend/scrape-1mg");
const scrapeNetmeds = require("./backend/scrape-netmeds");

const bcrypt = require("bcryptjs");

// Initialize dotenv to load environment variables from .env file
dotenv.config();
console.log("JWT_SECRET:", process.env.JWT_SECRET);

const app = express();

// Connect to the database
connectDB(process.env.MONGODB_URI);

// Middleware to parse JSON data from requests
app.use(express.json());

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Routes
app.use("/api", authRoutes);
app.use("/api/seller", sellerRoutes);

// Scraping Routes
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

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

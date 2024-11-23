// server/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");

// Initialize dotenv to load environment variables from .env file
dotenv.config();
console.log("JWT_SECRET:", process.env.JWT_SECRET);

const app = express();

// Connect to the database
connectDB();

// Middleware to parse JSON data from requests
app.use(express.json());

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Routes
app.use("/api", authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

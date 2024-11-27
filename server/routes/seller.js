const express = require("express");
const router = express.Router();
const Seller = require("../models/Seller");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/sellerAuth");

// Seller Sign Up Route
router.post("/signup", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      contactMobile,
      contactEmail,
      password,
      companyName,
      businessAddress,
      pinCode,
      city,
      gstNumber,
      panNumber,
      yearsOperation,
      pharmacyLicense,
      cdscoCertificate,
      sourcesMedicines,
      bankDetails,
      incomeTax,
    } = req.body;

    // Check if seller already exists
    const existingSeller = await Seller.findOne({
      $or: [{ contactEmail }, { contactMobile }],
    });

    if (existingSeller) {
      return res.status(400).json({
        error: "Email or mobile number already registered",
      });
    }

    // Create new seller
    const seller = new Seller({
      firstName,
      lastName,
      contactMobile,
      contactEmail,
      password,
      companyName,
      businessAddress,
      pinCode,
      city,
      gstNumber,
      panNumber,
      yearsOperation,
      pharmacyLicense,
      cdscoCertificate,
      sourcesMedicines,
      bankDetails,
      incomeTax,
    });

    await seller.save();

    // Generate JWT token
    const token = jwt.sign({ _id: seller._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(201).json({ seller, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// Seller Profile Route
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const seller = await Seller.findById(req.user._id);
    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }
    res.json(seller);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { contactEmail, password } = req.body;

    // Find user by email
    const user = await Seller.findOne({ contactEmail });
    if (!user) {
      return res.status(401).json({ error: "Invalid User" });
    }

    // Validate password
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid login credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

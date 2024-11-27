// middleware/auth.js
const jwt = require("jsonwebtoken");
const Seller = require("../models/Seller");

module.exports = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const seller = await Seller.findById(decoded._id);
    if (!seller) {
      throw new Error();
    }
    req.user = seller;
    next();
  } catch (error) {
    res.status(401).json({ error: "Please authenticate" });
  }
};

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const sellerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  contactMobile: { type: String, required: true, unique: true },
  contactEmail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  companyName: { type: String, required: true },
  businessAddress: { type: String, required: true },
  pinCode: { type: String, required: true },
  city: { type: String, required: true },
  gstNumber: { type: String, required: true },
  panNumber: { type: String, required: true },
  yearsOperation: { type: Number, required: true },
  pharmacyLicense: { type: String, required: true },
  cdscoCertificate: { type: String, required: true },
  sourcesMedicines: { type: String, required: true },
  bankDetails: { type: String, required: true },
  incomeTax: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Hash password before saving
sellerSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

// Method to validate password
sellerSchema.methods.validatePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Seller", sellerSchema);

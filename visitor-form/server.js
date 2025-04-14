// server.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, {})
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });

// Schema
const visitorSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  mobile: String,
  country: String,
});

const Visitor = mongoose.model("Visitor", visitorSchema);

// Route to handle form submission
app.post("/submit", async (req, res) => {
  try {
    const newVisitor = new Visitor(req.body);
    await newVisitor.save();
    res.status(201).json({ message: "Data saved successfully!" });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Server error!" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

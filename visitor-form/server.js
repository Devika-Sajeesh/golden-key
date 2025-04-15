require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const twilio = require("twilio");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection failed:", err.message));

// Twilio WhatsApp Client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Mongoose Schema
const visitorSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  mobile: String,
  country: String,
});

const Visitor = mongoose.model("Visitor", visitorSchema);
const twilio = require("twilio");
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
// POST Route
app.post("/submit", async (req, res) => {
  try {
    const newVisitor = new Visitor(req.body);
    await newVisitor.save();

    // WhatsApp message
    const message = `
📬 *New Golden Key Submission*:

👤 Name: ${req.body.firstName} ${req.body.lastName}
📧 Email: ${req.body.email}
📱 Mobile: ${req.body.mobile}
🌍 Country: ${req.body.country}
    `;

    await twilioClient.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: process.env.OWNER_WHATSAPP_TO,
      body: message,
    });

    res.status(201).json({ message: "Data saved & WhatsApp message sent!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error!" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🔗 MongoDB Connection (ONLY ONCE)
// Replace with your MongoDB URL

// Connection events
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

mongoose.connection.on("error", (err) => {
  console.log("Connection error:", err);
});

// 🧱 Schema
const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  status: String,
  notes: String
});

// 📦 Model
const Lead = mongoose.model("Lead", leadSchema);

// 🏠 Test Route
app.get("/", (req, res) => {
  res.send("CRM Backend Running");
});

// ➕ Create Lead
app.post("/leads", async (req, res) => {
  try {
    const newLead = new Lead(req.body);
    await newLead.save();
    res.json(newLead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📥 Get All Leads
app.get("/leads", async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✏️ Update Lead
app.put("/leads/:id", async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedLead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ❌ Delete Lead
app.delete("/leads/:id", async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ message: "Lead deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🚀 Start Server
app.listen(process.env.PORT ||5000, () => {
  console.log("Server running on port 5000");
});
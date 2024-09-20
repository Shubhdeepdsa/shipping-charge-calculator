// app.js

const express = require("express");
const app = express();

// Import the shipping routes
const shippingRoutes = require("./routes/shippingRoutes");

// Use the shipping routes for the '/shipping-charge' endpoint
app.use("/shipping-charge", shippingRoutes);

// Simple route to test the server
app.get("/", (req, res) => {
  res.send("Shipping Charge Calculator API is running.");
});

// Export the app for testing
module.exports = app;

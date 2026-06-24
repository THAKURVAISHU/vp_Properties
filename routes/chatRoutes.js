const express = require("express");
const router = express.Router();

// ✅ FIXED IMPORT (IMPORTANT)
const properties = require("../data/properties");

router.post("/", (req, res) => {
  try {
    const message =
      req.body?.messages?.at(-1)?.text
        ?.toLowerCase()
        ?.trim() || "";

    // ----------------------------
    // CONTACT
    // ----------------------------
    if (
      message.includes("detail") ||
      message.includes("contact")
    ) {
      return res.json({
        text: `📞 Contact Dealer
Phone: +91 9876543210
Email: info@vpproperty.com`,
      });
    }

    // ----------------------------
    // START WITH ALL PROPERTIES
    // ----------------------------
    let results = [...properties];

    // ----------------------------
    // BHK FILTER
    // ----------------------------
    if (message.includes("1 bhk") || message.includes("1bhk")) {
      results = results.filter((p) => p.bhk === "1");
    }

    if (message.includes("2 bhk") || message.includes("2bhk")) {
      results = results.filter((p) => p.bhk === "2");
    }

    if (message.includes("3 bhk") || message.includes("3bhk")) {
      results = results.filter((p) => p.bhk === "3");
    }

    // ----------------------------
    // TYPE FILTER (RENT / SALE)
    // ----------------------------
    if (message.includes("rent")) {
      results = results.filter((p) => p.type === "rent");
    }

    if (message.includes("sale")) {
      results = results.filter((p) => p.type === "sale");
    }

    // ----------------------------
    // LOCATION FILTER
    // ----------------------------
    const locations = [
      "kandivali east",
      "kandivali west",
      "borivali",
      "malad",
    ];

    const selectedLocation = locations.find((loc) =>
      message.includes(loc)
    );

    if (selectedLocation) {
      results = results.filter(
        (p) =>
          p.location.toLowerCase() === selectedLocation
      );
    }

    // ----------------------------
    // GREETING
    // ----------------------------
    if (
      message.includes("hi") ||
      message.includes("hello")
    ) {
      return res.json({
        text: `👋 Welcome to VP Property

Try:
🏠 1 BHK Rent
🏠 2 BHK Sale
🏠 3 BHK Borivali

Type "details" for contact info`,
      });
    }

    // ----------------------------
    // RESULTS
    // ----------------------------
    if (results.length > 0) {
      const reply = results
        .map(
          (p) => `🏠 ${p.title}
📍 ${p.location}
🛏️ ${p.bhk} BHK
🏷️ ${p.type.toUpperCase()}
💰 ₹${p.price.toLocaleString()}`
        )
        .join("\n\n");

      return res.json({
        text: reply + `\n\nType "details" for contact`,
      });
    }

    // ----------------------------
    // NO RESULTS
    // ----------------------------
    return res.json({
      text: "❌ No properties found. Try different filters.",
    });

  } catch (error) {
    console.log("ChatRoute Error:", error);

    return res.status(500).json({
      text: "Server Error",
    });
  }
});

module.exports = router;

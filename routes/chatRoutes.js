const express = require("express");
const router = express.Router();

const {
  properties,
} = require("../../client/src/data/properties");

router.post("/", (req, res) => {
  const message =
    req.body?.messages?.at(-1)?.text
      ?.toLowerCase()
      ?.trim() || "";

  try {
    // Contact
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

    let results = [...properties];

    // BHK
    if (
      message.includes("1 bhk") ||
      message.includes("1bhk")
    ) {
      results = results.filter(
        (p) => p.bhk === "1"
      );
    }

    if (
      message.includes("2 bhk") ||
      message.includes("2bhk")
    ) {
      results = results.filter(
        (p) => p.bhk === "2"
      );
    }

    if (
      message.includes("3 bhk") ||
      message.includes("3bhk")
    ) {
      results = results.filter(
        (p) => p.bhk === "3"
      );
    }

    // Rent
    if (message.includes("rent")) {
      results = results.filter(
        (p) => p.type === "rent"
      );
    }

    // Sale
    if (message.includes("sale")) {
      results = results.filter(
        (p) => p.type === "sale"
      );
    }

    // Location
    const locations = [
      "kandivali east",
      "kandivali west",
      "borivali",
      "malad",
    ];

    const selected =
      locations.find((loc) =>
        message.includes(loc)
      );

    if (selected) {
      results = results.filter(
        (p) =>
          p.location.toLowerCase() ===
          selected
      );
    }

    // Welcome
    if (
      message.includes("hi") ||
      message.includes("hello")
    ) {
      return res.json({
        text: `👋 Welcome to VP Property

Try:
🏠 1 BHK Rent
🏠 2 BHK Sale
🏠 3 BHK Rent Borivali

Type "details" for dealer contact`,
      });
    }

    // Show results
    if (results.length) {
      const reply = results
        .map(
          (p) =>
            `🏠 ${p.title}
📍 ${p.location}
🛏️ ${p.bhk} BHK
🏷️ ${p.type.toUpperCase()}
💰 ₹${p.price.toLocaleString()}`
        )
        .join("\n\n");

      return res.json({
        text:
          reply +
          `\n\nType "details"`,
      });
    }

    return res.json({
      text:
        "❌ No properties found",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      text: "Server Error",
    });
  }
});

module.exports = router;
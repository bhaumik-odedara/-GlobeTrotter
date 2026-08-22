const express = require("express");
const router = express.Router();

const {
  getItinerary,
  getSharedItinerary,
  toggleShare,
} = require("../controllers/itineraryController");
const { protect } = require("../middleware/auth");

// Public route - shared itinerary (no auth)
router.get("/shared/:tripId", getSharedItinerary);

// Protected routes
router.get("/:tripId", protect, getItinerary);
router.put("/:tripId/share", protect, toggleShare);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  getTrips,
  getTrip,
  createTrip,
  updateTrip,
  deleteTrip,
  addDestination,
  removeDestination,
  getPublicTrips,
  copyTrip,
} = require("../controllers/tripController");
const { protect } = require("../middleware/auth");
const upload = require("../middleware/upload");

// Public routes (must be before /:id)
router.get("/public", getPublicTrips);

// Protected routes
router.get("/", protect, getTrips);
router.post("/", protect, upload.single("coverPhoto"), createTrip);
router.get("/:id", protect, getTrip);
router.put("/:id", protect, upload.single("coverPhoto"), updateTrip);
router.delete("/:id", protect, deleteTrip);

// Destination management
router.post("/:id/destinations", protect, addDestination);
router.delete("/:id/destinations/:cityId", protect, removeDestination);

// Copy trip
router.post("/:id/copy", protect, copyTrip);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  getCities,
  getCity,
  searchCities,
  createCity,
  updateCity,
  deleteCity,
} = require("../controllers/cityController");
const { protect, authorize } = require("../middleware/auth");

// Public routes
router.get("/", getCities);
router.get("/search", searchCities);
router.get("/:id", getCity);

// Admin routes
router.post("/", protect, authorize("admin"), createCity);
router.put("/:id", protect, authorize("admin"), updateCity);
router.delete("/:id", protect, authorize("admin"), deleteCity);

module.exports = router;

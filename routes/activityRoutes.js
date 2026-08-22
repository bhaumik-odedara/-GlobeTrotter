const express = require("express");
const router = express.Router();

const {
  getActivitiesByTrip,
  createActivity,
  updateActivity,
  deleteActivity,
  getCalendarActivities,
} = require("../controllers/activityController");
const { protect } = require("../middleware/auth");

router.get("/trip/:tripId", protect, getActivitiesByTrip);
router.get("/trip/:tripId/calendar", protect, getCalendarActivities);
router.post("/", protect, createActivity);
router.put("/:id", protect, updateActivity);
router.delete("/:id", protect, deleteActivity);

module.exports = router;

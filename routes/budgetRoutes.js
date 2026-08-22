const express = require("express");
const router = express.Router();

const {
  getBudget,
  createBudget,
  updateBudget,
  deleteBudget,
} = require("../controllers/budgetController");
const { protect } = require("../middleware/auth");

router.get("/:tripId", protect, getBudget);
router.post("/", protect, createBudget);
router.put("/:tripId", protect, updateBudget);
router.delete("/:tripId", protect, deleteBudget);

module.exports = router;

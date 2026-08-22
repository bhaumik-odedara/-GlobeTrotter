const express = require("express");
const router = express.Router();

const {
  getStats,
  getAnalytics,
  getAllUsers,
  updateUserStatus,
  deleteUser,
} = require("../controllers/adminController");
const { protect, authorize } = require("../middleware/auth");

// All admin routes require authentication + admin role
router.use(protect);
router.use(authorize("admin"));

router.get("/stats", getStats);
router.get("/analytics", getAnalytics);
router.get("/users", getAllUsers);
router.put("/users/:id/status", updateUserStatus);
router.delete("/users/:id", deleteUser);

module.exports = router;

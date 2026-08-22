const express = require("express");
const router = express.Router();

const {
  getProfile,
  updateProfile,
  addSavedDestination,
  removeSavedDestination,
  deleteAccount,
  getUserById,
} = require("../controllers/userController");
const { protect } = require("../middleware/auth");
const upload = require("../middleware/upload");

router.get("/profile", protect, getProfile);
router.put("/profile", protect, upload.single("photo"), updateProfile);

router.post("/saved-destinations", protect, addSavedDestination);
router.delete("/saved-destinations", protect, removeSavedDestination);

router.delete("/account", protect, deleteAccount);

router.get("/:id", protect, getUserById);

module.exports = router;

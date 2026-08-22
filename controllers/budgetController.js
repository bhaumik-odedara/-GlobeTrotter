const Budget = require("../models/Budget");
const Trip = require("../models/Trip");

// @desc    Get budget for a trip
// @route   GET /api/budgets/:tripId
// @access  Private
exports.getBudget = async (req, res) => {
  try {
    const budget = await Budget.findOne({ trip: req.params.tripId }).populate(
      "trip",
      "name startDate endDate"
    );

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found for this trip",
      });
    }

    // Check ownership
    if (budget.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    res.status(200).json({
      success: true,
      data: budget,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create budget for a trip
// @route   POST /api/budgets
// @access  Private
exports.createBudget = async (req, res) => {
  try {
    const { trip, totalBudget, categories, dailyBudget, currency } = req.body;

    // Verify trip exists and belongs to user
    const tripDoc = await Trip.findById(trip);
    if (!tripDoc) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }
    if (tripDoc.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    // Check if budget already exists
    const existing = await Budget.findOne({ trip });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Budget already exists for this trip. Use PUT to update.",
      });
    }

    const budget = await Budget.create({
      trip,
      user: req.user.id,
      totalBudget,
      categories: categories || [],
      dailyBudget: dailyBudget || [],
      currency: currency || "INR",
    });

    res.status(201).json({
      success: true,
      message: "Budget created",
      data: budget,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update budget for a trip
// @route   PUT /api/budgets/:tripId
// @access  Private
exports.updateBudget = async (req, res) => {
  try {
    let budget = await Budget.findOne({ trip: req.params.tripId });

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found for this trip",
      });
    }

    if (budget.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    budget = await Budget.findOneAndUpdate(
      { trip: req.params.tripId },
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Budget updated",
      data: budget,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete budget for a trip
// @route   DELETE /api/budgets/:tripId
// @access  Private
exports.deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findOne({ trip: req.params.tripId });

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found",
      });
    }

    if (budget.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    await Budget.findByIdAndDelete(budget._id);

    res.status(200).json({
      success: true,
      message: "Budget deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

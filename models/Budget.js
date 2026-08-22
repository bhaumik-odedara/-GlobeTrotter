const mongoose = require("mongoose");

const budgetCategorySchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["Transport", "Stay", "Activities", "Meals", "Shopping", "Misc"],
    required: true,
  },
  estimated: {
    type: Number,
    required: true,
    min: 0,
  },
  actual: {
    type: Number,
    default: 0,
    min: 0,
  },
});

const dailyBudgetSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true,
    min: 1,
  },
  date: {
    type: Date,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  estimated: {
    type: Number,
    default: 0,
    min: 0,
  },
  actual: {
    type: Number,
    default: 0,
    min: 0,
  },
});

const budgetSchema = new mongoose.Schema(
  {
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    totalBudget: {
      type: Number,
      required: [true, "Total budget is required"],
      min: 0,
    },
    categories: [budgetCategorySchema],
    dailyBudget: [dailyBudgetSchema],
    currency: {
      type: String,
      default: "INR",
    },
  },
  {
    timestamps: true,
  }
);

// Virtual for estimated cost (sum of all category estimates)
budgetSchema.virtual("estimatedCost").get(function () {
  return this.categories.reduce((sum, cat) => sum + cat.estimated, 0);
});

// Virtual for remaining budget
budgetSchema.virtual("remaining").get(function () {
  const estimated = this.categories.reduce((sum, cat) => sum + cat.estimated, 0);
  return this.totalBudget - estimated;
});

// Virtual for daily average
budgetSchema.virtual("dailyAverage").get(function () {
  if (!this.dailyBudget || this.dailyBudget.length === 0) return 0;
  const total = this.dailyBudget.reduce((sum, day) => sum + day.estimated, 0);
  return Math.round(total / this.dailyBudget.length);
});

budgetSchema.set("toJSON", { virtuals: true });
budgetSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Budget", budgetSchema);

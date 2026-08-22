const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Activity title is required"],
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      default: "",
      maxlength: 1000,
    },
    time: {
      type: String,
      required: [true, "Activity time is required"],
    },
    location: {
      type: String,
      default: "",
      trim: true,
    },
    type: {
      type: String,
      enum: [
        "Travel",
        "Sightseeing",
        "Food",
        "Culture",
        "Activity",
        "Adventure",
        "Shopping",
        "Hotel",
        "Experience",
      ],
      default: "Activity",
    },
    date: {
      type: Date,
      required: [true, "Activity date is required"],
    },
    dayNumber: {
      type: Number,
      required: true,
      min: 1,
    },
    cost: {
      type: Number,
      default: 0,
      min: 0,
    },
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
activitySchema.index({ trip: 1, date: 1 });
activitySchema.index({ user: 1 });

module.exports = mongoose.model("Activity", activitySchema);

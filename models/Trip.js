const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Trip name is required"],
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      default: "",
      maxlength: 2000,
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"],
    },
    coverPhoto: {
      type: String,
      default: "",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    destinations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "City",
      },
    ],
    travelers: {
      type: Number,
      default: 1,
      min: 1,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual for destination count
tripSchema.virtual("destinationCount").get(function () {
  return this.destinations ? this.destinations.length : 0;
});

// Ensure virtuals are included in JSON output
tripSchema.set("toJSON", { virtuals: true });
tripSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Trip", tripSchema);

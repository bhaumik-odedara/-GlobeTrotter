const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "City name is required"],
      trim: true,
      maxlength: 100,
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
      maxlength: 100,
    },
    region: {
      type: String,
      required: [true, "Region is required"],
      enum: [
        "Europe",
        "Asia",
        "North America",
        "South America",
        "Africa",
        "Middle East",
        "Oceania",
      ],
    },
    costIndex: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    popularity: {
      type: String,
      default: "0%",
    },
    image: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

// Index for search
citySchema.index({ name: "text", country: "text" });

module.exports = mongoose.model("City", citySchema);

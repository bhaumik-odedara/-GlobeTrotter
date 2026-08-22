const City = require("../models/City");

// @desc    Get all cities
// @route   GET /api/cities
// @access  Public
exports.getCities = async (req, res) => {
  try {
    const { search, region, costIndex, limit = 50 } = req.query;

    const filter = {};

    // Search by name or country
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { country: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by region
    if (region && region !== "All") {
      filter.region = region;
    }

    // Filter by cost index
    if (costIndex) {
      filter.costIndex = costIndex;
    }

    const cities = await City.find(filter).limit(Number(limit));

    res.status(200).json({
      success: true,
      count: cities.length,
      data: cities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single city
// @route   GET /api/cities/:id
// @access  Public
exports.getCity = async (req, res) => {
  try {
    const city = await City.findById(req.params.id);

    if (!city) {
      return res.status(404).json({
        success: false,
        message: "City not found",
      });
    }

    res.status(200).json({
      success: true,
      data: city,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Search cities
// @route   GET /api/cities/search
// @access  Public
exports.searchCities = async (req, res) => {
  try {
    const { q, country, region } = req.query;

    const filter = {};

    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { country: { $regex: q, $options: "i" } },
      ];
    }

    if (country && country !== "All") {
      filter.country = country;
    }

    if (region && region !== "All") {
      filter.region = region;
    }

    const cities = await City.find(filter).limit(20);

    res.status(200).json({
      success: true,
      count: cities.length,
      data: cities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create city (admin only)
// @route   POST /api/cities
// @access  Private/Admin
exports.createCity = async (req, res) => {
  try {
    const city = await City.create(req.body);

    res.status(201).json({
      success: true,
      message: "City created",
      data: city,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update city (admin only)
// @route   PUT /api/cities/:id
// @access  Private/Admin
exports.updateCity = async (req, res) => {
  try {
    const city = await City.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!city) {
      return res.status(404).json({
        success: false,
        message: "City not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "City updated",
      data: city,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete city (admin only)
// @route   DELETE /api/cities/:id
// @access  Private/Admin
exports.deleteCity = async (req, res) => {
  try {
    const city = await City.findByIdAndDelete(req.params.id);

    if (!city) {
      return res.status(404).json({
        success: false,
        message: "City not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "City deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

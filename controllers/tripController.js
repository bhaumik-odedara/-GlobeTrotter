const Trip = require("../models/Trip");
const Activity = require("../models/Activity");
const Budget = require("../models/Budget");

// @desc    Get all trips for logged in user
// @route   GET /api/trips
// @access  Private
exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user.id })
      .populate("destinations")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: trips.length,
      data: trips,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single trip
// @route   GET /api/trips/:id
// @access  Private
exports.getTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id)
      .populate("destinations")
      .populate("user", "name email photo");

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    // Check ownership unless it's a public trip
    if (
      trip.user._id.toString() !== req.user.id &&
      !trip.isPublic
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this trip",
      });
    }

    res.status(200).json({
      success: true,
      data: trip,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create new trip
// @route   POST /api/trips
// @access  Private
exports.createTrip = async (req, res) => {
  try {
    const { name, startDate, endDate, description, travelers, isPublic } =
      req.body;

    const tripData = {
      name,
      startDate,
      endDate,
      description,
      travelers,
      isPublic,
      user: req.user.id,
    };

    // Handle cover photo upload
    if (req.file) {
      tripData.coverPhoto = `/uploads/${req.file.filename}`;
    }

    const trip = await Trip.create(tripData);

    res.status(201).json({
      success: true,
      message: "Trip created successfully",
      data: trip,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update trip
// @route   PUT /api/trips/:id
// @access  Private
exports.updateTrip = async (req, res) => {
  try {
    let trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    // Check ownership
    if (trip.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this trip",
      });
    }

    // Handle cover photo upload
    if (req.file) {
      req.body.coverPhoto = `/uploads/${req.file.filename}`;
    }

    trip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("destinations");

    res.status(200).json({
      success: true,
      message: "Trip updated successfully",
      data: trip,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete trip
// @route   DELETE /api/trips/:id
// @access  Private
exports.deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    // Check ownership
    if (trip.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this trip",
      });
    }

    // Delete associated activities and budget
    await Activity.deleteMany({ trip: trip._id });
    await Budget.deleteOne({ trip: trip._id });

    await Trip.findByIdAndDelete(trip._id);

    res.status(200).json({
      success: true,
      message: "Trip and associated data deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Add city destination to trip
// @route   POST /api/trips/:id/destinations
// @access  Private
exports.addDestination = async (req, res) => {
  try {
    const { cityId } = req.body;

    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    if (trip.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    if (!trip.destinations.includes(cityId)) {
      trip.destinations.push(cityId);
      await trip.save();
    }

    await trip.populate("destinations");

    res.status(200).json({
      success: true,
      message: "Destination added to trip",
      data: trip,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Remove city destination from trip
// @route   DELETE /api/trips/:id/destinations/:cityId
// @access  Private
exports.removeDestination = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    if (trip.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    trip.destinations = trip.destinations.filter(
      (d) => d.toString() !== req.params.cityId
    );
    await trip.save();
    await trip.populate("destinations");

    res.status(200).json({
      success: true,
      message: "Destination removed from trip",
      data: trip,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get public/shared trips
// @route   GET /api/trips/public
// @access  Public
exports.getPublicTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ isPublic: true })
      .populate("destinations")
      .populate("user", "name photo")
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      count: trips.length,
      data: trips,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Copy/duplicate a public trip
// @route   POST /api/trips/:id/copy
// @access  Private
exports.copyTrip = async (req, res) => {
  try {
    const originalTrip = await Trip.findById(req.params.id);

    if (!originalTrip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    // Create a copy of the trip for the current user
    const newTrip = await Trip.create({
      name: `${originalTrip.name} (Copy)`,
      description: originalTrip.description,
      startDate: originalTrip.startDate,
      endDate: originalTrip.endDate,
      coverPhoto: originalTrip.coverPhoto,
      user: req.user.id,
      destinations: originalTrip.destinations,
      travelers: originalTrip.travelers,
      isPublic: false,
    });

    // Copy activities
    const activities = await Activity.find({ trip: originalTrip._id });
    const newActivities = activities.map((act) => ({
      title: act.title,
      description: act.description,
      time: act.time,
      location: act.location,
      type: act.type,
      date: act.date,
      dayNumber: act.dayNumber,
      cost: act.cost,
      trip: newTrip._id,
      user: req.user.id,
    }));

    if (newActivities.length > 0) {
      await Activity.insertMany(newActivities);
    }

    res.status(201).json({
      success: true,
      message: "Trip copied successfully",
      data: newTrip,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

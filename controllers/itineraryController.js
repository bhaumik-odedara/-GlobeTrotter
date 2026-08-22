const Trip = require("../models/Trip");
const Activity = require("../models/Activity");

// @desc    Get full itinerary for a trip
// @route   GET /api/itineraries/:tripId
// @access  Private
exports.getItinerary = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId)
      .populate("destinations")
      .populate("user", "name email photo");

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    // Allow access if owner or public trip
    if (trip.user._id.toString() !== req.user.id && !trip.isPublic) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this itinerary",
      });
    }

    // Get all activities grouped by day
    const activities = await Activity.find({ trip: req.params.tripId }).sort({
      date: 1,
      time: 1,
    });

    // Calculate trip duration
    const startDate = new Date(trip.startDate);
    const endDate = new Date(trip.endDate);
    const duration =
      Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

    // Build day-by-day itinerary
    const days = [];
    for (let i = 1; i <= duration; i++) {
      const dayDate = new Date(startDate);
      dayDate.setDate(startDate.getDate() + i - 1);

      const dayActivities = activities.filter((a) => a.dayNumber === i);

      days.push({
        day: `Day ${i}`,
        date: dayDate.toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
        }),
        fullDate: dayDate,
        activities: dayActivities,
      });
    }

    // Calculate total activities and cost
    const totalActivities = activities.length;
    const totalCost = activities.reduce((sum, a) => sum + (a.cost || 0), 0);

    const itinerary = {
      title: trip.name,
      location: trip.destinations
        .map((d) => `${d.name}, ${d.country}`)
        .join(" → "),
      dates: `${new Date(trip.startDate).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
      })} - ${new Date(trip.endDate).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}`,
      travelers: trip.travelers,
      duration,
      totalActivities,
      totalCost,
      days,
      trip,
    };

    res.status(200).json({
      success: true,
      data: itinerary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get shared/public itinerary (no auth required)
// @route   GET /api/itineraries/shared/:tripId
// @access  Public
exports.getSharedItinerary = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId)
      .populate("destinations")
      .populate("user", "name photo");

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Itinerary not found",
      });
    }

    if (!trip.isPublic) {
      return res.status(403).json({
        success: false,
        message: "This itinerary is not public",
      });
    }

    const activities = await Activity.find({ trip: req.params.tripId }).sort({
      date: 1,
      time: 1,
    });

    const startDate = new Date(trip.startDate);
    const endDate = new Date(trip.endDate);
    const duration =
      Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

    const days = [];
    for (let i = 1; i <= duration; i++) {
      const dayDate = new Date(startDate);
      dayDate.setDate(startDate.getDate() + i - 1);
      const dayActivities = activities.filter((a) => a.dayNumber === i);

      days.push({
        day: `Day ${i}`,
        date: dayDate.toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
        }),
        activityCount: dayActivities.length,
        activities: dayActivities,
      });
    }

    const itinerary = {
      title: trip.name,
      location: trip.destinations
        .map((d) => `${d.name}, ${d.country}`)
        .join(" → "),
      dates: `${new Date(trip.startDate).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
      })} - ${new Date(trip.endDate).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}`,
      travelers: trip.travelers,
      days,
    };

    res.status(200).json({
      success: true,
      data: itinerary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Toggle itinerary public/private
// @route   PUT /api/itineraries/:tripId/share
// @access  Private
exports.toggleShare = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);

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

    trip.isPublic = !trip.isPublic;
    await trip.save();

    res.status(200).json({
      success: true,
      message: trip.isPublic
        ? "Itinerary is now public"
        : "Itinerary is now private",
      data: { isPublic: trip.isPublic },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

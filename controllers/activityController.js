const Activity = require("../models/Activity");
const Trip = require("../models/Trip");

// @desc    Get all activities for a trip
// @route   GET /api/activities/trip/:tripId
// @access  Private
exports.getActivitiesByTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    const activities = await Activity.find({ trip: req.params.tripId }).sort({
      date: 1,
      time: 1,
    });

    // Group activities by day
    const grouped = {};
    activities.forEach((activity) => {
      const dayKey = `Day ${activity.dayNumber}`;
      if (!grouped[dayKey]) {
        grouped[dayKey] = {
          day: dayKey,
          date: activity.date,
          dayNumber: activity.dayNumber,
          activities: [],
        };
      }
      grouped[dayKey].activities.push(activity);
    });

    const days = Object.values(grouped).sort(
      (a, b) => a.dayNumber - b.dayNumber
    );

    res.status(200).json({
      success: true,
      count: activities.length,
      data: {
        activities,
        grouped: days,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create new activity
// @route   POST /api/activities
// @access  Private
exports.createActivity = async (req, res) => {
  try {
    const { title, description, time, location, type, date, dayNumber, cost, trip } =
      req.body;

    // Verify trip belongs to user
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
        message: "Not authorized to add activities to this trip",
      });
    }

    const activity = await Activity.create({
      title,
      description,
      time,
      location,
      type,
      date,
      dayNumber,
      cost,
      trip,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Activity created",
      data: activity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update activity
// @route   PUT /api/activities/:id
// @access  Private
exports.updateActivity = async (req, res) => {
  try {
    let activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: "Activity not found",
      });
    }

    if (activity.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this activity",
      });
    }

    activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Activity updated",
      data: activity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete activity
// @route   DELETE /api/activities/:id
// @access  Private
exports.deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: "Activity not found",
      });
    }

    if (activity.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this activity",
      });
    }

    await Activity.findByIdAndDelete(activity._id);

    res.status(200).json({
      success: true,
      message: "Activity deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get activities by date for calendar view
// @route   GET /api/activities/trip/:tripId/calendar
// @access  Private
exports.getCalendarActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ trip: req.params.tripId }).sort({
      date: 1,
      time: 1,
    });

    // Group by date for calendar view
    const calendarDays = [];
    const dateMap = {};

    activities.forEach((activity) => {
      const dateStr = activity.date.toISOString().split("T")[0];

      if (!dateMap[dateStr]) {
        const dateObj = new Date(activity.date);
        dateMap[dateStr] = {
          date: dateStr,
          day: dateObj.toLocaleDateString("en-US", { weekday: "long" }),
          month: dateObj.toLocaleDateString("en-US", { month: "long" }),
          activities: [],
        };
        calendarDays.push(dateMap[dateStr]);
      }

      dateMap[dateStr].activities.push({
        time: activity.time,
        title: activity.title,
        location: activity.location,
        type: activity.type,
      });
    });

    res.status(200).json({
      success: true,
      data: calendarDays,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

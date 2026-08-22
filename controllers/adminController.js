const User = require("../models/User");
const Trip = require("../models/Trip");
const Activity = require("../models/Activity");
const City = require("../models/City");

// @desc    Get admin dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTrips = await Trip.countDocuments();
    const popularCities = await City.countDocuments();
    const totalActivities = await Activity.countDocuments();

    // Calculate growth (compare with previous month)
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const usersLastMonth = await User.countDocuments({
      createdAt: { $lt: lastMonth },
    });
    const tripsLastMonth = await Trip.countDocuments({
      createdAt: { $lt: lastMonth },
    });

    const userGrowth =
      usersLastMonth > 0
        ? (((totalUsers - usersLastMonth) / usersLastMonth) * 100).toFixed(1)
        : 0;
    const tripGrowth =
      tripsLastMonth > 0
        ? (((totalTrips - tripsLastMonth) / tripsLastMonth) * 100).toFixed(1)
        : 0;

    res.status(200).json({
      success: true,
      data: {
        stats: [
          {
            title: "Total Users",
            value: totalUsers.toLocaleString(),
            icon: "users",
            change: `+${userGrowth}%`,
          },
          {
            title: "Total Trips",
            value: totalTrips.toLocaleString(),
            icon: "trips",
            change: `+${tripGrowth}%`,
          },
          {
            title: "Popular Cities",
            value: popularCities.toString(),
            icon: "cities",
            change: "+5.2%",
          },
          {
            title: "Activities",
            value: totalActivities.toLocaleString(),
            icon: "activities",
            change: "+10.8%",
          },
        ],
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get analytics - monthly trip data and top cities
// @route   GET /api/admin/analytics
// @access  Private/Admin
exports.getAnalytics = async (req, res) => {
  try {
    const year = parseInt(req.query.year) || new Date().getFullYear();

    // Monthly trip creation data
    const monthlyTrips = await Trip.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(year, 0, 1),
            $lt: new Date(year + 1, 0, 1),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    const chartData = months.map((month, index) => {
      const found = monthlyTrips.find((m) => m._id === index + 1);
      return {
        month,
        count: found ? found.count : 0,
      };
    });

    // Top cities by trip count
    const topCities = await Trip.aggregate([
      { $unwind: "$destinations" },
      {
        $group: {
          _id: "$destinations",
          tripCount: { $sum: 1 },
        },
      },
      { $sort: { tripCount: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "cities",
          localField: "_id",
          foreignField: "_id",
          as: "city",
        },
      },
      { $unwind: "$city" },
      {
        $project: {
          city: "$city.name",
          trips: "$tripCount",
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        monthlyTrips: chartData,
        topCities,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all users (admin)
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, status } = req.query;

    const filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }
    if (status) {
      filter.status = status;
    }

    const users = await User.find(filter)
      .select("-savedDestinations")
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ createdAt: -1 });

    // Get trip counts for each user
    const usersWithTrips = await Promise.all(
      users.map(async (user) => {
        const tripCount = await Trip.countDocuments({ user: user._id });
        return {
          ...user.toObject(),
          trips: tripCount,
        };
      })
    );

    const total = await User.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: usersWithTrips,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update user status (admin)
// @route   PUT /api/admin/users/:id/status
// @access  Private/Admin
exports.updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `User status updated to ${status}`,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete user (admin)
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res) => {
  try {
    // Delete user's trips and associated data
    const trips = await Trip.find({ user: req.params.id });
    for (const trip of trips) {
      await Activity.deleteMany({ trip: trip._id });
    }
    await Trip.deleteMany({ user: req.params.id });

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "User and all associated data deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

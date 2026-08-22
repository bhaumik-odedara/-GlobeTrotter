require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const {
  connectDB,
  isDBConnected,
  getConnectionInfo,
  setupGracefulShutdown,
} = require("./config/db");
const { errorHandler } = require("./middleware/errorHandler");

// Route imports
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const tripRoutes = require("./routes/tripRoutes");
const activityRoutes = require("./routes/activityRoutes");
const cityRoutes = require("./routes/cityRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const adminRoutes = require("./routes/adminRoutes");
const itineraryRoutes = require("./routes/itineraryRoutes");

// Connect to database
connectDB();

// Setup graceful shutdown (handles SIGINT, SIGTERM)
setupGracefulShutdown();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger (development only)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/itineraries", itineraryRoutes);

// Health check
app.get("/api/health", (req, res) => {
  const dbInfo = getConnectionInfo();
  const dbOk = isDBConnected();

  res.status(dbOk ? 200 : 503).json({
    success: dbOk,
    message: dbOk
      ? "Travel Planner API is running"
      : "API running but database is disconnected",
    timestamp: new Date().toISOString(),
    database: {
      status: dbInfo.status,
      host: dbInfo.host,
      name: dbInfo.name,
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

// Global error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

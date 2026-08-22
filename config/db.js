const mongoose = require("mongoose");

// Track connection state
let isConnected = false;
let connectionRetries = 0;
const MAX_RETRIES = 5;
const RETRY_DELAY = 5000; // 5 seconds

/**
 * Connect to MongoDB with retry logic and event listeners.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,           // Connection pool size
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,                 // Use IPv4
    });

    isConnected = true;
    connectionRetries = 0;

    console.log(
      `MongoDB Connected: ${conn.connection.host} | Database: ${conn.connection.name}`
    );

    // ── Connection Event Listeners ──

    mongoose.connection.on("connected", () => {
      console.log("MongoDB: Connection established");
      isConnected = true;
    });

    mongoose.connection.on("error", (err) => {
      console.error(`MongoDB: Connection error - ${err.message}`);
      isConnected = false;
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB: Connection disconnected");
      isConnected = false;
      handleReconnect();
    });

    // Close connection on app termination
    mongoose.connection.on("close", () => {
      console.log("MongoDB: Connection closed");
      isConnected = false;
    });

  } catch (error) {
    console.error(`MongoDB: Initial connection failed - ${error.message}`);
    isConnected = false;
    handleReconnect();
  }
};

/**
 * Auto-reconnect with exponential backoff.
 */
const handleReconnect = () => {
  if (connectionRetries >= MAX_RETRIES) {
    console.error(
      `MongoDB: Max retries (${MAX_RETRIES}) reached. Giving up.`
    );
    process.exit(1);
  }

  connectionRetries++;
  const delay = RETRY_DELAY * connectionRetries;

  console.log(
    `MongoDB: Retrying connection (${connectionRetries}/${MAX_RETRIES}) in ${delay / 1000}s...`
  );

  setTimeout(connectDB, delay);
};

/**
 * Gracefully close the database connection.
 */
const closeDB = async () => {
  try {
    await mongoose.connection.close();
    isConnected = false;
    console.log("MongoDB: Connection closed gracefully");
  } catch (error) {
    console.error(`MongoDB: Error closing connection - ${error.message}`);
  }
};

/**
 * Check if the database is connected.
 */
const isDBConnected = () => {
  return (
    isConnected &&
    mongoose.connection.readyState === 1
  );
};

/**
 * Get connection status details.
 */
const getConnectionInfo = () => {
  const states = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };

  return {
    status: states[mongoose.connection.readyState] || "unknown",
    host: mongoose.connection.host || null,
    name: mongoose.connection.name || null,
    port: mongoose.connection.port || null,
  };
};

/**
 * Graceful shutdown handler for process signals.
 */
const setupGracefulShutdown = () => {
  // Handle SIGINT (Ctrl+C)
  process.on("SIGINT", async () => {
    console.log("\nSIGINT received. Shutting down...");
    await closeDB();
    process.exit(0);
  });

  // Handle SIGTERM
  process.on("SIGTERM", async () => {
    console.log("\nSIGTERM received. Shutting down...");
    await closeDB();
    process.exit(0);
  });

  // Handle uncaught exceptions
  process.on("unhandledRejection", (reason) => {
    console.error(`Unhandled Rejection: ${reason}`);
  });
};

module.exports = {
  connectDB,
  closeDB,
  isDBConnected,
  getConnectionInfo,
  setupGracefulShutdown,
};

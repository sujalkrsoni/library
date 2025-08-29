import mongoose from "mongoose";
import connectDB from "./config/db.js";
import config from "./config/validateEnv.js";  
import app from "./app.js";

const PORT = config.port;

// Start server only after DB is connected
connectDB().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });

  // Graceful shutdown
  const shutdown = async () => {
    console.log("👋 Shutting down gracefully...");
    await mongoose.connection.close();
    server.close(() => {
      console.log("✅ Server closed, DB connection closed");
      process.exit(0);
    });
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
});

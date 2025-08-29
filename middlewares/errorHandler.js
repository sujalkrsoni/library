import config from "../config/validateEnv.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;

  // Always log full error on the server
  console.error("❌ Error:", err);

  res.status(statusCode).json({
    success: false,
    message:
      config.nodeEnv === "production"
        ? "Something went wrong, please try again later." // ✅ safe
        : err.message,                                   // ✅ detailed in dev
    ...(config.nodeEnv !== "production" && { stack: err.stack }), // only show in dev
  });
};

export default errorHandler;

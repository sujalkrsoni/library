import logger from "./middlewares/logger.js";
import express from "express";
import bookRoutes from "./routes/bookRoutes.js"
import errorHandler from "./middlewares/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";


const app = express();

// Middleware
app.use(express.json());
app.use(logger);
app.use(errorHandler);

app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);

export default app;

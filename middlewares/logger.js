// middlewares/logger.js
import fs from "fs";
import path from "path";
import morgan from "morgan";

const accessLogStream = fs.createWriteStream(
  path.join(process.cwd(), "access.log"),
  { flags: "a" }
);

const logger = morgan("combined", { stream: accessLogStream });

export default logger;

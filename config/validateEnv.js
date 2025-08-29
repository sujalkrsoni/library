import Joi from "joi";
import dotenv from "dotenv";
import { fileURLToPath } from "url"; 
import { dirname,resolve } from "path";

// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure dotenv with path relative to project root
dotenv.config({ path: resolve(__dirname, "../.env") });

// Define schema
const envSchema = Joi.object({
  PORT: Joi.number().default(3000),
  MONGO_URL: Joi.string().uri().required(), 
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().default("1h"),
  NODE_ENV: Joi.string().valid("development", "production", "test").default("development"),
}).unknown();

// Validate
const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
  throw new Error(`❌ Environment validation error: ${error.message}`);
}

// Export validated vars
export default {
  nodeEnv: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoUri: envVars.MONGO_URL,
  jwtSecret: envVars.JWT_SECRET,
};

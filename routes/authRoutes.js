import { Router } from "express";
import { register, login } from "../controllers/atuhController.js";
import { registerSchema, loginSchema } from "../validators/userValidator.js";
import { validate } from "../middlewares/validate.js";
const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

export default router;

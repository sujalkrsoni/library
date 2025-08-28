import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

// helper: sign token
const signToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
  );
};

// signup
export const register = async (req, res, next) => {
  try {
    const { name, email, password , role} = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already registered" });

    const user = await User.create({ name, email, password , role});
    const token = signToken(user);

    res.status(201).json({ message: "User registered", token , data : user});
  } catch (err) {
    next(err);
  }
};

// login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await user.comparePassword(password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken(user);
    res.json({ message: "Login successful", token });
  } catch (err) {
    next(err);
  }
};

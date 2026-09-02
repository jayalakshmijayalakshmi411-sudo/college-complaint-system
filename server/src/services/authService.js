import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const authService = {
  async register(userData) {
    const { name, email, password, role = "student" } = userData;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email already exists");
    }

    // Create user
    const user = new User({ name, email, password, role });
    await user.save();

    return { id: user._id, name: user.name, email: user.email, role: user.role };
  },

  async login(email, password) {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || "7d",
    });

    return {
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    };
  },

  async getUserById(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },
};

export default authService;

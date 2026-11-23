
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign(
    { sub: id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  city: user.city,
  country: user.country,
  role: user.role
});

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, city, country } = req.body;

    if (
      !name?.trim() ||
      !email?.trim() ||
      !password ||
      !city?.trim() ||
      !country?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please complete all required fields."
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 8 characters."
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "This email is already registered."
      });
    }

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash: password,
      city: city.trim(),
      country: country.trim()
    });

    return res.status(201).json({
      success: true,
      message: "Welcome to USECIRCLE!",
      token: generateToken(user._id),
      user: publicUser(user)
    });

  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Registration failed. Please try again."
    });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email?.trim().toLowerCase()
    }).select("+passwordHash");

    if (
      !user ||
      !password ||
      !(await user.comparePassword(password))
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });
    }

    return res.json({
      success: true,
      message: "Login successful!",
      token: generateToken(user._id),
      user: publicUser(user)
    });

  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Login failed. Please try again."
    });
  }
});

// CURRENT USER
router.get("/me", authMiddleware, (req, res) => {
  res.json({
    success: true,
    user: publicUser(req.user)
  });
});

export default router;

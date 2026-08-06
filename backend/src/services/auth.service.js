

import User from "../models/user.model.js";
import generateOTP from "../utils/generateOTP.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcrypt";

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

class AuthService {
  // =========================
  // Signup
  // =========================
  async signup(userData) {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      role,
      address,
      city,
      storeName,
      storeProfile,
    } = userData;

    // Check existing user
    const normalizedEmail = email?.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      throw createError("Email already exists", 409);
    }

    // Generate OTP
    const otp = generateOTP();

    // OTP Expiry (2 Minutes)
    const otpExpiry = new Date(Date.now() + 2 * 60 * 1000);

    // Create User
    const user = await User.create({
      firstName,
      lastName,
      email: normalizedEmail,
      password,
      phone,
      role,
      address,
      city,
      ...(role === "seller"
        ? {
            storeProfile: {
              storeName: storeName || storeProfile?.storeName || "",
            },
          }
        : {}),
      otp,
      otpExpiry,
    });

    return {
      success: true,
      message: "Signup successful. OTP sent to your email.",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
    };
  }

  // =========================
  // Verify OTP
  // =========================
  async verifyOTP(email, otp) {
  const user = await User.findOne({ email: email?.trim().toLowerCase() });

  if (!user) {
    throw createError("User not found", 404);
  }

  // Case-insensitive comparison
  if (user.otp?.toUpperCase() !== otp?.trim().toUpperCase()) {
    throw createError("Invalid OTP", 400);
  }

  // Expiry check
  if (user.otpExpiry < new Date()) {
    throw createError("OTP has expired", 400);
  }

  user.isVerified = true;
  user.otp = null;
  user.otpExpiry = null;

  await user.save();

  return {
    success: true,
    message: "OTP Verified Successfully",
  };
}


  // =========================
  // Login
  // =========================
  async login(email, password) {
    const normalizedEmail = email?.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      throw createError("Invalid Email or Password", 401);
    }

    if (!user.isVerified) {
      throw createError("Please verify your email first", 403);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw createError("Invalid Email or Password", 401);
    }

    const token = generateToken(user._id, user.role);

    return {
      success: true,
      token,
      role: user.role,
      user,
    };
  }
}

export default new AuthService();

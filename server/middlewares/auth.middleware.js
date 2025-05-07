import jwt from "jsonwebtoken";
import { User } from "../models/users.model.js";

// Middleware to protect routes with access token
export const verifyAccessToken = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    if (!decoded.id || !decoded.email) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }
    req.user = user;

    next();
  } catch (err) {
    console.error("Access token error:", err);
    return res.status(401).json({ message: "Unauthorized or token expired" });
  }
};

// Middleware to validate refresh token via cookie
export const verifyRefreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    if (!decoded.id || !decoded.email) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }
    req.user = user;

    next();
  } catch (err) {
    console.error("Refresh token error:", err);
    return res
      .status(403)
      .json({ message: "Invalid or expired refresh token" });
  }
};

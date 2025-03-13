import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
export const generateTokenAndSaveInCookies = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "10d",
    // expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)  // 10 days expiry time
  });
  // In your JWT token generation function
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true, // Use secure cookies in production
    sameSite: "None", // Critical for cross-site requests
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
  
  await User.findByIdAndUpdate(userId, { token });
  return token;
};

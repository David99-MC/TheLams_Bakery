import type { Response } from "express";
import jwt from "jsonwebtoken";
import Mongoose from "mongoose";

// Generate a jwt token and set it as a cookie
const generateToken = (
  res: Response,
  userInfo: { userId: Mongoose.Types.ObjectId; username: string }
) => {
  const token = jwt.sign(userInfo, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  });
};

export default generateToken;

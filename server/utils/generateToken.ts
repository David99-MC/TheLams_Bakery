import type { Response } from "express";
import jwt from "jsonwebtoken";

import { config } from "dotenv";
config();

type UserInfo = {
  fullName: string;
  isAdmin: boolean;
};

// Generate an access token and a refresh token set it as a cookie
// Re-login is required when refresh token is expired
const generateTokens = (res: Response, userInfo: UserInfo) => {
  const accessToken = jwt.sign(
    userInfo,
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: "15m",
    }
  );
  const refreshToken = jwt.sign(
    userInfo,
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: "7d",
    }
  );

  res.cookie("refrestJwt", refreshToken, {
    httpOnly: true, // makes it not accessible by javascript
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });
  return [accessToken, refreshToken];
};

export default generateTokens;

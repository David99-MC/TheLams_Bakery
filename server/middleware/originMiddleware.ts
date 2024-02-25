import { allowedOrigins } from "../config/allowedOrigins";

export const verifyOrigins = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", true);
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};

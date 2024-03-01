import { allowedOrigins } from "./allowedOrigins";

export const corsOptions = {
  origin: (origin, callback) => {
    // !origin means the request is coming from services like Postman or Insomnia
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import asyncHandler from "express-async-handler";
import cookieParser from "cookie-parser";

import { config } from "dotenv";
config();

import { notFound, errorHandler } from "../middleware/errorMiddleware";
import generateTokens from "../utils/generateToken";
import { verifyJWT } from "../middleware/JwtVerifyMiddleware";

import Cake from "./models/cake";
import Order from "./models/order";
import User from "./models/user";
import { NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

const PORT = process.env.PORT || 5000;
const DB_URL = "mongodb://127.0.0.1:27017/TheLams_Bakery"; // process.env.MONGO_URL ||
mongoose
  .connect(DB_URL!)
  .then(() => {
    console.log("CONNECTED TO THELAMS_BAKERY");
  })
  .catch((err) => {
    console.log("FAILED TO CONNECT TO MONGO DB", err);
  });

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// For parsing application/json
app.use(express.json());
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.static(path.join(__dirname, "images")));

app.get("/", (req: Request, res: Response) => {
  res.send("hello from express with nodemon setup");
});

// access token has expired, therefore we issue a new access token
// with the refresh token being stored in the cookie
app.get(
  "/api/refreshToken",
  asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies["refreshJwt"];
    if (!refreshToken) {
      res.status(401);
      throw new Error("Unauthorized, no token found");
    }
    const user = await User.findOne({ refreshToken });
    if (!user) {
      res.status(403);
      throw new Error("Forbidden, no user found with the token");
    }
    // evaluate the refresh jwt
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string,
      (err, decoded) => {
        if (err || decoded.fullName !== user.fullName) {
          res.status(403);
          throw new Error("Forbidden, invalid token");
        }
        // issue a new access token
        const accessToken = jwt.sign(
          {
            fullName: decoded.fullName,
            isAdmin: decoded.isAdmin,
            cart: decoded.cart || [],
          },
          process.env.ACCESS_TOKEN_SECRET as string,
          {
            expiresIn: "1h",
          }
        );
        res.json(accessToken);
      }
    );

    res.send("hello from express with nodemon setup");
  })
);

app.get(
  "/api/menu",
  verifyJWT,
  asyncHandler(async (req: Request, res: Response) => {
    const menu = await Cake.find();
    res.status(200).json(menu);
  })
);

app.get(
  "/api/order/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const order = await Order.findById(id);
    res.status(200).json(order);
  })
);

app.post(
  "/api/order",
  verifyJWT,
  asyncHandler(async (req: Request, res: Response) => {
    const order = new Order(req.body);
    await order.save();
    res.status(200).json(order);
  })
);

app.post(
  "/api/register",
  asyncHandler(async (req: Request, res: Response) => {
    const { fullName, username, password } = req.body;
    const isUserExisted = await User.findOne({ username });
    if (isUserExisted) {
      res.status(400);
      throw new Error("username already exists");
    }
    const user = new User({ fullName, username, password });
    const [accessToken, refreshToken] = generateTokens(res, {
      fullName: user.fullName,
      isAdmin: user.isAdmin,
      cart: [],
    });
    user.refreshToken = refreshToken;
    await user.save();
    res.status(201).json(accessToken);
  })
);

app.post(
  "/api/login",
  asyncHandler(async (req: Request, res: Response) => {
    const { username, password }: { username: string; password: string } =
      req.body;
    const user = await User.findOne({ username });
    if (user && user.checkPassword(password)) {
      const [accessToken, refreshToken] = generateTokens(res, {
        fullName: user.fullName,
        isAdmin: user.isAdmin,
        cart: user.cart || [],
      });
      user.refreshToken = refreshToken;
      res.status(200).json(accessToken);
    } else {
      res.status(401);
      throw new Error("Wrong username or password");
    }
  })
);

app.get(
  "/api/logout",
  asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies["refreshJwt"];
    if (!refreshToken) {
      res.status(204).json({ message: "logged out" });
    }
    const user = await User.findOne({ refreshToken });
    // clear the cookie
    res.clearCookie("refrestJwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });
    if (user) {
      // clear the refresh token in the database
      user.refreshToken = "";
      await user.save();
      res.status(204).json({ message: "logged out" });
    }
  })
);

// app.get(
//   "/api/session/:sessionId",
//   asyncHandler(async (req: Request, res: Response) => {
//     const { sessionId } = req.params;
//     const session = await Session.findById(sessionId);
//     if (!session) {
//       res.status(404);
//       throw new Error("Session not found");
//     } else {
//       res.status(200).json(session);
//     }
//   })
// );

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`APP IS LISTENNING ${PORT}`);
});

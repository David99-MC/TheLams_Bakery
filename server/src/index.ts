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
import jwt from "jsonwebtoken";
import { corsOptions } from "../config/corsOptions";
import { verifyOrigins } from "../middleware/originMiddleware";

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

// Handle 'Access-Control-Allow-Origin' and 'Access-Control-Allow-Credentials' header
app.use(verifyOrigins);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// For parsing application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// For cookies in the request headers
app.use(cookieParser());

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
          },
          process.env.ACCESS_TOKEN_SECRET as string,
          {
            expiresIn: "15m",
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

// handling user roles
// ref: https://www.youtube.com/watch?v=f2EqECiTBL8 ~ 5:09:00

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
    });
    user.refreshToken = refreshToken;
    await user.save();
    res.status(201).json({
      user: { fullname: user.fullName, isAdmin: user.isAdmin },
      accessToken,
      cart: [],
    });
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
      });
      user.refreshToken = refreshToken;
      await user.save();
      res.status(200).json({
        user: { fullName: user.fullName, isAdmin: user.isAdmin },
        accessToken,
        cart: user.cart || [],
      });
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

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`APP IS LISTENNING ${PORT}`);
});

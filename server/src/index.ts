import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import asyncHandler from "express-async-handler";
import { notFound, errorHandler } from "../middleware/errorMiddleware";
import cookieParser from "cookie-parser";

import { config } from "dotenv";
config();

import Cake from "./models/cake";
import Order from "./models/order";
import User from "./models/user";
import generateToken from "../utils/generateToken";

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

app.get(
  "/api/menu",
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
  asyncHandler(async (req: Request, res: Response) => {
    const order = new Order(req.body);
    await order.save();
    res.status(200).json(order);
  })
);

app.post(
  "/api/register",
  asyncHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const isUserExisted = await User.findOne({ username });
    if (isUserExisted) {
      res.status(400);
      throw new Error("username already exists");
    }
    const user = await User.create({ username, password });
    generateToken(res, { userId: user._id, username: user.username });
    res.status(201).json(user);
  })
);

app.post(
  "/api/login",
  asyncHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && user.checkPassword(password)) {
      generateToken(res, { userId: user._id, username: user.username });
      res.status(200).json(user);
    } else {
      res.status(401);
      throw new Error("Wrong username or password");
    }
  })
);

app.get("/api/logout", (req: Request, res: Response) => {
  res.clearCookie("jwt").json({ message: "user logged out" });
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`APP IS LISTENNING ${PORT}`);
});

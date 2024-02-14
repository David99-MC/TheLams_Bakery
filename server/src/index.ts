import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";
import Cake from "./models/cake";
import Order from "./models/order";
import User from "./models/user";
import { compareSync, genSaltSync, hashSync } from "bcrypt-ts";
config();

const PORT = 5000;
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
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.static(path.join(__dirname, "images")));

app.get("/", (req: Request, res: Response) => {
  res.send("hello from express with nodemon setup");
});

app.get("/menu", async (req: Request, res: Response, next) => {
  try {
    const menu = await Cake.find();
    res.json(menu);
  } catch (err) {
    next(err);
  }
});

app.get("/order/:id", async (req: Request, res: Response, next) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    res.json(order);
  } catch (err) {
    next(err);
  }
});

app.post("/order", async (req: Request, res: Response, next) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.json(order);
  } catch (error) {
    next(error);
  }
});

app.post("/register", async (req: Request, res: Response, next) => {
  try {
    const { username, password } = req.body;
    const isUserExisted = await User.findOne({ username });
    if (isUserExisted) {
      throw new Error("username already exists");
    }
    const salt: string = genSaltSync(10);
    const hash: string = hashSync(password, salt);
    const user = new User({ username, hash });
    await user.save();
    res.json(user);
  } catch (error) {
    next(error);
  }
});

app.get("/login", async (req: Request, res: Response, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("Wrong username or password");
    }
    if (!compareSync(password, user.hash)) {
      throw new Error("Wrong username or password");
    }
    // send back a signed JWT
    res.json(user);
  } catch (error) {
    next(error);
  }
});

app.listen(PORT, () => {
  console.log(`APP IS LISTENNING ${PORT}`);
});

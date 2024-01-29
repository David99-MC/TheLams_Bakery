import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
config();

const PORT = 5000;
const DB_URL = "mongodb://127.0.0.1:27017/TheLams_Bakery"; // || process.env.MONGO_URL
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("CONNECTED TO THELAMS_BAKERY");
  })
  .catch((err) => {
    console.log("FAILED TO CONNECT TO MONGO DB", err);
  });

const app = express();

// For parsing application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("hello from express with nodemon setup");
});

app.post("/bread", (req: Request, res: Response) => {
  // const { ingredient, type, dairy } = req.body;
  console.log(`request body: `, req.body);
  res.send(req.body);
});

app.listen(PORT, () => {
  console.log(`APP IS LISTENNING ${PORT}`);
});

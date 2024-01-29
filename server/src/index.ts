import express, { Request, Response } from "express";
import mongoose from "mongoose";
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/TheLams_Bakery")
  .then(() => {
    console.log("CONNECTED TO THELAMS_BAKERY");
  })
  .catch((err) => {
    console.log("FAILED TO CONNECT TO MONGO DB", err);
  });

app.get("/", (req: Request, res: Response) => {
  res.send("hello from express with nodemon setup");
});

app.listen(5000, () => {
  console.log("APP IS LISTENNING 5000");
});

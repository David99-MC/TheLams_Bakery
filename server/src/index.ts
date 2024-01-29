import express, { Request, Response } from "express";
const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("hello from express with nodemon setup");
});

app.listen(5000);

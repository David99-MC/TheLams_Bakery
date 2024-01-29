import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("hello from express");
});

app.listen(5000);

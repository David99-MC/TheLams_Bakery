import mongoose from "mongoose";
import Cake from "../models/Cake";

import { cakes } from "./cakes";
import { fakeOrders } from "./orders";
import Order from "../models/order";
mongoose
  .connect("mongodb://127.0.0.1:27017/TheLams_Bakery")
  .then(() => {
    console.log("Connected to TheLams_Bakery db!");
  })
  .catch((err) => {
    console.log("OH NO, cannot connect to TheLams_Bakery db!");
  });

async function seedDB() {
  await Cake.deleteMany({});
  for (let i = 0; i < 17; i++) {
    const random10 = Math.floor(Math.random() * 10);
    const cake = new Cake({
      vietnameseName: cakes[random10].vietnameseName,
      englishName: "",
      unitPrice: cakes[random10].unitPrice,
      imgUrl: cakes[random10].imgUrl,
      ingredients: cakes[random10].ingredients,
      soldOut: false,
    });
    await cake.save();
  }

  for (let fakeOrder of fakeOrders) {
    const order = new Order(fakeOrder);
    await order.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
  console.log("Closed connection");
});

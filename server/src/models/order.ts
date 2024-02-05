import { Schema, model, type Model } from "mongoose";

export type Order = {
  _id?: string;
  status: "Received" | "In oven" | "In Delivery" | "Delivered";
  customerName: string;
  phone: string;
  address: string;
  priority: boolean;
  estimatedDelivery: string;
  cart: {
    productID: number; // ref from Cake item
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
  position?: string;
  orderPrice: number;
  priorityPrice: number;
};

const OrderSchema = new Schema<Order>({
  status: {
    type: String,
    enum: ["Received", "In oven", "In Delivery", "Delivered"],
  },
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  priority: Boolean,
  estimatedDelivery: String,
  cart: [
    {
      productID: String,
      productName: String,
      quantity: Number,
      unitPrice: Number,
      totalPrice: Number,
    },
  ],
  position: String,
  orderPrice: { type: Number, required: true },
  priorityPrice: { type: Number, required: true },
});

const Order: Model<Order> = model("order", OrderSchema);

export default Order;

import { Schema, model, type Model } from "mongoose";

type CartItemType = {
  productID: string;
  productName: string;
  unitPrice: number;
  quantity: number;
};

export enum OrderStatus {
  // "Unknown" | "Received" | "In Progress" | "In Delivery" | "Delivered"
  "Unknown" = "Unknown",
  "Received" = "Received",
  "In Progress" = "In Progress",
  "In Delivery" = "In Delivery",
  "Delivered" = "Delivered",
}

export type Order = {
  _id?: string;
  status: OrderStatus;
  customerName: string;
  phone: string;
  address: string;
  priority: boolean;
  cart: CartItemType[];
  orderPrice: number;
  priorityPrice: number;
};

const OrderSchema = new Schema<Order>({
  status: {
    type: String,
    enum: ["Received", "In Progress", "In Delivery", "Delivered"],
  },
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  priority: Boolean,
  cart: [
    {
      productID: String,
      productName: String,
      quantity: Number,
      unitPrice: Number,
    },
  ],
  orderPrice: { type: Number, required: true },
  priorityPrice: Number,
});

const Order: Model<Order> = model("order", OrderSchema);

export default Order;

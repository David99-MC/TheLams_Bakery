import { Schema, model } from "mongoose";

export type cartItemType = {
  productID: string;
  productName: string;
  quantity: number;
  unitPrice: number;
};
type session = {
  cart: cartItemType[];
  // potentially more fields
};

const cartItemSchema = new Schema<cartItemType>({
  productID: String,
  productName: String,
  quantity: Number,
  unitPrice: Number,
});

const SessionSchema = new Schema<session>({
  cart: {
    type: [cartItemSchema],
    default: [],
    // if 'expireAt' is set, then document expires at expireAt + 1 week
    expireAt: { type: Date, expires: 60 * 60 * 24 * 7 }, // 'expires' value expressed in seconds
  },
  // potentially more fields
});

const Session = model<session>("Session", SessionSchema);

export default Session;

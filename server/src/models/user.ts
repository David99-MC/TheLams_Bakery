import { Schema, model, Types, Model } from "mongoose";
import { compareSync, genSaltSync, hashSync } from "bcrypt-ts";

export type cartItemType = {
  productID: string;
  productName: string;
  quantity: number;
  unitPrice: number;
};

type UserType = {
  fullName: string;
  isAdmin: boolean;
  username: string;
  password: string;
  cart: cartItemType[];
  refreshToken?: string;
  checkPassword: (rawPassword: string) => boolean;
};

const cartItemSchema = new Schema<cartItemType>({
  productID: String,
  productName: String,
  quantity: Number,
  unitPrice: Number,
});

const UserSchema = new Schema<UserType>({
  fullName: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: {
    type: [cartItemSchema],
    default: [],
  },
  refreshToken: String,
});

UserSchema.methods.checkPassword = function (rawPassword: string) {
  return compareSync(rawPassword, this.password);
};

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = genSaltSync(10);
  this.password = hashSync(this.password, salt);
  next();
});

const User: Model<UserType> = model("user", UserSchema);

export default User;

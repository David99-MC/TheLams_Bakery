import { Schema, model, Types, Model } from "mongoose";
import { compareSync, genSaltSync, hashSync } from "bcrypt-ts";

type UserType = {
  session: Types.ObjectId;
  fullName: string;
  isAdmin: boolean;
  username: string;
  password: string;
  checkPassword: (rawPassword: string) => boolean;
};

const UserSchema = new Schema<UserType>({
  session: { type: Schema.ObjectId, ref: "session" },
  fullName: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
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

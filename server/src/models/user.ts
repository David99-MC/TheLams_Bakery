import { Schema, model, type Model } from "mongoose";

type UserType = {
  username: string;
  hash: string;
};

const UserSchema = new Schema<UserType>({
  username: { type: String, required: true },
  hash: { type: String, required: true },
});

const User: Model<UserType> = model("user", UserSchema);

export default User;

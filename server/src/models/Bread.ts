import mongoose from "mongoose";

const Schema = mongoose.Schema;
// const ObjectId = mongoose.Types.ObjectId;

const BreadSchema = new Schema({
  ingredient: String,
  type: String,
  dairy: Boolean,
});

const Bread = mongoose.model("Bread", BreadSchema);

export default Bread;

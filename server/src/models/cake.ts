import { Schema, model, type Model } from "mongoose";

export type Cake = {
  _id?: string;
  vietnameseName: string;
  englishName?: string;
  imgUrl?: string;
  unitPrice: number;
  ingredients: string;
  soldOut: boolean;
};

const CakeSchema = new Schema<Cake>({
  vietnameseName: { type: String, required: true },
  englishName: String,
  imgUrl: String,
  unitPrice: { type: Number, required: true },
  ingredients: String,
  soldOut: Boolean,
});

const Cake: Model<Cake> = model("Cake", CakeSchema);

export default Cake;

import mongoose from "mongoose";
import { ProductInterface } from "../types/ProductInterface";

const ProductSchema = new mongoose.Schema<ProductInterface>({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
});

export const Product = mongoose.model("Product", ProductSchema);
import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  color: {
    type: String,
    default: "#ffffff",
  }
});

export const Category = mongoose.model("Category", CategorySchema);
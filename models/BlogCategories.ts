import mongoose, { Schema } from "mongoose";

const BlogCategoriesSchema = new Schema(
  {
    name: { type: String, required: true },
    description: {type: String, required: false},
    image: {type: String, required: false},
  },
  { timestamps: true }
);

export default mongoose.models.BlogCategories ||
  mongoose.model("BlogCategories", BlogCategoriesSchema);
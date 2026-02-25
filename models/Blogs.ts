import mongoose, { Schema } from "mongoose";
import { MetadataSchema } from "./Pages";

const BlogsSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    html: { type: String, required: true },
    metadata: { type: [MetadataSchema], required: false },
    category: { type: [mongoose.Types.ObjectId], ref: "BlogCategories", required: false },
  },
  { timestamps: true }
);

export default mongoose.models.Blogs ||
  mongoose.model("Blogs", BlogsSchema);
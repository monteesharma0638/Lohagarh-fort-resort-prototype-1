import mongoose, { Schema } from "mongoose";
import { MetadataSchema } from "./Pages";

const BlogsSchema = new Schema(
  {
    slug: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    status: { type: String, enum: ["draft", "published"], default: "draft", required: true},
    blocks: { type: String, required: true },
    metadata: { type: [MetadataSchema], required: false },
    category: { type: mongoose.Types.ObjectId, ref: "BlogCategories", required: false },
  },
  { timestamps: true }
);

export default mongoose.models.Blogs ||
  mongoose.model("Blogs", BlogsSchema);
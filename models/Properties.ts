import mongoose, { Schema } from "mongoose";

const PropertiesSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    type: { type: String, enum: ["Hotel", "Resort"], required: false, default: "Hotel" },
  },
  { timestamps: true }
);

export default mongoose.models.Properties ||
  mongoose.model("Properties", PropertiesSchema);
import mongoose, { Schema } from "mongoose";
import { title } from "process";

const SectionSchema = new Schema(
  {
    htmlTagId: { type: String, required: true },
    text: { type: String, unique: true, required: false },
    image: { type: String, required: false },
  },
  { timestamps: false }
);

export const MetadataSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: false }
);

const PagesSchema = new Schema(
  {
    title: { type: String, required: true },
    route: { type: String, required: true, unique: true },
    nestedPages: { type: [Schema.Types.ObjectId], ref: "Pages", default: [] },
    metadata: [MetadataSchema],
    sections: [SectionSchema]
  },
  { timestamps: true }
);

export default mongoose.models.Pages ||
  mongoose.model("Pages", PagesSchema);
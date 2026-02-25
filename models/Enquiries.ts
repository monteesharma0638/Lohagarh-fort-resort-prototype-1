import mongoose, { Schema } from "mongoose";

const EnquiriesSchema = new Schema(
  {
    email: { type: String, required: true },
    description: { type: String, required: true },
    queryTime: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.models.Enquiries ||
  mongoose.model("Enquiries", EnquiriesSchema);
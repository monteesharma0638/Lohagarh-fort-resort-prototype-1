import mongoose, { Schema } from "mongoose";

const UserActivitiesSchema = new Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: "Users", required: true },
    operation: { type: String, enum: ["create", "update", "delete"], required: true },
    collectionName: { type: String, enum: ["Blogs", "BlogCategories", "Properties"], required: true },
    documentIds: { type: [mongoose.Schema.ObjectId], required: true },
    changeSummary: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.models.UserActivities ||
  mongoose.model("UserActivities", UserActivitiesSchema);
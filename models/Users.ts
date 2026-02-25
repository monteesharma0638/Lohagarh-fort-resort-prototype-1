import mongoose, { Schema } from "mongoose";

const UsersSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    access: { type: String, enum: ["super-admin", "blog-edits", "page-content", "admin"], default: "blog-edits" },
    lastLogin: {type: Date, default: Date.now},
    TotalLogins: {type: Number, default: 0}
  },
  { timestamps: true }
);

export default mongoose.models.Users ||
  mongoose.model("Users", UsersSchema);
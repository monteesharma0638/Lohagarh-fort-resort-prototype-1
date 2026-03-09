import Properties from "@/models/Properties";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;

  await mongoose.connect(MONGODB_URI);
}

export async function getHotel(id: string) {
  await connectDB();
  const result = await Properties.findOne({id}).select("-_id -_v").lean();

  return result;
}
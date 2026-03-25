import Locations from "@/models/Locations";
import Pages from "@/models/Pages";
import Properties from "@/models/Properties";
import mongoose from "mongoose";
import weddings from "@/data/wedding-experiences.json";

const MONGODB_URI = process.env.MONGODB_URI!;
const DB_NAME = process.env.DB_NAME!;

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;

  await mongoose.connect(MONGODB_URI, {
    dbName: DB_NAME
  });
}

export async function getHotel(id: string) {
  await connectDB();
  const result = await Properties.findOne({id}).select("-_id -_v").lean();

  return result;
}

export async function getLocations(city: string) {
  await connectDB();
  const result = await Locations.findOne({city}).select("-_id -_v").lean();

  return result;
}

export async function getHotels() {
  await connectDB();
  const result = await Properties.find().select("-_id -_v").lean();

  return result;
}

export async function getPageDataByRoute (route: string) {
  await connectDB();
  const result = await Pages.findOne({route}).select("-_id -_v").lean();

  return result;
}

export async function getWeddings() {
  return weddings;
}

export async function getWeddingGallery(id: number) {
  return weddings.find(wedding => wedding.id == id);
}
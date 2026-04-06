import Locations from "@/models/Locations";
import Pages from "@/models/Pages";
import Properties from "@/models/Properties";
import mongoose from "mongoose";
import weddings from "@/data/wedding-experiences.json";
import { cache } from 'react';
import { unstable_cache } from "next/cache";

const MONGODB_URI = process.env.MONGODB_URI!;
const DB_NAME = process.env.DB_NAME!;

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;

  await mongoose.connect(MONGODB_URI, {
    dbName: DB_NAME
  });
}

export const getHotel = cache(unstable_cache(
  async (id: string) => {
    console.log("------- DATABASE HIT FOR ID:", id);
    await connectDB();
    return await Properties.findOne({ id }).select("-_id -__v").lean();
  },
  [`hotel-details`], // Cache Key
  { 
    revalidate: 3600, // Cache for 1 hour (in seconds)
    tags: ['hotels']  // Tag for manual invalidation
  }
));

export async function getLocations(city: string) {
  await connectDB();
  const result = await Locations.findOne({city}).select("-_id -_v").lean();

  return result;
}

export async function getHotels() {
  await connectDB();
  const result = await Properties.find().sort("priority").select("-_id -_v").lean();

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

export async function getTestimonials(id: string) {
  await connectDB();

  return Properties.findOne({id}).select("testimonials -_id").lean();
}

export async function getAllTestimonials() {
  await connectDB();
  const results = await Properties.aggregate([
      // 1. Extract and limit reviews from each document
      {
        $project: {
          reviews: { $slice: ["$testimonials", 5] } 
        }
      },
      // 2. Flatten the arrays from all documents into individual documents
      { $unwind: "$reviews" },
      // 3. Replace the root to make the review object the main document
      { $replaceRoot: { newRoot: "$reviews" } },
      // 4. Randomly shuffle the entire resulting set
      { $sample: { size: 100 } } // Adjust size to the total max expected
    ]);
  return results;
}
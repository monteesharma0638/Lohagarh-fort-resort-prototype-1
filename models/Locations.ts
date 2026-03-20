import mongoose, { Schema } from "mongoose";


const LocationsSchema = new Schema(
  {
    city: String,
    description: String,
    locations: [
        {
            title: String,
            description: String,
            distance: String,
            image: String
        }
    ]
  },
  { timestamps: false, strict: false }
);

export default mongoose.models.Locations ||
  mongoose.model("Locations", LocationsSchema);
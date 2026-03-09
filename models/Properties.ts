import mongoose, { Schema } from "mongoose";

const CardSchema = new Schema({
  title: String,
  content: String,
  description: String,
  highlight: String,
  badge: String,
  heading: String,
  capacity: String,
  distance: String,
});

const ImageSchema = new Schema({
  title: String,
  src: String,
});

const ReviewSchema = new Schema({
  name: String,
  time: String,
  rating: Number,
  description: String,
});

const DiningSchema = new Schema({
  coverImage: String,
  heading: String,
  content: String,
  cards: [CardSchema],
});

const SpaSalonSchema = new Schema({
  title: String,
  content: String,
  cards: [CardSchema],
});

const PhotoGallerySchema = new Schema({
  content: String,
  images: [ImageSchema],
});

const ContactSchema = new Schema({
  description: String,
  address: String,
  phone: String,
  email: String,
  frontDesk: String,
});

const GuestReviewSchema = new Schema({
  overall: Number,
  reviews: [ReviewSchema],
});

const OfferSchema = new Schema({
  title: String,
  description: String,
  cards: [CardSchema],
});

const SectionWithCardsSchema = new Schema({
  title: String,
  description: String,
  cards: [CardSchema],
});

const ExploreSchema = new Schema({
  description: String,
  cards: [CardSchema],
});

const PropertiesSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: String,
    location: String,
    image: String,
    coverImage: String,

    gallery: [String],
    captions: [String],

    description: String,
    price: String,
    category: String,
    featured: Boolean,

    amenities: [String],
    rating: Number,

    dining: DiningSchema,

    spaSalon: SpaSalonSchema,

    photoGallery: PhotoGallerySchema,

    contactUs: ContactSchema,

    guestReviews: GuestReviewSchema,

    offers: OfferSchema,

    weddingVenues: SectionWithCardsSchema,

    royalWedding: SectionWithCardsSchema,

    explore: ExploreSchema,
  },
  { timestamps: true, strict: false }
);

export default mongoose.models.Properties ||
  mongoose.model("Properties", PropertiesSchema);
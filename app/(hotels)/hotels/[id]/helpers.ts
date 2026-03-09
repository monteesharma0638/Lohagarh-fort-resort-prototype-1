import hotelsData from "@/data/hotels.json";

export async function getHotel(id: string) {
  return hotelsData.find((h) => h.id === id);
}

const weddingHotels = ["lohagarh-fort-resort", "the-lohagarh-palace", "kothi-lohagarh", "townhall-restaurant-events"];

export function hasWeddingPages(id: string) {
  return weddingHotels.includes(id);
}

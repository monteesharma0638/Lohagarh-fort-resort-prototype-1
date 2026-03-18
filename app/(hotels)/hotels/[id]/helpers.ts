import hotelsData from "@/data/hotels.json";

export async function getHotel(id: string) {
  return hotelsData.find((h) => h.id === id);
}

const weddingHotels = ["lohagarh-fort-resort", "kothi-lohagarh", "townhall"];

export function hasWeddingPages(id: string) {
  return weddingHotels.includes(id);
}

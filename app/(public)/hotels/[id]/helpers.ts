import hotelsData from "../hotels.json";

export function getHotel(id: string) {
  return hotelsData.find((h) => h.id === id);
}

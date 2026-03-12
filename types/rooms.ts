export type Room = {
  id: string;
  name: string;
  type: string;
  size: number;
  occupancy: number;
  beds: string;
  price: number;
  description: string;
  amenities: string[];
  features: string[];
  images: string[];
};

export type RoomsData = Record<string, Room[]>;

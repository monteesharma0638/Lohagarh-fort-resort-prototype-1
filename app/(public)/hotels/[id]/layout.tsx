import HotelNavbar from "@/components/HotelNavbar";
import hotelsData from "../hotels.json";

const weddingHotels = ["lohagarh-fort-resort", "the-lohagarh-palace", "kothi-lohagarh", "townhall-restaurant-events"];

export default async function HotelLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const hotel = hotelsData.find((h) => h.id === id);
  const hotelName = hotel?.name || "Hotel";
  const hasWedding = weddingHotels.includes(id);

  return (
    <div className="hotel-detail-page">
      <HotelNavbar hotelId={id} hotelName={hotelName} hasWedding={hasWedding} />
      {children}
    </div>
  );
}

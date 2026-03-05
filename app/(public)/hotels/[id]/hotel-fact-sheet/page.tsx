import HotelSubPage from "@/components/HotelSubPage";
import { getHotel } from "../helpers";

export default async function HotelFactSheetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const hotel = getHotel(id);
  if (!hotel) return <div className="min-h-screen flex items-center justify-center">Hotel not found</div>;

  const facts = [
    { label: "Property Name", value: hotel.name },
    { label: "Location", value: hotel.location },
    { label: "Category", value: hotel.category },
    { label: "Rating", value: `${hotel.rating} / 5` },
    { label: "Starting Price", value: `₹${hotel.price} / Night` },
    { label: "Check-in Time", value: "2:00 PM" },
    { label: "Check-out Time", value: "11:00 AM" },
    { label: "Total Rooms", value: "To be updated" },
    { label: "Dining Options", value: "Multi-cuisine restaurant, Room service" },
    { label: "Banquet Capacity", value: "Up to 500 guests" },
    { label: "Parking", value: "Complimentary valet parking" },
    { label: "Wi-Fi", value: "Complimentary high-speed internet" },
    { label: "Pet Policy", value: "Pets not allowed" },
    { label: "Nearest Airport", value: "To be updated" },
    { label: "Nearest Railway Station", value: "To be updated" },
  ];

  return (
    <HotelSubPage
      hotelName={hotel.name}
      hotelLocation={hotel.location}
      hotelImage={hotel.coverImage ?? hotel.image}
      hotelId={id}
      pageTitle="Hotel Fact Sheet"
      pageSubtitle={hotel.name}
    >
      <div>
        <h2 className="text-3xl font-serif text-foreground mb-6">At a Glance</h2>
        <p className="text-foreground/70 text-lg leading-relaxed mb-12">
          Everything you need to know about {hotel.name} at a glance.
        </p>

        <div className="border border-border">
          {facts.map((fact, idx) => (
            <div
              key={idx}
              className={`flex items-center py-4 px-6 ${idx !== facts.length - 1 ? "border-b border-border" : ""} ${idx % 2 === 0 ? "bg-card" : ""}`}
            >
              <span className="w-1/3 text-xs uppercase tracking-wider font-bold text-foreground/50">{fact.label}</span>
              <span className="w-2/3 text-foreground">{fact.value}</span>
            </div>
          ))}
        </div>
      </div>
    </HotelSubPage>
  );
}

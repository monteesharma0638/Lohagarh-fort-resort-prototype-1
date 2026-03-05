import HotelSubPage from "@/components/HotelSubPage";
import { getHotel } from "../helpers";
import { MapPin } from "lucide-react";

export default async function ExplorePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const hotel = getHotel(id);
  if (!hotel) return <div className="min-h-screen flex items-center justify-center">Hotel not found</div>;

  const cityName = hotel.location.split(",")[0].trim();

  const attractions = [
    { name: `${cityName} City Palace`, distance: "12 km", description: "A magnificent blend of Rajasthani and Mughal architecture." },
    { name: "Local Heritage Market", distance: "8 km", description: "Explore traditional handicrafts, textiles, and jewelry." },
    { name: "Ancient Fort", distance: "15 km", description: "A historic fort offering panoramic views of the surrounding landscape." },
    { name: "Wildlife Sanctuary", distance: "20 km", description: "Home to diverse flora and fauna, ideal for nature walks and safaris." },
  ];

  return (
    <HotelSubPage
      hotelName={hotel.name}
      hotelLocation={hotel.location}
      hotelImage={hotel.coverImage ?? hotel.image}
      hotelId={id}
      pageTitle={`Explore ${cityName}`}
      pageSubtitle={hotel.name}
    >
      <div>
        <h2 className="text-3xl font-serif text-foreground mb-6">Discover {cityName}</h2>
        <p className="text-foreground/70 text-lg leading-relaxed mb-12">
          Beyond the walls of {hotel.name}, a world of heritage, culture, and natural beauty awaits.
          Explore the best that {cityName} has to offer.
        </p>
        <div className="space-y-6">
          {attractions.map((attraction, idx) => (
            <div key={idx} className="flex items-start gap-6 border border-border p-6 hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-serif text-foreground">{attraction.name}</h3>
                  <span className="text-primary text-xs font-bold tracking-wider">{attraction.distance}</span>
                </div>
                <p className="text-foreground/60 text-sm">{attraction.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </HotelSubPage>
  );
}

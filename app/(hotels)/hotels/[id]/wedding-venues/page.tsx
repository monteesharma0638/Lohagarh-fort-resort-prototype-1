import HotelSubPage from "@/components/HotelSubPage";
import { getHotel, hasWeddingPages } from "../helpers";

export default async function WeddingVenuesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const hotel = await getHotel(id);
  if (!hotel) return <div className="min-h-screen flex items-center justify-center">Hotel not found</div>;

  const venues = [
    { name: "The Grand Courtyard", capacity: "500+ Guests", description: "An expansive open-air courtyard set against the backdrop of historic fort walls, perfect for grand celebrations." },
    { name: "Royal Banquet Hall", capacity: "250 Guests", description: "An elegant indoor venue adorned with traditional Rajasthani artwork and crystal chandeliers." },
    { name: "Poolside Lawns", capacity: "300 Guests", description: "Lush green lawns surrounding the pool area, ideal for evening cocktails and mehendi ceremonies." },
  ];

  return (
    <HotelSubPage
      hotelName={hotel.name}
      hotelLocation={hotel.location}
      hotelImage={hotel.coverImage ?? hotel.image}
      hotelId={id}
      pageTitle="Wedding Venues"
      pageSubtitle={hotel.name}
      hasWedding={hasWeddingPages(id)}
    >
      <div>
        <h2 className="text-3xl font-serif text-foreground mb-6">Celebrate in Royal Splendor</h2>
        <p className="text-foreground/70 text-lg leading-relaxed mb-12">
          Host your dream wedding at {hotel.name}. Our magnificent venues provide the perfect setting
          for every ceremony, from intimate gatherings to grand celebrations.
        </p>
        <div className="space-y-8">
          {venues.map((venue, idx) => (
            <div key={idx} className="border border-border p-8 flex flex-col md:flex-row gap-8">
              <div className="md:w-2/3">
                <h3 className="text-2xl font-serif text-foreground mb-3">{venue.name}</h3>
                <p className="text-foreground/60 leading-relaxed mb-4">{venue.description}</p>
                <button className="text-primary text-xs tracking-widest uppercase font-bold hover:underline">Enquire Now</button>
              </div>
              <div className="md:w-1/3 flex items-center justify-center border-l border-border pl-8">
                <div className="text-center">
                  <p className="text-foreground/40 text-xs uppercase tracking-wider mb-1">Capacity</p>
                  <p className="text-2xl font-serif text-primary">{venue.capacity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </HotelSubPage>
  );
}

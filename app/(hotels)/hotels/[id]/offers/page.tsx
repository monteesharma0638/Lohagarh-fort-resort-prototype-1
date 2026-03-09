import HotelSubPage from "@/components/HotelSubPage";
import { getHotel, hasWeddingPages } from "../helpers";

export default async function OffersPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const hotel = await getHotel(id);
  if (!hotel) return <div className="min-h-screen flex items-center justify-center">Hotel not found</div>;

  const offers = [
    { title: "Early Bird Special", description: "Book 30 days in advance and save up to 25% on your stay.", tag: "25% Off" },
    { title: "Weekend Getaway", description: "Enjoy a luxurious weekend escape with complimentary breakfast and spa credits.", tag: "Special" },
    { title: "Honeymoon Package", description: "Celebrate your love with a romantic package including candlelight dinner and room decoration.", tag: "Couples" },
  ];

  return (
    <HotelSubPage
      hotelName={hotel.name}
      hotelLocation={hotel.location}
      hotelImage={hotel.coverImage ?? hotel.image}
      hotelId={id}
      pageTitle="Offers"
      pageSubtitle={hotel.name}
      hasWedding={hasWeddingPages(id)}
    >
      <div>
        <h2 className="text-3xl font-serif text-foreground mb-6">Special Offers & Packages</h2>
        <p className="text-foreground/70 text-lg leading-relaxed mb-12">
          Take advantage of our exclusive offers and make your stay at {hotel.name} even more memorable.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((offer, idx) => (
            <div key={idx} className="border border-border p-8 hover:border-primary/30 transition-colors">
              <span className="inline-block bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase px-3 py-1 mb-4">{offer.tag}</span>
              <h3 className="text-xl font-serif text-foreground mb-3">{offer.title}</h3>
              <p className="text-foreground/60 text-sm leading-relaxed mb-6">{offer.description}</p>
              <button className="text-primary text-xs tracking-widest uppercase font-bold hover:underline">View Details</button>
            </div>
          ))}
        </div>
      </div>
    </HotelSubPage>
  );
}

import HotelSubPage from "@/components/HotelSubPage";
import { getHotel, hasWeddingPages } from "../helpers";

export default async function SpaSalonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const hotel = await getHotel(id);
  if (!hotel) return <div className="min-h-screen flex items-center justify-center">Hotel not found</div>;

  return (
    <HotelSubPage
      hotelName={hotel.name}
      hotelLocation={hotel.location}
      hotelImage={hotel.coverImage ?? hotel.image}
      hotelId={id}
      pageTitle="Spa & Salon"
      pageSubtitle={hotel.name}
      hasWedding={hasWeddingPages(id)}
    >
      <div>
        <h2 className="text-3xl font-serif text-foreground mb-6">Wellness & Rejuvenation</h2>
        <p className="text-foreground/70 text-lg leading-relaxed mb-8">
          Immerse yourself in ancient Ayurvedic healing traditions at our spa. Our expert therapists
          blend traditional techniques with modern wellness practices to rejuvenate your body, mind, and soul.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {["Ayurvedic Massage", "Aromatherapy", "Royal Bath Ritual", "Yoga Sessions", "Beauty Salon", "Meditation"].map((service) => (
            <div key={service} className="border border-border p-6 text-center hover:border-primary/30 transition-colors">
              <h3 className="text-lg font-serif text-foreground mb-2">{service}</h3>
              <p className="text-foreground/50 text-sm">Experience traditional healing</p>
            </div>
          ))}
        </div>
      </div>
    </HotelSubPage>
  );
}

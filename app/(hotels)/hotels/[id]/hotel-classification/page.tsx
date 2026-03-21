import HotelSubPage from "@/components/HotelSubPage";
import { hasWeddingPages } from "../helpers";
import { Star, Award, Shield } from "lucide-react";
import { getHotel } from "@/lib/db";

export default async function HotelClassificationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const hotel = await getHotel(id);
  if (!hotel) return <div className="min-h-screen flex items-center justify-center">Hotel not found</div>;

  return (
    <HotelSubPage
      hotelName={hotel.name}
      hotelLocation={hotel.location}
      hotelImage={hotel.coverImage ?? hotel.image}
      hotelId={id}
      pageTitle="Hotel Classification"
      pageSubtitle={hotel.name}
      hasWedding={hotel.hasWedding}
      hasSpa={!!hotel.spa}
    >
      <div>
        <h2 className="text-3xl font-serif text-foreground mb-6">Classification & Standards</h2>
        <p className="text-foreground/70 text-lg leading-relaxed mb-12">
          {hotel.name} is classified as a premium heritage property, meeting the highest standards
          of luxury hospitality as set by the Ministry of Tourism, Government of India.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="border border-border p-8 text-center">
            <Star className="text-primary mx-auto mb-4" size={32} />
            <h3 className="text-xl font-serif text-foreground mb-2">5-Star Heritage</h3>
            <p className="text-foreground/50 text-sm">Classified heritage property</p>
          </div>
          <div className="border border-border p-8 text-center">
            <Award className="text-primary mx-auto mb-4" size={32} />
            <h3 className="text-xl font-serif text-foreground mb-2">FHRAI Approved</h3>
            <p className="text-foreground/50 text-sm">Federation of Hotel & Restaurant Associations</p>
          </div>
          <div className="border border-border p-8 text-center">
            <Shield className="text-primary mx-auto mb-4" size={32} />
            <h3 className="text-xl font-serif text-foreground mb-2">Safety Certified</h3>
            <p className="text-foreground/50 text-sm">Meets all safety and hygiene standards</p>
          </div>
        </div>
      </div>
    </HotelSubPage>
  );
}

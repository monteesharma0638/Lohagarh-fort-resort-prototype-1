import HotelSubPage from "@/components/HotelSubPage";
import { getHotel, hasWeddingPages } from "../helpers";

export default async function RoyalWeddingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const hotel = getHotel(id);
  if (!hotel) return <div className="min-h-screen flex items-center justify-center">Hotel not found</div>;

  return (
    <HotelSubPage
      hotelName={hotel.name}
      hotelLocation={hotel.location}
      hotelImage={hotel.coverImage ?? hotel.image}
      hotelId={id}
      pageTitle="Royal Wedding"
      pageSubtitle={hotel.name}
      hasWedding={hasWeddingPages(id)}
    >
      <div>
        <h2 className="text-3xl font-serif text-foreground mb-6">A Wedding Fit for Royalty</h2>
        <p className="text-foreground/70 text-lg leading-relaxed mb-8">
          Let us craft a wedding celebration that echoes the grandeur of Rajasthani royalty. From the
          majestic baraat procession to the intimate pheras ceremony, every moment is choreographed
          to perfection at {hotel.name}.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
          {[
            { title: "Royal Baraat", description: "Grand procession with decorated elephants, horses, and traditional band." },
            { title: "Mandap Ceremony", description: "Beautifully decorated mandap with floral arrangements and heritage elements." },
            { title: "Mehendi & Sangeet", description: "Vibrant celebrations with live music, dance, and traditional rituals." },
            { title: "Royal Feast", description: "Multi-course banquet featuring authentic Rajasthani and pan-Indian cuisine." },
          ].map((item, idx) => (
            <div key={idx} className="border border-border p-8">
              <h3 className="text-xl font-serif text-foreground mb-3">{item.title}</h3>
              <p className="text-foreground/60 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#1E0800] text-white p-12 text-center mt-12">
          <h3 className="text-2xl font-serif mb-4">Plan Your Royal Wedding</h3>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">Contact our wedding specialists to begin planning the celebration of a lifetime.</p>
          <button className="bg-primary text-white px-10 py-4 text-xs tracking-widest uppercase font-bold hover:bg-primary/90 transition-colors">
            Get in Touch
          </button>
        </div>
      </div>
    </HotelSubPage>
  );
}

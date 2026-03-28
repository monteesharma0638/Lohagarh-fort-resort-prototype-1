import HotelSubPage from "@/components/HotelSubPage";
import { hasWeddingPages } from "../helpers";
import HotelGallery from "@/components/HotelGallery";
import { getHotel } from "@/lib/db";

export default async function HotelGalleryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const hotel = await getHotel(id);
  console.log("🚀 ~ HotelGalleryPage ~ hotel:", hotel)
  
  if (!hotel) return <div className="min-h-screen flex items-center justify-center">Hotel not found</div>;

  const gallery = hotel?.gallery || [];

  return (
    <HotelSubPage
      hotelName={hotel.name}
      hotelLocation={hotel.location}
      hotelImage={hotel.coverImage ?? hotel.image}
      hotelId={id}
      pageTitle="Gallery"
      pageSubtitle={hotel.name}
      hasWedding={hotel.hasWedding}
      hasSpa={!!hotel.spa}
    >
      <div>
        <h2 className="text-3xl font-serif text-foreground mb-6">Photo Gallery</h2>
        <p className="text-foreground/70 text-lg leading-relaxed mb-12">
          Explore the beauty and grandeur of {hotel.name} through our curated photo gallery.
        </p>
        
        {gallery.length > 0 ? (
          <HotelGallery gallery={gallery} hotelName={hotel.name} />
        ) : (
          <p className="text-foreground/50 text-center py-16">Gallery coming soon.</p>
        )}
      </div>
    </HotelSubPage>
  );
}
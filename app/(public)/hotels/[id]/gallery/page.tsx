import HotelSubPage from "@/components/HotelSubPage";
import { getHotel } from "../helpers";
import Image from "next/image";

export default async function HotelGalleryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const hotel = getHotel(id);
  if (!hotel) return <div className="min-h-screen flex items-center justify-center">Hotel not found</div>;

  const gallery = hotel.gallery || [];

  return (
    <HotelSubPage
      hotelName={hotel.name}
      hotelLocation={hotel.location}
      hotelImage={hotel.coverImage ?? hotel.image}
      hotelId={id}
      pageTitle="Gallery"
      pageSubtitle={hotel.name}
    >
      <div>
        <h2 className="text-3xl font-serif text-foreground mb-6">Photo Gallery</h2>
        <p className="text-foreground/70 text-lg leading-relaxed mb-12">
          Explore the beauty and grandeur of {hotel.name} through our curated photo gallery.
        </p>
        {gallery.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((img, idx) => (
              <div key={idx} className="relative aspect-[4/3] overflow-hidden group">
                <Image
                  src={img}
                  alt={`${hotel.name} gallery ${idx + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-foreground/50 text-center py-16">Gallery coming soon.</p>
        )}
      </div>
    </HotelSubPage>
  );
}

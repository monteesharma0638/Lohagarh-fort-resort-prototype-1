import { Wifi, Coffee, MapPin, Star, Calendar } from "lucide-react";
import MotionDiv from "@/components/MotionDiv";
import HotelBreadcrumb from "@/components/HotelBreadcrumb";
import hotelsData from "../hotels.json";
import Image from "next/image";

export default async function HotelOverview({params}: {params: Promise<{id: string}>}) {
  const id = (await params).id;
  const hotel = hotelsData.find(h => h.id === id);

  if (!hotel) {
    return <div className="min-h-screen flex items-center justify-center text-foreground font-serif text-3xl">Hotel not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[70vh]">
        <Image src={hotel.coverImage ?? hotel.image} alt={hotel.name} className="object-cover" fill priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
        <div className="absolute top-28 left-0 right-0 px-8 md:px-16">
          <div className="container mx-auto">
            <HotelBreadcrumb
              items={[
                { label: "Hotels", href: "/hotels" },
                { label: hotel.name },
              ]}
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="container mx-auto">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4 text-primary text-sm tracking-widest uppercase font-bold">
                <MapPin size={16} /> {hotel.location}
              </div>
              <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 hero-text-shadow">{hotel.name}</h1>
              <div className="flex items-center gap-6">
                <span className="text-2xl font-serif text-white">₹{hotel.price} <span className="text-sm font-sans text-white/60">/ Night</span></span>
                <div className="flex items-center gap-1 bg-primary text-white px-3 py-1 text-sm font-bold">
                  <Star size={14} fill="white" /> {hotel.rating}
                </div>
              </div>
            </MotionDiv>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-serif mb-6 text-foreground">{hotel.title || "About the Hotel"}</h2>
            <p className="text-foreground/70 text-lg leading-relaxed mb-12 font-light">
              {hotel.description}
            </p>

            <h3 className="text-2xl font-serif mb-6 text-foreground">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
              {hotel.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-3 text-foreground/70 border border-border p-4">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  {amenity}
                </div>
              ))}
            </div>

            {hotel.gallery && hotel.gallery.length > 0 && (
              <>
                <h3 className="text-2xl font-serif mb-6 text-foreground">Gallery Preview</h3>
                <div className="grid grid-cols-2 gap-4">
                  {hotel.gallery.slice(0, 4).map((img, idx) => (
                    <div key={idx} className="relative aspect-video overflow-hidden group">
                      <Image
                        src={img}
                        alt={`${hotel.name} gallery ${idx + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card p-8 sticky top-32 border border-border shadow-sm">
              <h3 className="text-xl font-serif mb-6 text-foreground">Book Your Stay</h3>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-foreground/50 mb-2">Check In</label>
                  <div className="flex items-center border border-border bg-background p-3">
                    <Calendar size={16} className="text-foreground/40 mr-2" />
                    <input type="date" className="w-full outline-none text-sm bg-transparent" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-foreground/50 mb-2">Check Out</label>
                  <div className="flex items-center border border-border bg-background p-3">
                    <Calendar size={16} className="text-foreground/40 mr-2" />
                    <input type="date" className="w-full outline-none text-sm bg-transparent" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-foreground/50 mb-2">Guests</label>
                  <select className="w-full border border-border bg-background p-3 outline-none text-sm">
                    <option>2 Adults, 0 Children</option>
                    <option>2 Adults, 1 Child</option>
                    <option>1 Adult</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6 pt-6 border-t border-border">
                <span className="text-foreground/60">Total (1 Night)</span>
                <span className="font-bold text-lg text-foreground">₹{hotel.price}</span>
              </div>

              <button className="w-full bg-primary text-white py-4 text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors font-bold">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

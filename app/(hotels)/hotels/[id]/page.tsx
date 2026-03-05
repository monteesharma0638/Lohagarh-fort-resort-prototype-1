import { Wifi, Coffee, MapPin, Star, Calendar } from "lucide-react";
import MotionDiv from "@/components/MotionDiv";
import HotelBreadcrumb from "@/components/HotelBreadcrumb";
import HotelNavbar from "@/components/HotelNavbar";
import hotelsData from "../hotels.json";
import Image from "next/image";
import { hasWeddingPages } from "./helpers";

export default async function HotelOverview({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const hotel = hotelsData.find((h) => h.id === id);

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center text-foreground font-serif text-3xl">
        Hotel not found
      </div>
    );
  }

  const hasWedding = hasWeddingPages(id);

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[100vh]">
        <Image
          src={hotel.coverImage ?? hotel.image}
          alt={hotel.name}
          className="object-cover"
          fill
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
        <div className="absolute top-28 left-0 right-0 px-8 md:px-16">
          <div className="container mx-auto flex justify-left align-center min-h-[20px]">
            <HotelNavbar
              hotelId={id}
              hotelName={hotel.name}
              hasWedding={hasWedding}
            />
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
              <div className="hidden md:flex items-center gap-2 mb-4 text-white text-sm tracking-widest uppercase font-bold">
                <MapPin size={16} /> {hotel.location}
              </div>
              <h1 className="text-3xl md:text-7xl font-serif text-white mb-6 hero-text-shadow">
                {hotel.name}
              </h1>
              <div className="flex items-center gap-6">
                <span className="text-2xl font-serif text-white">
                  ₹{hotel.price}{" "}
                  <span className="text-sm font-sans text-white/60">
                    / Night
                  </span>
                </span>
                <div className="flex items-center gap-1 bg-primary text-white px-3 py-1 text-sm font-bold">
                  <Star size={14} fill="white" /> {hotel.rating}
                </div>
              </div>
            </MotionDiv>
          </div>
          <div className="lg:col-span-1 mt-4 bg-gradient-to-t from-black/70 via-black/30 to-black/20">
            <div className="bg-card p-4 md:p-5 sticky top-32 border border-border shadow-sm">
              {/* Heading */}

              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
                {/* Check In */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-foreground/50 mb-1">
                    Check In
                  </label>
                  <div className="flex items-center border border-border bg-background px-2 py-2">
                    <Calendar size={14} className="text-foreground/40 mr-1" />
                    <input
                      type="date"
                      className="w-full outline-none text-sm bg-transparent"
                    />
                  </div>
                </div>

                {/* Check Out */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-foreground/50 mb-1">
                    Check Out
                  </label>
                  <div className="flex items-center border border-border bg-background px-2 py-2">
                    <Calendar size={14} className="text-foreground/40 mr-1" />
                    <input
                      type="date"
                      className="w-full outline-none text-sm bg-transparent"
                    />
                  </div>
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-foreground/50 mb-1">
                    Guests
                  </label>
                  <select className="w-full border border-border bg-background px-2 py-2 text-sm outline-none">
                    <option>2 Adults, 0 Children</option>
                    <option>2 Adults, 1 Child</option>
                    <option>1 Adult</option>
                  </select>
                </div>

                {/* Total */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-foreground/50 mb-1">
                    Total
                  </label>
                  <div className="border border-border bg-background px-2 py-2 text-center font-semibold text-sm">
                    ₹{hotel.price}
                  </div>
                </div>

                {/* Button */}
                <div>
                  <button className="bg-primary w-full h-9.5 cursor-pointer text-white py-2 text-xs tracking-widest uppercase hover:bg-primary/90 transition-colors font-bold">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="flex gap-10 items-start">
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-serif mb-6 text-foreground">
                  {hotel.title || "About the Hotel"}
                </h2>
                <p className="text-foreground/70 text-lg leading-relaxed mb-12 font-light">
                  {hotel.description}
                </p>

                <h3 className="text-2xl font-serif mb-6 text-foreground">
                  Amenities
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-12">
                  {hotel.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-foreground/70 border border-border p-4"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      {amenity}
                    </div>
                  ))}
                </div>

                {hotel.gallery && hotel.gallery.length > 0 && (
                  <>
                    <h3 className="text-2xl font-serif mb-6 text-foreground">
                      Gallery Preview
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {hotel.gallery.slice(0, 4).map((img, idx) => (
                        <div
                          key={idx}
                          className="relative aspect-video overflow-hidden group"
                        >
                          <Image
                            src={img}
                            alt={`${hotel.name} gallery ${idx + 1}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

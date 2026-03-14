import { Wifi, Coffee, MapPin, Star, Calendar } from "lucide-react";
import MotionDiv from "@/components/MotionDiv";
import HotelBreadcrumb from "@/components/HotelBreadcrumb";
import HotelNavbar from "@/components/HotelNavbar";
import Image from "next/image";
import { hasWeddingPages } from "./helpers";
import { getHotel } from "@/lib/db";
import HighlightsSection from "@/sections/HighlightsSection";
import HotelInformationSection from "@/sections/HotelInformationSection";
import Link from "next/link";

export default async function HotelOverview({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const hotel = await getHotel(id);

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

      {/* Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex gap-10 items-start">
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-1 gap-12">
              <div className="">
                <h2 className="text-3xl md:text-5xl font-serif mb-6 text-foreground">
                  {hotel.title || "About the Hotel"}
                </h2>
                <p className="text-foreground/70 text-lg leading-relaxed mb-12 font-light">
                  {hotel.description}
                </p>

                {hotel.gallery && hotel.gallery.length > 0 && (
                  <>
                    <h3 className="text-2xl font-serif mb-6 text-foreground">
                      Overview
                    </h3>
                    {/* 1. Added grid-flow-dense to fill gaps and increased to 3 columns for better asymmetry */}
                    <div className="grid grid-cols-2 gap-4 auto-rows-[200px] md:auto-rows-[300px] grid-flow-dense">
                      {hotel.rooms.map((ele: any, idx: number) => {
                        // This creates a repeating pattern:
                        // Item 2 is tall, then Item 4 is tall, then Item 6 is tall, etc.
                        const isTall = idx % 4 === 1 || idx % 4 === 3;

                        return (
                          <Link
                            href={ele.src}
                            target="__blank"
                            key={idx}
                            className={`relative overflow-hidden group rounded-xl ${
                              isTall ? "row-span-2" : "row-span-1"
                            }`}
                          >
                            <Image
                              src={ele.src}
                              alt={`${hotel.name} gallery ${idx + 1}`}
                              fill
                              className="object-cover transition-all duration-500 ease-out group-hover:scale-105 group-hover:blur-[1.5px] group-hover:brightness-75"
                            />

                            {/* Content Overlay */}
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4">
                              <span className="text-white text-center text-lg tracking-[0.2em] font-serif opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                {ele.title || hotel.name}
                              </span>
                            </div>

                            {/* Frame Decoration */}
                            <div className="pointer-events-none absolute inset-0">
                              <span className="absolute top-3 left-1/2 h-[1px] w-0 bg-yellow-400/60 transition-all duration-500 group-hover:w-[80%] group-hover:left-[10%]" />
                              <span className="absolute bottom-3 left-1/2 h-[1px] w-0 bg-yellow-400/60 transition-all duration-500 group-hover:w-[80%] group-hover:left-[10%]" />
                              <span className="absolute left-3 top-1/2 w-[1px] h-0 bg-yellow-400/60 transition-all duration-500 group-hover:h-[80%] group-hover:top-[10%]" />
                              <span className="absolute right-3 top-1/2 w-[1px] h-0 bg-yellow-400/60 transition-all duration-500 group-hover:h-[80%] group-hover:top-[10%]" />
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section */}
      <HotelInformationSection />

      {/* Section */}
      <HighlightsSection />
    </div>
  );
}

import Image from "next/image";
import HotelBreadcrumb from "@/components/HotelBreadcrumb";
import HotelNavbar from "@/components/HotelNavbar";
import RoomsFilter from "@/components/RoomsFilter";
import MotionDiv from "@/components/MotionDiv";
import { getHotel, hasWeddingPages } from "../helpers";
import { MapPin } from "lucide-react";
import roomsData from "@/data/rooms.json";
import type { RoomsData } from "@/types/rooms";

export default async function RoomsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const hotel = await getHotel(id);

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center text-foreground font-serif text-3xl">
        Hotel not found
      </div>
    );
  }

  const rooms = (roomsData as RoomsData)[id] ?? [];
  const hasWedding = hasWeddingPages(id);

  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero ──────────────────────────────────────────── */}
      <div className="relative h-[55vh] min-h-[380px] overflow-hidden">
        {"coverImage" in hotel && hotel.coverImage ? (
          <Image
            src={hotel.coverImage as string}
            alt={hotel.name}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-[#1E0800]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

        <div className="absolute top-28 left-0 right-0 px-8 md:px-16">
          <div className="container mx-auto">
            <HotelBreadcrumb
              items={[
                { label: "Hotels", href: "/hotels" },
                { label: hotel.name, href: `/hotels/${id}` },
                { label: "Rooms & Suites" },
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
              <div className="flex items-center gap-2 mb-3 text-primary text-xs tracking-widest uppercase font-bold">
                <MapPin size={14} /> {hotel.location}
              </div>
              <p className="text-white/60 text-sm tracking-widest uppercase mb-2">{hotel.name}</p>
              <h1 className="text-4xl md:text-6xl font-serif text-white hero-text-shadow">
                Rooms & Suites
              </h1>
            </MotionDiv>
          </div>
        </div>
      </div>

      {/* ── Sidebar + Content ─────────────────────────────── */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex gap-10 items-start">
          <HotelNavbar hotelId={id} hotelName={hotel.name} hasWedding={hasWedding} />

          <div className="flex-1 min-w-0">
            {/* Intro */}
            <div className="mb-10 pb-10 border-b border-border">
              <h2 className="text-3xl font-serif text-foreground mb-3">
                {rooms.length} Accommodation{rooms.length !== 1 ? "s" : ""}
              </h2>
              <p className="text-foreground/65 text-base leading-relaxed max-w-3xl">
                Each room and suite at {hotel.name} is a thoughtfully curated space — blending Rajasthani heritage craftsmanship with the finest contemporary comforts. Choose the accommodation that resonates with your vision of the perfect stay.
              </p>
            </div>

            {rooms.length === 0 ? (
              <div className="text-center py-24 border border-dashed border-border">
                <p className="text-foreground/40 font-serif text-xl mb-2">Coming Soon</p>
                <p className="text-foreground/40 text-sm">Room details for this property are being updated.</p>
              </div>
            ) : (
              <RoomsFilter rooms={rooms} hotelId={id} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import HotelBreadcrumb from "./HotelBreadcrumb";
import MotionDiv from "./MotionDiv";
import { MapPin } from "lucide-react";

interface HotelSubPageProps {
  hotelName: string;
  hotelLocation: string;
  hotelImage: string;
  hotelId: string;
  pageTitle: string;
  pageSubtitle?: string;
  children: React.ReactNode;
}

export default function HotelSubPage({
  hotelName,
  hotelLocation,
  hotelImage,
  hotelId,
  pageTitle,
  pageSubtitle,
  children,
}: HotelSubPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[50vh] min-h-[350px]">
        <Image src={hotelImage} alt={hotelName} className="object-cover" fill priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
        <div className="absolute top-28 left-0 right-0 px-8 md:px-16">
          <div className="container mx-auto">
            <HotelBreadcrumb
              items={[
                { label: "Hotels", href: "/hotels" },
                { label: hotelName, href: `/hotels/${hotelId}` },
                { label: pageTitle },
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
                <MapPin size={14} /> {hotelLocation}
              </div>
              {pageSubtitle && (
                <p className="text-white/60 text-sm tracking-widest uppercase mb-2">{pageSubtitle}</p>
              )}
              <h1 className="text-4xl md:text-6xl font-serif text-white hero-text-shadow">{pageTitle}</h1>
            </MotionDiv>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 max-w-5xl">
        {children}
      </div>
    </div>
  );
}

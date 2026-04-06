import HotelSubPage from "@/components/HotelSubPage";
import { Star } from "lucide-react";
import { getHotel } from "@/lib/db";
import GoogleReviewsCarousel from "./components/GoogleReviewsCarousel";
import ReviewVideosSection from "./components/ReviewVideosSection";

export default async function GuestReviewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const hotel = await getHotel(id);
  if (!hotel) return <div className="min-h-screen flex items-center justify-center">Hotel not found</div>;

  return (
    <HotelSubPage
      hotelName={hotel.name}
      hotelLocation={hotel.location}
      hotelImage={hotel.coverImage ?? hotel.image}
      hotelId={id}
      pageTitle="Guest Reviews"
      pageSubtitle={hotel.name}
      hasWedding={hotel.hasWedding}
      hasSpa={!!hotel.spa}
      hero={false}
    >
      <GoogleReviewsCarousel reviews={hotel.testimonials.slice(0, 10)} />
      <ReviewVideosSection />
    </HotelSubPage>
  );
}

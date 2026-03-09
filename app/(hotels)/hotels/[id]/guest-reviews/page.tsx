import HotelSubPage from "@/components/HotelSubPage";
import { getHotel, hasWeddingPages } from "../helpers";
import { Star } from "lucide-react";

export default async function GuestReviewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const hotel = await getHotel(id);
  if (!hotel) return <div className="min-h-screen flex items-center justify-center">Hotel not found</div>;

  const reviews = [
    { name: "Rajesh Sharma", rating: 5, text: "An absolutely magnificent experience. The heritage architecture combined with modern luxury made our stay unforgettable.", date: "January 2025" },
    { name: "Priya Mehta", rating: 5, text: "The staff went above and beyond to make our anniversary special. The royal dining experience was exceptional.", date: "December 2024" },
    { name: "Michael Thompson", rating: 4, text: "A truly unique property that captures the essence of Rajasthani royalty. The spa treatments were world-class.", date: "November 2024" },
  ];

  return (
    <HotelSubPage
      hotelName={hotel.name}
      hotelLocation={hotel.location}
      hotelImage={hotel.coverImage ?? hotel.image}
      hotelId={id}
      pageTitle="Guest Reviews"
      pageSubtitle={hotel.name}
      hasWedding={hasWeddingPages(id)}
    >
      <div>
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-1 bg-primary text-white px-4 py-2 font-bold text-lg">
            <Star size={18} fill="white" /> {hotel.rating}
          </div>
          <div>
            <h2 className="text-2xl font-serif text-foreground">Exceptional</h2>
            <p className="text-foreground/50 text-sm">Based on guest reviews</p>
          </div>
        </div>

        <div className="space-y-8">
          {reviews.map((review, idx) => (
            <div key={idx} className="border border-border p-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-bold text-foreground">{review.name}</h4>
                  <p className="text-foreground/40 text-xs">{review.date}</p>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-primary" fill="currentColor" />
                  ))}
                </div>
              </div>
              <p className="text-foreground/70 leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </HotelSubPage>
  );
}

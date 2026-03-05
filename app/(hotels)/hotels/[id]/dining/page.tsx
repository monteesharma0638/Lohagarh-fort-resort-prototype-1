import HotelSubPage from "@/components/HotelSubPage";
import { getHotel, hasWeddingPages } from "../helpers";

export default async function DiningPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const hotel = getHotel(id);
  if (!hotel) return <div className="min-h-screen flex items-center justify-center">Hotel not found</div>;

  return (
    <HotelSubPage
      hotelName={hotel.name}
      hotelLocation={hotel.location}
      hotelImage={hotel.coverImage ?? hotel.image}
      hotelId={id}
      pageTitle="Dining"
      pageSubtitle={hotel.name}
      hasWedding={hasWeddingPages(id)}
    >
      <div className="prose max-w-none">
        <h2 className="text-3xl font-serif text-foreground mb-6">Culinary Heritage</h2>
        <p className="text-foreground/70 text-lg leading-relaxed mb-8">
          Indulge in an exquisite culinary journey at {hotel.name}. Our restaurants offer a curated selection
          of authentic Rajasthani cuisine, pan-Indian delicacies, and international flavors prepared by
          our award-winning chefs using locally sourced ingredients and age-old royal recipes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="border border-border p-8">
            <h3 className="text-xl font-serif text-foreground mb-3">Royal Dining Hall</h3>
            <p className="text-foreground/60 text-sm mb-4">A regal setting for an unforgettable dining experience with traditional Rajasthani thali and more.</p>
            <span className="text-primary text-xs tracking-widest uppercase font-bold">Open for Lunch & Dinner</span>
          </div>
          <div className="border border-border p-8">
            <h3 className="text-xl font-serif text-foreground mb-3">Poolside Kitchen</h3>
            <p className="text-foreground/60 text-sm mb-4">Casual dining by the pool with grills, kebabs, and refreshing beverages under the open sky.</p>
            <span className="text-primary text-xs tracking-widest uppercase font-bold">Open All Day</span>
          </div>
        </div>
      </div>
    </HotelSubPage>
  );
}

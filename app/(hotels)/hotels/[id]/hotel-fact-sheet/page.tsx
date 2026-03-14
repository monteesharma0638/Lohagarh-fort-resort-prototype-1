import HotelSubPage from "@/components/HotelSubPage";
import { getHotel, hasWeddingPages } from "../helpers";
import Image from "next/image";
import { Dot } from "lucide-react";

export default async function HotelFactSheetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const hotel = await getHotel(id);

  if (!hotel) return <div className="min-h-screen flex items-center justify-center">Hotel not found</div>;

  return (
    <HotelSubPage
      hotelName={hotel.name}
      hotelLocation={hotel.location}
      hotelImage={hotel.coverImage ?? hotel.image}
      hotelId={id}
      pageTitle="Hotel Fact Sheet"
      pageSubtitle={hotel.name}
      hasWedding={hasWeddingPages(id)}
    >
      <div className="max-w-5xl mx-auto space-y-16 py-8">
        
        {/* Section 1: Contact & Map Area */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <section>
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary border-b border-border pb-2 mb-4">Contact Information</h3>
              <div className="space-y-2 text-foreground/80 leading-relaxed">
                <p className="font-bold text-foreground">General Manager</p>
                <p>Address: {hotel.location} India</p>
                <p>Telephone: +91 294 2528008</p>
                <p>Email: shivniwaspalace@hrhhotels.com</p>
              </div>
            </section>

            <section>
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary border-b border-border pb-2 mb-4">Access</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-bold">Airport:</p>
                  <br />
                  <p>Sanganer Airport: 28 km</p>
                  <br />
                  <p>Daily flights from New Delhi, Mumbai, Jaipur, Jodhpur, Jaisalmer, Aurangabad (Check seasonal availability and timings)</p>
                </div>
                <div>
                  <p className="font-bold">Railway Station:</p>
                  <p>Jaipur City: 4 km</p>
                </div>
              </div>
            </section>
          </div>
          
          <div className="relative aspect-square bg-muted rounded-lg overflow-hidden border">
             <Image 
                src={"https://res.cloudinary.com/drayl5ppi/image/upload/v1773487114/lohagarh/images/map/Screenshot_2026-03-14_164736_beuxse.png"}
                alt="..."
                fill
             />
          </div>
        </div>

        {/* Section 2: Description */}
        <section className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary border-b border-border pb-2">Description</h3>
            <p className="text-foreground/70 leading-relaxed">
              The crescent-shaped palace, built in the early 20th century during the reign of Maharana Fateh Singh, has been meticulously maintained and preserved. The palace was built specifically to host visiting dignitaries and guests of the House of Mewar.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              Shiv Niwas Palace offers a unique experience of royal hospitality. The suites and rooms are decorated with original furniture and portraits that have been with the family for generations.
            </p>
          </div>
          <div className="relative aspect-video rounded-lg overflow-hidden border">
             <Image src={hotel.image} alt="Palace View" fill className="object-cover" />
          </div>
        </section>

        {/* Section 3: Services & Amenities (The 4-Column Layout) */}
        <section>
          <h3 className="text-sm font-bold uppercase tracking-widest text-primary border-b border-border pb-2 mb-6">Services & Amenities</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-sm mb-3">General</h4>
              <ul className="text-xs space-y-2 text-foreground/70">
                <li>Doctor on call</li>
                <li>Same day laundry</li>
                <li>Money exchange</li>
                <li>Safety lockers</li>
                <li>Travel desk</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-3">In-room</h4>
              <ul className="text-xs space-y-2 text-foreground/70">
                <li>Tea/Coffee maker</li>
                <li>Mini-bar</li>
                <li>Direct dial phone</li>
                <li>Satellite TV</li>
                <li>Hair dryer</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-3">Business</h4>
              <ul className="text-xs space-y-2 text-foreground/70">
                <li>Business center</li>
                <li>Conference facilities</li>
                <li>Secretarial services</li>
                <li>Wi-Fi access</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-3">Recreation</h4>
              <ul className="text-xs space-y-2 text-foreground/70">
                <li>Swimming pool</li>
                <li>Spa & Wellness</li>
                <li>Library</li>
                <li>Squash courts</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Restaurants & Bars (Image Grid) */}
        <section>
          <h3 className="text-sm font-bold uppercase tracking-widest text-primary border-b border-border pb-2 mb-6">Restaurants & Bars</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="border border-border p-3 bg-card flex flex-col">
                <div className="relative aspect-[4/3] mb-3 overflow-hidden">
                  <Image src={hotel.image} alt="Restaurant" fill className="object-cover" />
                </div>
                <h4 className="font-bold text-xs mb-2">Paantya Restaurant</h4>
                <p className="text-[10px] leading-relaxed text-foreground/60 flex-grow">
                  A multi-cuisine restaurant serving breakfast, lunch and dinner with a view of the city.
                </p>
                <p className="text-[10px] font-bold mt-2">Timing: 7:00 AM - 10:30 PM</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Policies */}
        <section className="bg-muted/30 p-8 border border-border">
          <h3 className="text-sm font-bold uppercase tracking-widest text-primary border-b border-border pb-2 mb-4">Check-in/Out Policy</h3>
          <div className="grid md:grid-cols-2 gap-8 text-sm">
            <div>
              <p className="font-bold">Check-in: 14:00 hrs</p>
              <p className="text-foreground/60 italic">Early check-in subject to availability.</p>
            </div>
            <div>
              <p className="font-bold">Check-out: 12:00 hrs</p>
              <p className="text-foreground/60 italic">Late check-out may incur additional charges.</p>
            </div>
          </div>
        </section>
      </div>
    </HotelSubPage>
  );
}
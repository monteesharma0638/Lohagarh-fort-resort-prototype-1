import HotelSubPage from "@/components/HotelSubPage";
import { hasWeddingPages } from "../helpers";
import Image from "next/image";
import { Dot } from "lucide-react";
import { getHotel } from "@/lib/db";
import LocationWidget from "@/components/LocationWidget";

export default async function HotelFactSheetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const hotel = await getHotel(id);

  if (!hotel) return <div className="min-h-screen flex items-center justify-center">Hotel not found</div>;
  const { airportTransport, railTransport, description, servicesAmenities, recreation, resAndBars, checkInPolicy, mapUrl } = hotel;
  return (
    <HotelSubPage
      hotelName={hotel.name}
      hotelLocation={hotel.location}
      hotelImage={hotel.coverImage ?? hotel.image}
      hotelId={id}
      pageTitle="Hotel Fact Sheet"
      pageSubtitle={hotel.name}
      hasWedding={hotel.hasWedding}
      hasSpa={!!hotel.spa}
    >
      <div className="max-w-5xl mx-auto space-y-16 py-8">
        
        {/* Section 1: Contact & Map Area */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <section>
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary border-b border-border pb-2 mb-4">Contact Information</h3>
              <div className="space-y-2 text-foreground/80 leading-relaxed">
                <p className="font-bold text-foreground">General Manager</p>
                <p>Address: {hotel.salesContact.address}</p>
                <p>Telephone: {hotel?.salesContact?.telephone?.join(", ")}</p>
                <p>Email: {hotel.salesContact.email}</p>
              </div>
            </section>

            <section>
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary border-b border-border pb-2 mb-4">Access</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-bold">Airport:</p>
                  <br />
                  <p>{airportTransport?.name}: {airportTransport?.distance}</p>
                  <br />
                  <p>{airportTransport?.note}</p>
                </div>
                <div>
                  <p className="font-bold">Railway Station:</p>
                  <p>{railTransport?.name}: {railTransport?.distance}</p>
                  <br />
                  <p>{railTransport?.note}</p>
                </div>
              </div>
            </section>
          </div>
          
          <div className="relative aspect-square bg-muted rounded-lg overflow-hidden border">
             <LocationWidget mapUrl={mapUrl} />
          </div>
        </div>

        {/* Section 2: Description */}
        <section className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary border-b border-border pb-2">Description</h3>
            <p className="text-foreground/70 leading-relaxed">
              {description}
            </p>
          </div>
          <div className="relative h-100 rounded-lg overflow-hidden border">
             <Image src={hotel.image} alt="Palace View" fill className="object-cover" />
          </div>
        </section>

        {/* Section 3: Services & Amenities (The 4-Column Layout) */}
        <section>
          <h3 className="text-sm font-bold uppercase tracking-widest text-primary border-b border-border pb-2 mb-6">Services & Amenities</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {
              servicesAmenities?.atTheHotel &&
              <div>
                <h4 className="font-bold text-sm mb-3">General</h4>
                <ul className="text-xs space-y-2 text-foreground/70">
                  {servicesAmenities?.atTheHotel?.map((service: string, i: number) => (
                    <li key={i}>{service}</li>
                  ))}
                </ul>
              </div>
            }
            {
              servicesAmenities?.complimentary &&
              <div>
                <h4 className="font-bold text-sm mb-3">In-room</h4>
                <ul className="text-xs space-y-2 text-foreground/70">
                  {servicesAmenities?.complimentary?.map((service: string, i: number) => (
                    <li key={i}>{service}</li>
                  ))}
                </ul>
              </div>
            }
            {
              recreation &&
              <div>
                <h4 className="font-bold text-sm mb-3">Recreation</h4>
                <ul className="text-xs space-y-2 text-foreground/70">
                  {recreation?.map((service: any, i: number) => (
                    <li key={i}>{service?.title}</li>
                  ))}
                </ul>
              </div>
            }
          </div>
        </section>

        {/* Section 4: Restaurants & Bars (Image Grid) */}
        {
          resAndBars && resAndBars?.length &&
          <section>
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary border-b border-border pb-2 mb-6">Restaurants & Bars</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
              {resAndBars.map((item: any, i: number) => (
                <div key={i} className="border border-border p-3 bg-card flex flex-col">
                  <div className="relative aspect-[4/3] mb-3 overflow-hidden">
                    <Image src={item.img} alt="Restaurant" fill className="object-cover" />
                  </div>
                  <h4 className="font-bold text-xs mb-2">{item.name} ({item.type})</h4>
                  <p className="text-[10px] leading-relaxed text-foreground/60 flex-grow">
                    {item.description}
                  </p>
                  {/* <p className="text-[10px] font-bold mt-2">Timing: 7:00 AM - 10:30 PM</p> */}
                </div>
              ))}
            </div>
          </section>
        }

        {/* Section 5: Policies */}
        {
          checkInPolicy &&
          <section className="bg-muted/30 p-8 border border-border">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary border-b border-border pb-2 mb-4">Check-in/Out Policy</h3>
            <div className="grid md:grid-cols-2 gap-8 text-sm">
              <div>
                <p className="font-bold">Check-in: {checkInPolicy?.checkInTime}</p>
                <p className="text-foreground/60 italic">Early Check In: {checkInPolicy?.earlyCheckIn}</p>
              </div>
              <div>
                <p className="font-bold">Check-out: {checkInPolicy?.checkOutTime}</p>
                <p className="text-foreground/60 italic">{checkInPolicy?.note}</p>
              </div>
            </div>
            <br />
            <p className="text-foreground/60 italic">{checkInPolicy?.description}</p>
          </section>
        }
      </div>
    </HotelSubPage>
  );
}
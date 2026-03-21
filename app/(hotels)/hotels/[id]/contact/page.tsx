import HotelSubPage from "@/components/HotelSubPage";
import { hasWeddingPages } from "../helpers";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { getHotel } from "@/lib/db";

export default async function HotelContactPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const hotel = await getHotel(id);
  if (!hotel) return <div className="min-h-screen flex items-center justify-center">Hotel not found</div>;
  return (
    <HotelSubPage
      hotelName={hotel.name}
      hotelLocation={hotel.location}
      hotelImage={hotel.coverImage ?? hotel.image}
      hotelId={id}
      pageTitle="Contact Us"
      pageSubtitle={hotel.name}
      hasWedding={hotel.hasWedding}
      hasSpa={!!hotel.spa}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl font-serif text-foreground mb-6">Get in Touch</h2>
          <p className="text-foreground/70 mb-8">
            We would love to hear from you. Reach out to us for reservations,
            inquiries, or any assistance you may need.
          </p>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="text-primary mt-1 shrink-0" size={20} />
              <div>
                <h4 className="font-bold text-foreground text-sm uppercase tracking-wider mb-1">Address</h4>
                <p className="text-foreground/60">{hotel?.salesContact?.address || hotel.location}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="text-primary mt-1 shrink-0" size={20} />
              <div>
                <h4 className="font-bold text-foreground text-sm uppercase tracking-wider mb-1">Phone</h4>
                <p className="text-foreground/60">{hotel?.salesContact?.telephone?.join?.(',') || "N/A"}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="text-primary mt-1 shrink-0" size={20} />
              <div>
                <h4 className="font-bold text-foreground text-sm uppercase tracking-wider mb-1">Email</h4>
                <p className="text-foreground/60">{hotel?.salesContact?.email || "N/A"}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="text-primary mt-1 shrink-0" size={20} />
              <div>
                <h4 className="font-bold text-foreground text-sm uppercase tracking-wider mb-1">Front Desk</h4>
                <p className="text-foreground/60">24 Hours, 7 Days a Week</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-serif text-foreground mb-6">Send a Message</h3>
          <form className="space-y-4">
            <input type="text" placeholder="Full Name" className="w-full border border-border bg-background p-3 text-sm outline-none focus:border-primary" />
            <input type="email" placeholder="Email Address" className="w-full border border-border bg-background p-3 text-sm outline-none focus:border-primary" />
            <input type="tel" placeholder="Phone Number" className="w-full border border-border bg-background p-3 text-sm outline-none focus:border-primary" />
            <textarea placeholder="Your Message" rows={5} className="w-full border border-border bg-background p-3 text-sm outline-none focus:border-primary resize-none" />
            <button type="submit" className="w-full bg-primary text-white py-4 text-sm tracking-widest uppercase font-bold hover:bg-primary/90 transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </HotelSubPage>
  );
}

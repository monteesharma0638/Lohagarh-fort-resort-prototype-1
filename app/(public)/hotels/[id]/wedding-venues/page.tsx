import Image from "next/image";
import Link from "next/link";
import HotelSubPage from "@/components/HotelSubPage";
import WeddingVenuesFAQ from "@/components/WeddingVenuesFAQ";
import {  hasWeddingPages } from "../helpers";
import venuesData from "@/data/wedding-venues.json";
import { Users, Maximize2, Building2, CheckCircle2, Phone } from "lucide-react";
import { getHotel } from "@/lib/db";

type VenueData = typeof venuesData;
type HotelVenues = VenueData[keyof VenueData];

export default async function WeddingVenuesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const hotel = await getHotel(id);
  if (!hotel) return <div className="min-h-screen flex items-center justify-center">Hotel not found</div>;

  const data = (venuesData as VenueData)[id as keyof VenueData] as HotelVenues | undefined;

  if (!data) {
    return (
      <HotelSubPage
        hotelName={hotel.name}
        hotelLocation={hotel.location}
        hotelImage={hotel.coverImage ?? hotel.image}
        hotelId={id}
        pageTitle="Wedding Venues"
        pageSubtitle={hotel.name}
        hasWedding={hotel.hasWedding}
      hasSpa={!!hotel.spa}
      >
        <div className="py-20 text-center">
          <h2 className="text-3xl font-serif text-foreground mb-4">Wedding Venues</h2>
          <p className="text-foreground/60">Venue details coming soon. Please contact us for more information.</p>
          <Link
            href={`/hotels/${id}/contact`}
            className="mt-8 inline-block bg-primary text-white px-8 py-3 text-sm tracking-widest uppercase font-semibold hover:bg-primary/90 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </HotelSubPage>
    );
  }

  const { heroTitle, heroSubtitle, intro, venues, faqs } = data;

  return (
    <HotelSubPage
      hotelName={hotel.name}
      hotelLocation={hotel.location}
      hotelImage={hotel.coverImage ?? hotel.image}
      hotelId={id}
      pageTitle="Wedding Venues"
      pageSubtitle={hotel.name}
      hasWedding={hotel.hasWedding}
      hasSpa={!!hotel.spa}
    >
      <div className="space-y-5">

        {/* ── Page intro ── */}
        <div>
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-2">{heroTitle}</h2>
          <p className="text-primary text-sm tracking-widest uppercase font-semibold mb-6">{heroSubtitle}</p>
          <p className="text-foreground/70 leading-relaxed">{intro.split("\n").map(item => <>{item}<br /><br /></>)}</p>
        </div>

        {/* ── Venue Cards — alternating layout ── */}
        <div className="space-y-14">
          {venues.map((venue, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={venue.id}
                className="border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}>

                  {/* Image */}
                  <div className="relative md:w-2/5 aspect-[4/3] md:aspect-auto overflow-hidden">
                    <Image
                      src={venue.image}
                      alt={venue.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    {/* Type badge */}
                    <span className="absolute top-4 left-4 bg-primary text-white text-xs tracking-widest uppercase px-3 py-1 font-semibold">
                      {venue.type}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-between gap-6">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-serif text-foreground mb-1">{venue.name}</h3>
                      {/* <p className="text-primary text-xs tracking-widest uppercase font-semibold mb-4">{venue.highlight}</p> */}
                      <p className="text-foreground/70 leading-relaxed mb-6">{venue.description}</p>

                      {/* Stats row */}
                      <div className="flex flex-wrap gap-6 mb-6">
                        <div className="flex items-center gap-2 text-foreground/80">
                          <Users className="w-4 h-4 text-primary shrink-0" />
                          <span className="text-sm">
                            <span className="font-semibold">{venue.capacity}</span>
                            <span className="text-foreground/50"> guests</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-foreground/80">
                          <Maximize2 className="w-4 h-4 text-primary shrink-0" />
                          <span className="text-sm">
                            <span className="font-semibold">{venue.area}</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-foreground/80">
                          <Building2 className="w-4 h-4 text-primary shrink-0" />
                          <span className="text-sm">
                            {venue.indoor ? "Indoor" : "Outdoor"}
                          </span>
                        </div>
                      </div>

                      {/* Features */}
                      {/* <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {venue.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-2 text-sm text-foreground/70">
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            {feat}
                          </li>
                        ))}
                      </ul> */}
                    </div>

                    {/* CTA */}
                    <div className="flex gap-4 pt-2 border-t border-border">
                      <Link
                        href={`/hotels/${id}/contact`}
                        className="inline-block bg-primary text-white px-6 py-2.5 text-xs tracking-widest uppercase font-semibold hover:bg-primary/90 transition-colors"
                      >
                        Enquire Now
                      </Link>
                      <Link
                        href={`/hotels/${id}/overview`}
                        className="inline-flex items-center gap-2 border border-primary text-primary px-6 py-2.5 text-xs tracking-widest uppercase font-semibold hover:bg-primary/5 transition-colors"
                      >
                        View Hotel
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Capacity Comparison Table ── */}
        <div>
          <h3 className="text-2xl font-serif text-foreground mb-6">Venue Comparison at a Glance</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-primary/10 border-b-2 border-primary/30">
                  <th className="text-left py-3 px-4 font-semibold text-foreground uppercase tracking-wider text-xs">Venue</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground uppercase tracking-wider text-xs">Capacity</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground uppercase tracking-wider text-xs">Area</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground uppercase tracking-wider text-xs">Type</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground uppercase tracking-wider text-xs">Indoor</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground uppercase tracking-wider text-xs">Best For</th>
                </tr>
              </thead>
              <tbody>
                {venues.map((venue, idx) => (
                  <tr
                    key={venue.id}
                    className={`border-b border-border ${idx % 2 === 0 ? "bg-background" : "bg-muted/20"} hover:bg-primary/5 transition-colors`}
                  >
                    <td className="py-3 px-4 font-serif font-semibold text-foreground">{venue.name}</td>
                    <td className="py-3 px-4 text-center text-foreground/80">{venue.capacity}</td>
                    <td className="py-3 px-4 text-center text-foreground/80">{venue.area}</td>
                    <td className="py-3 px-4 text-center text-foreground/70">{venue.type}</td>
                    <td className="py-3 px-4 text-center">
                      {venue.indoor ? (
                        <span className="text-green-700 font-semibold">✓</span>
                      ) : (
                        <span className="text-foreground/40">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-foreground/70">{venue.highlight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Destination Weddings CTA ── */}
        <div className="bg-[#1E0800] text-white p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-primary text-xs tracking-widest uppercase font-semibold mb-2">Plan Your Royal Wedding</p>
            <h3 className="text-2xl md:text-3xl font-serif mb-3">Are You Looking for a Destination Wedding Resort in Jaipur?</h3>
            <p className="text-white/60 text-sm max-w-xl leading-relaxed">
              Our dedicated wedding team is available 7 days a week to help you plan every detail — from venue selection and decor to catering and entertainment. Let us create a celebration as unique as your love story.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <Link
              href={`/hotels/${id}/contact`}
              className="bg-primary text-white px-8 py-3 text-sm tracking-widest uppercase font-semibold text-center hover:bg-primary/90 transition-colors whitespace-nowrap"
            >
              Book a Site Visit
            </Link>
            <a
              href="tel:+911141234567"
              className="flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-3 text-sm tracking-widest uppercase font-semibold hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              <Phone className="w-4 h-4" />
              Call Us Now
            </a>
          </div>
        </div>

        {/* ── FAQ Section ── */}
        {faqs && faqs.length > 0 && (
          <div>
            <h3 className="text-2xl font-serif text-foreground mb-2">
              Best Wedding Resorts for Destination Weddings in Jaipur
            </h3>
            <p className="text-foreground/60 text-sm mb-8">Frequently asked questions</p>
            <WeddingVenuesFAQ faqs={faqs} />
          </div>
        )}

      </div>
    </HotelSubPage>
  );
}

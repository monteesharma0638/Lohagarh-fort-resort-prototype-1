import HotelSubPage from "@/components/HotelSubPage";
import {  hasWeddingPages } from "../helpers";
import Image from "next/image";
import { getHotel, getLocations } from "@/lib/db";

export default async function ExplorePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const hotel = await getHotel(id);
  const city = await getLocations(hotel.location);
  if (!hotel)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Hotel not found
      </div>
    );

  const cityName = hotel.location.split(",")[0].trim();

  return (
    <HotelSubPage
      hotelName={hotel.name}
      hotelLocation={hotel.location}
      hotelImage={hotel.coverImage ?? hotel.image}
      hotelId={id}
      pageTitle={`Explore ${cityName}`}
      pageSubtitle={hotel.name}
      hasWedding={hotel.hasWedding}
      hasSpa={!!hotel.spa}
    >
      <section className="py-16 px-4 max-w-7xl mx-auto bg-[#F9F7F2]">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif text-[#4A3728] mb-4">
            Discover {hotel.location}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
           {city.title}
          </p>
        </div>

        <div className="space-y-8">
          {city?.locations?.map((loc: any, index: number) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-stretch bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image Section */}
              <div className="relative w-full md:w-1/2 h-64 md:h-auto min-h-[300px]">
                <Image
                  src={loc.image}
                  alt={loc.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content Section */}
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-center relative">
                <div className="mb-4">
                  {/* Location Icon Placeholder */}
                  <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center mb-4">
                    <svg
                      className="w-4 h-4 text-orange-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-serif text-[#4A3728] mb-3">
                    {loc.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {loc.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </HotelSubPage>
  );
}

import { Wifi, Coffee, MapPin, Star, Calendar } from "lucide-react";
import MotionDiv from "@/components/MotionDiv";
import hotelsData from "../hotels.json";
import Image from "next/image";

export default async function HotelDetail({params}: {params: Promise<{id: string}>}) {
  const id = (await params).id;
  const hotel = hotelsData.find(h => h.id === id);

  if (!hotel) {
    return <div className="min-h-screen flex items-center justify-center">Hotel not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">      
      {/* Hero Section */}
      <div className="relative h-[70vh]">
        <Image src={hotel.coverImage ?? hotel.image} alt={hotel.name} className="object-cover" fill />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 bg-gradient-to-t from-black/80 to-transparent text-white">
          <div className="container mx-auto">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4 text-primary text-sm tracking-widest uppercase font-bold">
                <MapPin size={16} /> {hotel.location}
              </div>
              <h1 className="text-5xl md:text-7xl font-serif mb-6">{hotel.name}</h1>
              <div className="flex items-center gap-6">
                <span className="text-2xl font-serif">₹{hotel.price} <span className="text-sm font-sans text-gray-300">/ Night</span></span>
                <div className="flex items-center gap-1 bg-primary text-black px-3 py-1 text-sm font-bold">
                  <Star size={14} fill="black" /> {hotel.rating}
                </div>
              </div>
            </MotionDiv>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-serif mb-6">About the Property</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-12 font-light">
              {hotel.description}
            </p>

            <h3 className="text-2xl font-serif mb-6">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
              {hotel.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-3 text-gray-600 border border-gray-100 p-4">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  {amenity}
                </div>
              ))}
            </div>
            
            <h3 className="text-2xl font-serif mb-6">Gallery</h3>
            <div className="grid grid-cols-2 gap-4">
               {/* Reusing existing images for gallery demo */}
               {
                  hotel.gallery && hotel.gallery.length > 0 ? hotel.gallery.map((img, idx) => (
                    <img key={idx} src={img} className="w-full h-48 object-cover hover:opacity-90 transition-opacity" />
                  )) : (
                    <>
                      <img src="/images/dining-fine.png" className="w-full h-48 object-cover hover:opacity-90 transition-opacity" />
                      <img src="/images/spa-wellness.png" className="w-full h-48 object-cover hover:opacity-90 transition-opacity" />
                    </>
                  )
               }
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-8 sticky top-32 border border-gray-100 shadow-sm">
              <h3 className="text-xl font-serif mb-6">Book Your Stay</h3>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Check In</label>
                  <div className="flex items-center border border-gray-300 bg-white p-3">
                    <Calendar size={16} className="text-gray-400 mr-2" />
                    <input type="date" className="w-full outline-none text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Check Out</label>
                  <div className="flex items-center border border-gray-300 bg-white p-3">
                    <Calendar size={16} className="text-gray-400 mr-2" />
                    <input type="date" className="w-full outline-none text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Guests</label>
                  <select className="w-full border border-gray-300 bg-white p-3 outline-none text-sm">
                    <option>2 Adults, 0 Children</option>
                    <option>2 Adults, 1 Child</option>
                    <option>1 Adult</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-6 pt-6 border-t border-gray-200">
                <span className="text-gray-600">Total (1 Night)</span>
                <span className="font-bold text-lg">₹{hotel.price}</span>
              </div>
              
              <button className="w-full bg-black text-white py-4 text-sm tracking-widest uppercase hover:bg-primary transition-colors font-bold">
                Proceed to Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
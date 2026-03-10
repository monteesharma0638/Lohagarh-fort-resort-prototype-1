export const GuestChoiceSection = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        {/* Left: Visual representation of a "Guest Award" */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative p-10 border-2 border-[#C2A978] rounded-2xl">
            <div className="absolute -top-4 -left-4 bg-[#C2A978] text-white px-4 py-1 text-xs tracking-tighter uppercase">
              January 2025 Spotlight
            </div>
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[#C2A978] text-xl">★</span>
              ))}
            </div>
            <p className="text-xl md:text-2xl font-serif italic text-gray-700 leading-snug">
              "Lohagarh Fort Resort offers a truly royal experience. The attention to heritage 
              detail and the hospitality is unparalleled in Jaipur."
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-[#C2A978]">
                RS
              </div>
              <div>
                <div className="font-bold text-gray-900">Rajesh Sharma</div>
                <div className="text-sm text-gray-500 italic">Verified Guest Review</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Text Content */}
        <div className="w-full md:w-1/2 space-y-6">
          <h4 className="text-[#C2A978] font-bold tracking-widest uppercase text-sm">The Voice of Our Guests</h4>
          <h2 className="text-4xl font-serif text-gray-900 leading-tight">
            Voted Most Luxurious Wedding Venue in Jaipur
          </h2>
          <p className="text-gray-600">
            Beyond the official plaques and certificates, our greatest achievement is the 
            consistent 4.7-star rating we maintain across global travel platforms. 
            We pride ourselves on the memories created within our fort walls.
          </p>
          <button className="px-8 py-3 bg-[#1A1A1A] text-white text-sm hover:bg-[#C2A978] transition-colors duration-300">
            View All Reviews
          </button>
        </div>
      </div>
    </section>
  );
};
import weddings from "@/data/wedding-experiences.json";
import Link from "next/link";

export const WeddingGallery = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {weddings.map((wedding) => (
            <div key={wedding.id} className="group text-center">
              <div className="overflow-hidden mb-4 rounded-sm border-[6px] border-[#F9F8F6] shadow-sm">
                <img 
                  src={wedding.img[0]} 
                  alt={wedding.name} 
                  className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-serif text-gray-800 uppercase tracking-widest mb-3">
                {wedding.name}
              </h3>
              <Link href={"regal-weddings/" + wedding.id.toString()} className="px-8 py-2 border border-[#C2A978] text-[#C2A978] text-xs uppercase tracking-tighter hover:bg-[#C2A978] hover:text-white transition-all duration-300">
                View Gallery
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
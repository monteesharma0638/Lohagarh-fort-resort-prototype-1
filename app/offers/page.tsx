import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import MotionDiv from "@/components/MotionDiv";

const offers = [
  {
    title: "Suite Surprises",
    discount: "20% Off",
    description: "Experience the grandeur of our suites with complimentary breakfast, airport transfers, and a bottle of sparkling wine.",
    validity: "Valid till 30th Dec",
    image: "/images/room-luxury.png"
  },
  {
    title: "Spa Retreat",
    discount: "Complimentary Therapy",
    description: "Book a 3-night stay and enjoy a complimentary 60-minute couple's spa therapy at Jiva Spa.",
    validity: "Valid till 15th Nov",
    image: "/images/spa-wellness.png"
  },
  {
    title: "Early Bird",
    discount: "15% Off",
    description: "Plan your holiday in advance. Book 30 days prior to your stay and enjoy exclusive savings on best available rates.",
    validity: "Round the year",
    image: "/images/hero-main.png"
  },
  {
    title: "Member Exclusive",
    discount: "Double Points",
    description: "Lohagarh InnerCircle members earn double points on dining and stays across all our properties.",
    validity: "Valid for Members",
    image: "/images/dining-fine.png"
  }
];

export default function Offers() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[50vh] flex items-center justify-center bg-black">
        <div className="absolute inset-0 opacity-50">
          <img src="/images/hero-main.png" alt="Offers" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 text-center text-white">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="block text-sm tracking-[0.3em] uppercase mb-4">Exclusive Privileges</span>
            <h1 className="text-5xl md:text-6xl font-serif">Special Offers</h1>
          </MotionDiv>
        </div>
      </div>

      <div className="py-24 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offers.map((offer, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white group cursor-pointer overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col md:flex-row h-full">
                  <div className="md:w-2/5 relative overflow-hidden">
                    <img 
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">
                      {offer.discount}
                    </div>
                  </div>
                  <div className="md:w-3/5 p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-serif mb-4 group-hover:text-primary transition-colors">{offer.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-6">
                        {offer.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                      <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                        {offer.validity}
                      </span>
                      <button className="text-xs font-bold tracking-widest uppercase hover:text-primary transition-colors">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import { motion } from "framer-motion";
import MotionDiv from "@/components/MotionDiv";
import Image from "next/image";

const restaurants = [
  {
    name: "Suvarna Mahal",
    cuisine: "Royal Indian",
    image: "/images/dining-fine.png",
    description: "Dining at Suvarna Mahal is a culinary journey through the royal kitchens of India. With gold-plated cutlery and live classical music, it offers an experience fit for kings.",
    features: ["Formal Attire", "Dinner Only", "Live Music"]
  },
  {
    name: "The Roof Top",
    cuisine: "Mediterranean & Grills",
    image: "/images/rooftop-dining.png",
    description: "Enjoy breathtaking views of the city skyline while savoring authentic Mediterranean delicacies and grilled specialties under the stars.",
    features: ["Outdoor Seating", "Sunset View", "Cocktails"]
  },
  {
    name: "Verandah Café",
    cuisine: "Global Cuisine",
    image: "/images/hero-main.png",
    description: "An all-day dining restaurant overlooking the palace gardens, serving a curated selection of international favorites and local comforts.",
    features: ["All Day Dining", "Breakfast Buffet", "Garden View"]
  }
];

export default function Dining() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="/images/lohagarhfortresort/dine_in.jpg" alt="Dining" width={1200} height={700} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="block text-sm tracking-[0.3em] uppercase mb-4">Epicurean Delights</span>
            <h1 className="text-5xl md:text-7xl font-serif">Fine Dining</h1>
          </MotionDiv>
        </div>
      </div>

      <div className="py-24 px-4">
        <div className="container mx-auto">
          <div className="space-y-32">
            {restaurants.map((restaurant, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
              >
                <div className="flex-1 w-full h-[400px] md:h-[500px] relative overflow-hidden group">
                  <img
                    src={restaurant.image} 
                    alt={restaurant.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <span className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
                    {restaurant.cuisine}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-serif mb-6">{restaurant.name}</h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8 font-light">
                    {restaurant.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-8">
                    {restaurant.features.map((feature, i) => (
                      <span key={i} className="px-4 py-2 bg-gray-100 text-xs tracking-widest uppercase text-gray-600">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <button className="border-b border-black pb-1 text-sm tracking-widest uppercase hover:text-primary hover:border-primary transition-colors">
                    Reserve a Table
                  </button>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
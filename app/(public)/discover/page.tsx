import MotionDiv from "@/components/MotionDiv";
import Image from "next/image";

const details = [
  {
    title: "Heritage Preservation",
    description: "Every Lohagarh property is a living monument. We work with master craftsmen to restore centuries-old frescoes, marble inlays, and gold-leaf ceilings to their original splendor.",
    image: "/images/heritage-walk.png"
  },
  {
    title: "Personalized Service",
    description: "Experience the legendary Indian hospitality with our signature butler service. From curated local excursions to bespoke dining menus, we anticipate your every desire.",
    image: "/images/room-luxury.png"
  },
  {
    title: "Sustainable Luxury",
    description: "We believe in preserving the future as much as the past. Our properties implement water harvesting, zero-waste kitchens, and support local artisan communities.",
    image: "/images/spa-wellness.png"
  }
];

export default function DiscoverMore() {
  return (
    <div className="min-h-screen bg-background">      
      {/* Header */}
      <div className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="/images/lohagarhfortresort/slider-image-1.jpg" alt="Discover More" width={1200} height={700} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="block text-primary text-sm tracking-[0.5em] uppercase font-bold mb-6">Explore the Essence</span>
            <h1 className="text-5xl md:text-8xl font-serif mb-8">The Lohagarh Way</h1>
          </MotionDiv>
        </div>
      </div>

      {/* Content Sections */}
      <div className="py-32 container mx-auto px-6">
        <div className="space-y-40">
          {details.map((section, index) => (
            <MotionDiv 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-20 items-center`}
            >
              <div className="flex-1 w-full aspect-[4/3] overflow-hidden border border-primary/20 p-2">
                <img 
                  src={section.image} 
                  alt={section.title} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
              </div>
              
              <div className="flex-1 text-center lg:text-left">
                <span className="text-primary text-xs font-bold tracking-[0.4em] uppercase mb-6 block">Chapter {index + 1}</span>
                <h2 className="text-4xl md:text-5xl font-serif mb-8 text-white tracking-tight">{section.title}</h2>
                <p className="text-gray-400 text-lg leading-relaxed font-light mb-10">
                  {section.description}
                </p>
                <div className="h-px w-24 bg-primary inline-block lg:block" />
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>

      {/* Quote Section */}
      <section className="py-40 bg-[#0a0a0a] text-center px-6 border-y border-primary/10">
        <div className="max-w-3xl mx-auto">
          <p className="text-3xl md:text-4xl font-serif italic text-white/90 mb-12 leading-relaxed">
            "Luxury is not about opulence; it is about the stories that live within the walls and the warmth that stays in your heart."
          </p>
          <div className="text-primary text-xs font-bold tracking-[0.3em] uppercase">Signature of Lohagarh</div>
        </div>
      </section>
    </div>
  );
}
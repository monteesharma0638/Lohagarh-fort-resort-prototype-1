import MotionDiv from "@/components/MotionDiv";
import Image from "next/image";

export default function ChairmanLetter() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="/images/lohagarhfortresort/coridoor.jpg" alt="Letter from Chairman" width={1200} height={700} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="block text-sm tracking-[0.3em] uppercase mb-4">Leadership</span>
            <h1 className="text-5xl md:text-7xl font-serif">Letter from the Chairman</h1>
          </MotionDiv>
        </div>
      </div>

      <div className="py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <MotionDiv
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed font-serif italic mb-12 text-center">
              "It is my honor to welcome you to the Lohagarh family — where tradition meets excellence."
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Dear Guests and Partners,
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              For generations, our family has been dedicated to preserving the rich heritage of Indian hospitality. What began as a vision to share our ancestral homes with the world has grown into a collection of exceptional properties that embody the spirit of royal India.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Every Lohagarh property is more than a hotel — it is a living museum, a cultural landmark, and a sanctuary for those who seek authentic luxury. We take immense pride in our commitment to sustainable tourism, community engagement, and the preservation of India's architectural heritage.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              I invite you to experience the warmth of our hospitality and the grandeur of our properties. Welcome to Lohagarh.
            </p>
          </MotionDiv>
        </div>
      </div>
    </div>
  );
}

import MotionDiv from "@/components/MotionDiv";
import Image from "next/image";
import MissionSection from "./components/MissionSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Mission & Values | Lohagarh Group of Companies",
  description: "Redefining luxury through the richness of Indian heritage. At Lohagarh, we blend sustainability, culture, and authentic hospitality to create memorable stays.",
};


export default function OurMission() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="/images/lohagarhfortresort/drone-view.jpeg" alt="Our Mission" width={1200} height={700} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="block text-sm tracking-[0.3em] uppercase mb-4">Our Purpose</span>
            <h1 className="text-5xl md:text-7xl font-serif">Our Mission</h1>
          </MotionDiv>
        </div>
      </div>

      <div className="md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <MotionDiv
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <MissionSection />
          </MotionDiv>
        </div>
        {/* <div className="container mx-auto max-w-4xl">
          <MotionDiv
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed font-serif italic mb-12">
              "To preserve India's royal heritage while delivering world-class hospitality experiences."
            </p>
            <div className="space-y-12 text-left">
              <div className="border-l-2 border-primary/30 pl-8">
                <h3 className="text-2xl font-serif text-primary mb-4">Heritage Preservation</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We are committed to restoring and maintaining India's architectural treasures, ensuring that future generations can experience the grandeur of our nation's royal past.
                </p>
              </div>
              <div className="border-l-2 border-primary/30 pl-8">
                <h3 className="text-2xl font-serif text-primary mb-4">Sustainable Luxury</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Our approach to hospitality balances opulence with responsibility, incorporating eco-friendly practices and supporting local communities across all our properties.
                </p>
              </div>
              <div className="border-l-2 border-primary/30 pl-8">
                <h3 className="text-2xl font-serif text-primary mb-4">Cultural Immersion</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Every guest experience is designed to provide an authentic connection to India's rich cultural tapestry, from curated heritage walks to traditional culinary journeys.
                </p>
              </div>
            </div>
          </MotionDiv>
        </div> */}
      </div>
    </div>
  );
}

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import MotionH1 from "@/components/motion/MotionH1";

export default function Weddings() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="relative h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img src="/images/lohagarhfortresort/royal-wedding.jpg" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <MotionH1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-8xl font-serif mb-6">Royal Weddings</MotionH1>
          <p className="text-primary tracking-[0.3em] uppercase text-sm font-bold">A Fairy-tale Beginning</p>
        </div>
      </div>
      <section className="py-24 container mx-auto px-6 max-w-5xl text-center">
        <SectionHeading title="Timeless Vows" subtitle="Your Special Day" />
        <p className="text-gray-400 text-lg leading-relaxed mb-12 italic">"From the grand procession to the intimate exchange of vows, our palaces provide the perfect stage for the most important day of your life."</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-square bg-[#111] border border-primary/20 p-8 flex flex-col justify-center">
            <h3 className="text-2xl font-serif text-primary mb-4">The Venue</h3>
            <p className="text-gray-500 text-sm tracking-wide">Majestic courtyards, grand ballrooms, and panoramic rooftop terraces overlooking the Pink City.</p>
          </div>
          <div className="aspect-square bg-[#111] border border-primary/20 p-8 flex flex-col justify-center">
            <h3 className="text-2xl font-serif text-primary mb-4">The Planning</h3>
            <p className="text-gray-500 text-sm tracking-wide">Our dedicated wedding planners ensure every detail, from floral arrangements to gourmet catering, is executed to perfection.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
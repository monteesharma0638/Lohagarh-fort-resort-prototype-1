import SectionHeading from "@/components/SectionHeading";
import MotionDiv from "@/components/MotionDiv";

export default function EventsPackage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative h-[60vh] flex items-center justify-center bg-secondary/30">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-4">
          <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="block text-sm tracking-[0.3em] uppercase mb-4 text-primary">Special Packages</span>
            <h1 className="text-5xl md:text-8xl font-serif">Events</h1>
          </MotionDiv>
        </div>
      </div>
      <section className="py-24 container mx-auto px-6 max-w-5xl">
        <SectionHeading title="Unforgettable Gatherings" subtitle="Event Packages" />
        <p className="text-gray-400 text-lg leading-relaxed text-center max-w-3xl mx-auto">
          From corporate retreats to grand celebrations, our heritage venues provide the perfect setting for every occasion.
        </p>
      </section>
    </div>
  );
}

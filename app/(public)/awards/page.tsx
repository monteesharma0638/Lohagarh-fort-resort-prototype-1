import SectionHeading from "@/components/SectionHeading";
import MotionDiv from "@/components/MotionDiv";
import AwardsShowcase from "@/sections/AwardSection";
import { AwardStats } from "@/sections/AwardStats";
import { GuestChoiceSection } from "@/sections/GuestChoiceSection";
import { LegacyTimeline } from "@/sections/LegacyTimeLine";

export default function Awards() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative h-[60vh] flex items-center justify-center bg-secondary/30">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-4">
          <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="block text-sm tracking-[0.3em] uppercase mb-4 text-primary">Recognition of Excellence</span>
            <h1 className="text-5xl md:text-8xl font-serif">Awards</h1>
          </MotionDiv>
        </div>
      </div>

      <AwardsShowcase />
      <GuestChoiceSection />
      <LegacyTimeline />
      <AwardStats />
      {/* <section className="py-24 container mx-auto px-6 max-w-5xl">
        <SectionHeading title="Our Accolades" subtitle="Celebrated Worldwide" />
        <p className="text-gray-400 text-lg leading-relaxed text-center max-w-3xl mx-auto">
          Over the years, Lohagarh has been recognized by prestigious international and national bodies for its commitment to luxury, heritage preservation, and exceptional hospitality.
        </p>
      </section> */}
    </div>
  );
}

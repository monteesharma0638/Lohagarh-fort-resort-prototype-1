import SectionHeading from "@/components/SectionHeading";
import MotionDiv from "@/components/MotionDiv";

export default function RegalExperience() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative h-[60vh] flex items-center justify-center bg-secondary/30">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-4">
          <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="block text-sm tracking-[0.3em] uppercase mb-4 text-primary">Experiences</span>
            <h1 className="text-5xl md:text-8xl font-serif">Regal Experience</h1>
          </MotionDiv>
        </div>
      </div>
      <section className="py-24 container mx-auto px-6 max-w-5xl">
        <SectionHeading title="Live Like Royalty" subtitle="Immersive Heritage" />
        <p className="text-gray-400 text-lg leading-relaxed text-center max-w-3xl mx-auto">
          Step into a world of regal splendor with curated experiences that bring the grandeur of Indian royalty to life — from private palace tours to traditional art demonstrations.
        </p>
      </section>
    </div>
  );
}

import SectionHeading from "@/components/SectionHeading";
import MotionDiv from "@/components/MotionDiv";
import Link from "next/link";

export default function SpecialPackages() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative h-[60vh] flex items-center justify-center bg-secondary/30">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-4">
          <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="block text-sm tracking-[0.3em] uppercase mb-4 text-primary">Curated for You</span>
            <h1 className="text-5xl md:text-8xl font-serif">Special Packages</h1>
          </MotionDiv>
        </div>
      </div>
      <section className="py-24 container mx-auto px-6 max-w-5xl">
        <SectionHeading title="Exclusive Offerings" subtitle="Tailored Experiences" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
          <Link href="/special-packages/wedding" className="group text-center">
            <h3 className="text-primary font-serif text-2xl mb-4 group-hover:opacity-80 transition-opacity">Wedding</h3>
            <p className="text-gray-400 leading-relaxed">Celebrate your special day in the grandeur of our heritage palaces.</p>
          </Link>
          <Link href="/special-packages/events" className="group text-center">
            <h3 className="text-primary font-serif text-2xl mb-4 group-hover:opacity-80 transition-opacity">Events</h3>
            <p className="text-gray-400 leading-relaxed">Host unforgettable events in our regal settings with world-class amenities.</p>
          </Link>
          <Link href="/special-packages/palace-on-wheels" className="group text-center">
            <h3 className="text-primary font-serif text-2xl mb-4 group-hover:opacity-80 transition-opacity">Palace on Wheels</h3>
            <p className="text-gray-400 leading-relaxed">Experience the luxury of royal train travel through the heart of India.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}

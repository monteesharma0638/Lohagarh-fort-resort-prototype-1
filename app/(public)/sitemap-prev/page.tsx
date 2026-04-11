import SectionHeading from "@/components/SectionHeading";
import MotionDiv from "@/components/MotionDiv";
import Link from "next/link";

export default function Sitemap() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative h-[60vh] flex items-center justify-center bg-secondary/30">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-4">
          <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="block text-sm tracking-[0.3em] uppercase mb-4 text-primary">Navigation</span>
            <h1 className="text-5xl md:text-8xl font-serif">Sitemap</h1>
          </MotionDiv>
        </div>
      </div>
      <section className="py-24 container mx-auto px-6 max-w-5xl">
        <SectionHeading title="All Pages" subtitle="Site Directory" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
          <div>
            <h3 className="text-primary font-serif text-xl mb-4">About</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Lohagarh</Link></li>
              <li><Link href="/about/chairman-letter" className="hover:text-primary transition-colors">Letter from Chairman</Link></li>
              <li><Link href="/about/management" className="hover:text-primary transition-colors">Management</Link></li>
              <li><Link href="/about/mission" className="hover:text-primary transition-colors">Our Mission</Link></li>
              <li><Link href="/about/testimonials" className="hover:text-primary transition-colors">Testimonials</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-primary font-serif text-xl mb-4">Experiences</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/experiences/regal-experience" className="hover:text-primary transition-colors">Regal Experience</Link></li>
              <li><Link href="/experiences/regal-weddings" className="hover:text-primary transition-colors">Regal Weddings</Link></li>
              <li><Link href="/experiences/spa-and-salon" className="hover:text-primary transition-colors">Spa & Salon</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-primary font-serif text-xl mb-4">More</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/hotels" className="hover:text-primary transition-colors">Our Hotels</Link></li>
              <li><Link href="/awards" className="hover:text-primary transition-colors">Awards</Link></li>
              <li><Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/reservations" className="hover:text-primary transition-colors">Reservations</Link></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

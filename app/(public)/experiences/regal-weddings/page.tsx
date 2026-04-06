import SectionHeading from "@/components/SectionHeading";
import MotionDiv from "@/components/MotionDiv";
import { WeddingGallery } from "@/sections/WeddingGallery";
import { WeddingContent } from "@/sections/WeddingContent";
import { WeddingFAQ } from "@/sections/WeddingFAQ";
import Image from "next/image";
import Hero from "@/components/Hero";

export default function RegalWeddings() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative h-[100vh] flex items-center justify-center bg-secondary/30">
        {/* <Image src="https://pub-ff97545f109a472fb64184a710a01a80.r2.dev/lohagarh-fort-resort/Celebration.jpg" alt="Royal Wedding" fill style={{objectFit: "cover"}} /> */}
        <Hero localUri="https://pub-ff97545f109a472fb64184a710a01a80.r2.dev/lohagarh-fort-resort/hero-royal-wedding.mp4" imageUrl="https://pub-ff97545f109a472fb64184a710a01a80.r2.dev/lohagarh-fort-resort/Celebration.jpg" altText="Royal Wedding">
          <div className="absolute inset-0" />
          <div className="relative z-10 text-center text-white px-4">
            <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className="block text-sm tracking-[0.3em] uppercase mb-4 text-white">Experiences</span>
              <h1 className="text-5xl md:text-8xl font-serif">Regal Weddings</h1>
            </MotionDiv>
          </div>
        </Hero>
      </div>
      <section className="py-24 container mx-auto px-6 max-w-7xl">
        <SectionHeading title="" subtitle="Royal Weddings" />
        <p className="text-gray-400 leading-relaxed italic text-lg">
          "Experience the magic of a royal union where heritage meets modern luxury. 
          From grand mandaps to intimate celebrations, we curate every detail to perfection."
        </p>
        <br/>
        <p className="text-gray-600 text-md leading-relaxed text-left max-w-6xl mx-auto">
          At Lohagarh Fort Resort and Spa, we believe in creating unforgettable experiences for our guests, and one couple's wedding with us was truly magical. From the moment they arrived, they were treated like royalty, and their experience was no less than that of a king and queen.
        </p>
        <br/>
        <p className="text-gray-600 text-md leading-relaxed text-left max-w-6xl mx-auto">
          We went above and beyond to ensure that every aspect of their wedding was perfect. The couple exchanged vows in a breathtaking ceremony within the majestic fort, surrounded by the awe-inspiring beauty of our resort. The ambiance was fit for a fairy tale, with impeccable decorations and enchanting floral arrangements.
        </p>
        <br/>
        <p className="text-gray-600 text-md leading-relaxed text-left max-w-6xl mx-auto">
          Our dedicated team made sure that every guest felt special and pampered. From luxurious accommodations to exquisite cuisine, we left no stone unturned in creating an atmosphere of luxury and indulgence.
        </p>
        <br/>
        <p className="text-gray-600 text-md leading-relaxed text-left max-w-6xl mx-auto">
          The couple and their loved ones danced the night away under the starlit sky, creating memories that will last a lifetime. At Lohagarh Fort Resort and Spa, we take pride in being the perfect destination for a royal, luxury, and fairy tale wedding. Let us make your dreams come true and ensure that your special day is nothing short of extraordinary.
        </p>
      </section>
      <WeddingGallery />
      <WeddingContent />
      <WeddingFAQ />
    </div>
  );
}

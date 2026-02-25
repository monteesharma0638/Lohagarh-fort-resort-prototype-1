import SectionHeading from "@/components/SectionHeading";
import MotionH1 from "@/components/motion/MotionH1";
import Image from "next/image";

export default function Spa() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="/images/lohagarhfortresort/spa.webp" alt="Jiva Spa" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <MotionH1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-8xl font-serif mb-6">Jiva Spa</MotionH1>
          <p className="text-primary tracking-[0.3em] uppercase text-sm font-bold">Healing Wisdom of India</p>
        </div>
      </div>
      <section className="py-24 container mx-auto px-6 max-w-5xl">
        <SectionHeading title="Inner Harmony" subtitle="Wellness & Balance" />
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1">
            <p className="text-gray-400 text-lg leading-relaxed mb-8">Jiva Spas draw on ancient Indian healing wisdom, offering a range of signature treatments that use natural ingredients and time-honored techniques.</p>
            <ul className="space-y-4 text-primary text-sm tracking-widest uppercase font-bold">
              <li>• Ayurvedic Therapies</li>
              <li>• Yoga & Meditation</li>
              <li>• Signature Body Rituals</li>
              <li>• Aromatherapy</li>
            </ul>
          </div>
          <div className="flex-1 border border-primary/20 p-2 aspect-video overflow-hidden">
            <img src="/images/room-luxury.png" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>
    </div>
  );
}
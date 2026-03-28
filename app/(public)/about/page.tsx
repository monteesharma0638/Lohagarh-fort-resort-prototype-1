import MotionDiv from "@/components/MotionDiv";
import AboutIntroSection from "@/sections/AboutIntroSection";
import Image from "next/image";

export default function AboutLohagarh() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="https://res.cloudinary.com/drayl5ppi/image/upload/v1773212409/lohagarh/images/hero/DSC03810_a2obbz.jpg" alt="About Lohagarh" width={1200} height={700} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="block text-sm tracking-[0.3em] uppercase mb-4">Our Heritage</span>
            <h1 className="text-5xl md:text-7xl font-serif">About Lohagarh</h1>
          </MotionDiv>
        </div>
      </div>

      <AboutIntroSection />

      <div className="py-10 px-4">
        <div className="container mx-auto max-w-4xl">
          <MotionDiv
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed font-serif italic mb-12">
              "A legacy built on the foundations of Indian royalty, where every stone tells a story and every guest becomes family."
            </p>
          </MotionDiv>
        </div>
      </div>

    </div>
  );
}

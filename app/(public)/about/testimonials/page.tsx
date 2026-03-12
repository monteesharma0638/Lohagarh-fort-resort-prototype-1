import MotionDiv from "@/components/MotionDiv";
import Image from "next/image";
import TestimonialsSection from "./components/TestimonialsSection";

export default function Testimonials() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="https://res.cloudinary.com/drayl5ppi/image/upload/v1773212406/lohagarh/images/hero/DSC01586_qdlvzv.jpg" alt="Testimonials" width={1200} height={700} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="block text-sm tracking-[0.3em] uppercase mb-4">Guest Voices</span>
            <h1 className="text-5xl md:text-7xl font-serif">Testimonials</h1>
          </MotionDiv>
        </div>
      </div>
      <TestimonialsSection />
    </div>
  );
}

import MotionDiv from "@/components/MotionDiv";
import VisionaryLeaders from "@/components/VisionaryLeaders";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Management Team | Lohagarh Group of Companies",
  description: "Meet the leadership behind Lohagarh Group. Led by Managing Director Bhagat Singh Lohagarh, we specialize in luxury hospitality, real estate, and technology.",
};

export default function Management() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="/images/lohagarhfortresort/front-gate.jpg" alt="Management" width={1200} height={700} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="block text-sm tracking-[0.3em] uppercase mb-4">Our Team</span>
            <h1 className="text-5xl md:text-7xl font-serif">Management</h1>
          </MotionDiv>
        </div>
      </div>

      {/* <div className="py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <MotionDiv
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed font-serif italic mb-12">
              "Led by visionaries who blend tradition with innovation."
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-16">
              Our leadership team brings together decades of experience in luxury hospitality, heritage conservation, and sustainable tourism. Together, they guide Lohagarh Group towards a future that honors our past while embracing new possibilities.
            </p>
          </MotionDiv>
        </div>
      </div> */}
      <VisionaryLeaders />
    </div>
  );
}

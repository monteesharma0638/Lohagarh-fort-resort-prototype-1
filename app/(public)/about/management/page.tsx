import MotionDiv from "@/components/MotionDiv";
import Image from "next/image";

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

      <div className="py-24 px-4">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { name: "Coming Soon", title: "Chairman & Managing Director" },
              { name: "Coming Soon", title: "Chief Executive Officer" },
              { name: "Coming Soon", title: "Chief Operating Officer" },
              { name: "Coming Soon", title: "Director of Heritage & Culture" },
            ].map((member, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-8 border border-primary/10"
              >
                <div className="w-32 h-32 bg-secondary/20 rounded-full mx-auto mb-6" />
                <h3 className="text-xl font-serif text-primary mb-2">{member.name}</h3>
                <p className="text-gray-500 text-sm tracking-widest uppercase">{member.title}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import MotionDiv from "@/components/MotionDiv";
import Image from "next/image";

export default function CodeOfConduct() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="/images/lohagarhfortresort/outer.webp" alt="Code of Conduct" width={1200} height={700} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="block text-sm tracking-[0.3em] uppercase mb-4">Our Standards</span>
            <h1 className="text-5xl md:text-7xl font-serif">Code of Conduct</h1>
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
          >
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed font-serif italic mb-12 text-center">
              "Excellence in conduct is the cornerstone of exceptional hospitality."
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-12">
              At Lohagarh Group, our Code of Conduct defines the principles and standards that guide every member of our team. We believe that true luxury is built on a foundation of integrity, respect, and unwavering commitment to excellence.
            </p>
            <div className="space-y-8">
              {[
                { title: "Integrity", description: "We conduct all business with honesty, transparency, and the highest ethical standards." },
                { title: "Respect", description: "We treat every guest, team member, and partner with dignity and courtesy." },
                { title: "Excellence", description: "We strive for perfection in every aspect of our service and operations." },
                { title: "Responsibility", description: "We are accountable for our actions and their impact on our communities and environment." },
                { title: "Inclusivity", description: "We celebrate diversity and create welcoming spaces for all." },
              ].map((item, index) => (
                <div key={index} className="flex gap-8 group">
                  <span className="text-primary font-serif text-2xl min-w-[40px]">{String(index + 1).padStart(2, '0')}</span>
                  <div className="border-l border-primary/20 pl-8">
                    <h3 className="text-xl font-serif text-primary mb-2">{item.title}</h3>
                    <p className="text-gray-500 group-hover:text-gray-700 transition-colors">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </MotionDiv>
        </div>
      </div>
    </div>
  );
}

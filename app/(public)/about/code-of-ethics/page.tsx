import MotionDiv from "@/components/MotionDiv";
import Image from "next/image";

export default function CodeOfEthics() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="/images/lohagarhfortresort/pool-site.jpg" alt="Code of Ethics" width={1200} height={700} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="block text-sm tracking-[0.3em] uppercase mb-4">Our Values</span>
            <h1 className="text-5xl md:text-7xl font-serif">Code of Ethics</h1>
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
              "Our ethical framework guides every decision we make."
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-12">
              The Lohagarh Group Code of Ethics establishes the moral compass for our organization. It reflects our deep-rooted values and our commitment to conducting business in a manner that honors our heritage and respects all stakeholders.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: "Fair Business Practices", description: "We engage in fair competition and transparent business dealings at all times." },
                { title: "Environmental Stewardship", description: "We are committed to minimizing our environmental footprint and promoting sustainable practices." },
                { title: "Community Engagement", description: "We actively support and invest in the communities where we operate." },
                { title: "Employee Welfare", description: "We provide a safe, equitable, and nurturing environment for all team members." },
                { title: "Guest Privacy", description: "We protect the privacy and personal information of our guests with the utmost care." },
                { title: "Cultural Sensitivity", description: "We respect and celebrate the diverse cultural traditions of India and our global guests." },
              ].map((item, index) => (
                <div key={index} className="p-8 border border-primary/10 hover:border-primary/30 transition-colors">
                  <h3 className="text-xl font-serif text-primary mb-4">{item.title}</h3>
                  <p className="text-gray-500">{item.description}</p>
                </div>
              ))}
            </div>
          </MotionDiv>
        </div>
      </div>
    </div>
  );
}

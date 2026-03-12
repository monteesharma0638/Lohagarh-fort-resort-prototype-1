import MotionDiv from "@/components/MotionDiv";
import Image from "next/image";

const codeOfEthics = [
  {
    title: "Ethics and Integrity",
    description:
      "At Lohagarh Group of Companies, ethics and integrity form the foundation of our business practices. Every decision we make is guided by the principles of honesty, transparency, fairness, and accountability. We believe that maintaining strong ethical values helps build long-term trust with our guests, partners, employees, and the communities we serve.",
  },
  {
    title: "Commitment to Responsible Business",
    description:
      "We are committed to conducting our business in a responsible and lawful manner. All employees and representatives of the organization are expected to follow applicable laws, company policies, and professional standards in every aspect of their work. Ethical conduct ensures that our organization continues to grow while maintaining credibility and respect in the hospitality industry.",
  },
  {
    title: "Professional Conduct and Responsibility",
    description:
      "Every member of the Lohagarh team is expected to demonstrate professionalism, responsibility, and respect in their daily activities. Our employees represent the values of the organization and are encouraged to perform their duties with dedication, integrity, and a commitment to excellence.",
  },
  {
    title: "Fair Competition",
    description:
      "We believe in achieving success through quality service, innovation, and dedication rather than through unfair competition. Lohagarh Group focuses on continuously improving its services and guest experiences while respecting the reputation and efforts of other organizations within the hospitality sector.",
  },
  {
    title: "Equality and Respect",
    description:
      "We treat all individuals with dignity and fairness regardless of race, religion, nationality, gender, or background. Our organization promotes an inclusive environment where everyone is respected and valued. We believe that diversity strengthens our culture and enhances the experiences we create for our guests.",
  },
  {
    title: "Service Excellence and Trust",
    description:
      "Delivering consistent and exceptional service is one of our key ethical commitments. Every guest interaction is guided by professionalism, honesty, and genuine hospitality. By maintaining high service standards, we aim to build lasting relationships based on trust and reliability.",
  },
  {
    title: "Transparency in Business Practices",
    description:
      "Lohagarh Group maintains transparency and fairness in all financial and business dealings. We strive to ensure that our operations remain ethical, accountable, and aligned with our organizational values. Honest and responsible practices enable sustainable growth and strengthen our reputation.",
  },
  {
    title: "Commitment to Ethical Standards",
    description:
      "Our Code of Ethics reflects the principles that guide our actions and decisions. By adhering to these standards, every member of the Lohagarh Group contributes to a culture of integrity, respect, and responsibility. Together, we work to uphold the reputation of our organization and deliver excellence in hospitality.",
  }
];

export default function CodeOfEthics() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/lohagarhfortresort/pool-site.jpg"
            alt="Code of Ethics"
            width={1200}
            height={700}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="block text-sm tracking-[0.3em] uppercase mb-4">
              Our Values
            </span>
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
              The Lohagarh Group Code of Ethics establishes the moral compass
              for our organization. It reflects our deep-rooted values and our
              commitment to conducting business in a manner that honors our
              heritage and respects all stakeholders.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {codeOfEthics.map((item, index) => (
                <div
                  key={index}
                  className="p-8 border border-primary/10 hover:border-primary/30 transition-colors"
                >
                  <h3 className="text-xl font-serif text-primary mb-4">
                    {item.title}
                  </h3>
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

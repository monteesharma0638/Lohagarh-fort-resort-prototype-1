import Link from "next/link";
import MotionDiv from "@/components/MotionDiv";

export default function ExperiencesPage() {
  const experiences = [
    {
      title: "Regal Experience",
      description: "Immerse yourself in the grandeur of Indian royalty with curated experiences that bring history to life.",
      href: "/experiences/regal-experience",
    },
    {
      title: "Regal Weddings",
      description: "Celebrate your special day in the majestic settings of our heritage properties, creating memories that last a lifetime.",
      href: "/experiences/regal-weddings",
    },
    {
      title: "Spa & Salon",
      description: "Rejuvenate your body and soul with traditional wellness therapies and modern spa treatments.",
      href: "/experiences/spa-and-salon",
    },
  ];

  return (
    <main>
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/spa-wellness.png')" }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white">
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-4">Discover</p>
          <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl md:text-7xl font-serif">Experiences</h1>
          </MotionDiv>
        </div>
      </section>

      <section className="py-20 bg-[#faf8f5]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] uppercase text-primary mb-4">Our Offerings</p>
            <h2 className="text-4xl font-serif italic text-gray-800">Unforgettable Moments</h2>
            <div className="w-16 h-[2px] bg-primary mx-auto mt-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {experiences.map((exp) => (
              <Link key={exp.title} href={exp.href} className="group">
                <div className="bg-white p-8 shadow-sm hover:shadow-lg transition-shadow h-full flex flex-col">
                  <h3 className="text-2xl font-serif text-primary mb-4 group-hover:text-primary/80 transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed flex-grow">{exp.description}</p>
                  <span className="mt-6 text-sm tracking-[0.2em] uppercase text-primary font-bold">
                    Explore →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

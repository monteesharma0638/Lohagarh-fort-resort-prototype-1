"use client";

import Image from "next/image";

const spaSections = [
  {
    title: "Moksha Spa",
    description:
      "The Moksha Spa offers customers an ethereal experience of rest, renewal, and joy with the help of our highly educated spa staff. Treatments are inspired by ancient wellness traditions and enhanced by modern therapeutic practices.",
    details:
      "Our therapies combine herbal oils, natural ingredients, and personalized techniques to rejuvenate both body and mind.",
    image: "https://res.cloudinary.com/drayl5ppi/image/upload/v1773207916/lohagarh/images/spa/edit2_g1gpkp.jpg",
    services: [
      "International Massages",
      "Naturopathy Massage",
      "Ayurvedic Treatments",
      "Beauty Essentials",
    ],
  },
  {
    title: "Ayurvedic Wellness",
    description:
      "Experience traditional Ayurvedic therapies that focus on restoring balance between the body and mind through herbal treatments and ancient healing methods.",
    details:
      "Each ritual is designed to detoxify the body while calming the mind, creating a holistic wellness journey.",
    image: "https://res.cloudinary.com/drayl5ppi/image/upload/v1773208399/lohagarh/images/spa/edit1_g3trye.jpg",
    services: [
      "Abhyanga Therapy",
      "Shirodhara Ritual",
      "Herbal Detox Therapy",
      "Traditional Head Massage",
    ],
  },
  {
    title: "Luxury Relaxation Rituals",
    description:
      "Indulge in signature spa rituals designed to deliver deep relaxation and rejuvenation through aromatherapy and personalized massage therapies.",
    details:
      "These treatments combine calming aromas, soothing music, and expert touch to create a truly tranquil experience.",
    image: "https://res.cloudinary.com/drayl5ppi/image/upload/v1773207923/lohagarh/images/spa/edit3_dxtqsq.jpg",
    services: [
      "Aromatherapy Massage",
      "Deep Tissue Therapy",
      "Couple Spa Ritual",
      "Luxury Facial Therapy",
    ],
  },
];

export default function SpaAlternateSections() {
  return (
    <section className="bg-[#f7f5f2] py-32">

      <div className="max-w-7xl mx-auto px-6 space-y-32">

        {spaSections.map((spa, i) => {

          const reverse = i % 2 !== 0;

          return (
            <div
              key={i}
              className={`grid lg:grid-cols-2 gap-16 items-center ${
                reverse ? "lg:flex-row-reverse" : ""
              }`}
            >

              {/* Image */}

              <div className={`${reverse ? "lg:order-2" : ""}`}>

                <div className="relative overflow-hidden rounded-xl shadow-lg">

                  <Image
                    src={spa.image}
                    alt={spa.title}
                    width={700}
                    height={500}
                    className="w-full h-[420px] object-cover"
                  />

                </div>

              </div>

              {/* Content */}

              <div className={`${reverse ? "lg:order-1" : ""}`}>

                <p className="uppercase tracking-[0.3em] text-xs text-[hsl(var(--gold))] mb-4">
                  Wellness Experience
                </p>

                <h2 className="font-serif text-4xl mb-6">
                  {spa.title}
                </h2>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  {spa.description}
                </p>

                <p className="text-muted-foreground leading-relaxed mb-8">
                  {spa.details}
                </p>

                {/* Services */}

                <div className="grid sm:grid-cols-2 gap-3 mb-8">

                  {spa.services.map((service, idx) => (
                    <div key={idx} className="flex items-center gap-3">

                      <span className="text-[hsl(var(--gold))] text-lg">✓</span>

                      <span className="text-sm text-muted-foreground">
                        {service}
                      </span>

                    </div>
                  ))}

                </div>

                {/* CTA */}

                <button className="border border-[hsl(var(--gold))] text-[hsl(var(--gold))] px-6 py-3 text-sm tracking-widest uppercase hover:bg-[hsl(var(--gold))] hover:text-white transition">
                  Explore Treatments
                </button>

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}
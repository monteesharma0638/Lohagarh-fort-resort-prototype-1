"use client";

import Image from "next/image";

export default function MissionSection() {
  return (
    <section className="py-28 bg-[#f7f5f2]">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-16 items-center">

        {/* Left Content */}
        <div className="col-span-2">

          <h2 className="font-serif text-4xl mb-6 relative inline-block">
            Our Mission
            <span className="block w-20 h-[3px] bg-[hsl(var(--gold))] mt-3"></span>
          </h2>

          <div className="space-y-5 text-justify text-muted-foreground leading-relaxed">

            <p>
              Our mission is to redefine the hospitality experience by
              delivering world-class services while showcasing the richness
              of India’s cultural heritage and traditions.
            </p>

            <p>
              We strive to create memorable and transformative experiences
              for every guest, blending luxury, nature, and authentic
              Rajasthani hospitality.
            </p>

            <p>
              Sustainability remains at the heart of our philosophy.
              Through eco-friendly practices and responsible tourism,
              we work to protect the environment and the communities
              that are part of our journey.
            </p>

            <p>
              By combining heritage, innovation, and personalized
              service, our mission is to build a hospitality brand that
              celebrates Indian culture while delivering exceptional
              comfort and unforgettable moments.
            </p>

            <p className="font-medium text-foreground pt-4">
              Chairman & Managing Director
            </p>

          </div>

        </div>

        {/* Right Image */}
        <div className="relative col-span-1">

          {/* Frame */}
          <div className="absolute top-[-15] right-[-15] left-[-15] bottom-[-15] inset-0 border-[8px] border-[#e8dcc7] translate-x-0 translate-y-0"></div>

          <div className="relative overflow-hidden">
            <Image
              src="https://res.cloudinary.com/drayl5ppi/image/upload/v1773212409/lohagarh/images/hero/DSC03810_a2obbz.jpg"
              alt="Lohagarh Fort Resort"
              width={600}
              height={700}
              className="object-cover w-full h-[400px]"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
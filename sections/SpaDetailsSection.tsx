"use client";

import Image from "next/image";

export default function SpaDetailsSection() {
  return (
    <section className="py-32 bg-[#f7f5f2]">

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-start">

        {/* LEFT CONTENT */}
        <div>

          {/* Tag */}
          <p className="uppercase tracking-[0.4em] text-sm text-[hsl(var(--gold))] mb-6">
            Wellness Experiences
          </p>

          {/* Title */}
          <h2 className="font-serif text-5xl mb-8 leading-tight">
            Spa & Wellness Retreat
          </h2>

          {/* Description */}
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Escape into a sanctuary of calm where ancient healing traditions
            blend with modern wellness therapies. Our spa retreat is designed
            to restore balance to the body, mind, and spirit while immersing
            you in the serenity of nature.
          </p>

          <p className="text-muted-foreground mb-12 leading-relaxed">
            Each treatment is carefully curated by experienced therapists using
            premium herbal oils, natural ingredients, and time-honored
            techniques. From rejuvenating massages to holistic beauty rituals,
            every moment is crafted to leave you refreshed and renewed.
          </p>

          {/* Services */}
          <h3 className="font-serif text-2xl mb-6">
            Signature Treatments
          </h3>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">

            {[
              "Ayurvedic Rejuvenation Therapy",
              "Deep Tissue Massage",
              "Aromatherapy Ritual",
              "Hot Stone Therapy",
              "Herbal Detox Treatment",
              "Luxury Facial Therapy",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">

                <span className="text-[hsl(var(--gold))] text-xl">✓</span>

                <span className="text-sm text-muted-foreground">
                  {item}
                </span>

              </li>
            ))}

          </ul>

          {/* Extra Info */}
          <div className="grid grid-cols-2 gap-8 text-sm">

            <div>
              <p className="text-muted-foreground uppercase text-xs mb-1">
                Opening Hours
              </p>
              <p>9:00 AM – 8:00 PM</p>
            </div>

            <div>
              <p className="text-muted-foreground uppercase text-xs mb-1">
                Location
              </p>
              <p>Spa Pavilion</p>
            </div>

          </div>

        </div>

        {/* RIGHT IMAGES */}

        <div className="space-y-6 lg:sticky top-28">

          <div className="relative overflow-hidden rounded-lg">

            <Image
              src="https://res.cloudinary.com/drayl5ppi/image/upload/v1773207923/lohagarh/images/spa/edit3_dxtqsq.jpg"
              alt="Spa experience"
              width={700}
              height={500}
              className="w-full h-[320px] object-cover"
            />

          </div>

          <div className="grid grid-cols-2 gap-6">

            <Image
              src="https://res.cloudinary.com/drayl5ppi/image/upload/v1773207916/lohagarh/images/spa/edit2_g1gpkp.jpg"
              alt="Spa therapy"
              width={350}
              height={250}
              className="w-full h-[200px] object-cover rounded-lg"
            />

            <Image
              src="https://res.cloudinary.com/drayl5ppi/image/upload/v1773208399/lohagarh/images/spa/edit1_g3trye.jpg"
              alt="Spa relaxation"
              width={350}
              height={250}
              className="w-full h-[200px] object-cover rounded-lg"
            />

          </div>

        </div>

      </div>

    </section>
  );
}
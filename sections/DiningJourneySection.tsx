"use client";

import Image from "next/image";

const moments = [
  {
    title: "Royal Breakfast",
    desc: "Begin your day with a delightful breakfast spread featuring freshly baked breads, seasonal fruits, and traditional Rajasthani delicacies.",
    image: "/images/dining-fine.png",
  },
  {
    title: "Royal Lunch",
    desc: "Enjoy a curated midday feast with authentic regional dishes crafted from locally sourced ingredients.",
    image: "/images/lohagarhfortresort/dine_in.jpg",
  },
  {
    title: "Sunset High Tea",
    desc: "Experience a serene tea session with handcrafted snacks while watching the golden sunset over the heritage property.",
    image: "/images/lohagarhfortresort/food-item-1.jpg",
  },
  {
    title: "Candlelight Dinner",
    desc: "End the evening with a romantic candlelight dinner under the stars with royal hospitality.",
    image: "/images/lohagarhfortresort/food-item-1.jpg",
  },
];

export default function DiningJourneySection() {
  return (
    <section className="py-32 bg-background">

      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-24">
          <h2 className="font-serif text-5xl mb-4">
            A Day of Culinary Delights
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            From sunrise breakfasts to romantic candlelight dinners,
            each dining moment at Lohagarh Fort Resort is crafted
            to create unforgettable culinary memories.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">

          {/* center line */}
          <div className="absolute left-1/2 top-0 h-full w-[2px] bg-[hsl(var(--gold))] opacity-40 -translate-x-1/2"></div>

          <div className="space-y-24">

            {moments.map((item, i) => (
              <div
                key={i}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"
                }`}
              >

                {/* Image */}
                <div className="relative overflow-hidden group">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={700}
                    height={500}
                    className="w-full h-[420px] object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Text */}
                <div className="md:px-12">

                  <h3 className="font-serif text-3xl mb-4">
                    {item.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>

                </div>

              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}
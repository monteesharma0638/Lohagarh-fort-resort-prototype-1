"use client";

import Image from "next/image";

const dishes = [
  {
    title: "Royal Rajasthani Thali",
    desc: "A grand platter featuring authentic Rajasthani delicacies crafted from traditional royal recipes passed down through generations.",
    image: "/images/dining-fine.png",
  },
  {
    title: "Charcoal Grilled Kebabs",
    desc: "Succulent kebabs grilled over charcoal, marinated with aromatic spices and served with refreshing accompaniments.",
    image: "/images/lohagarhfortresort/dine_in.jpg",
  },
  {
    title: "Signature Dessert Collection",
    desc: "An indulgent selection of handcrafted desserts blending royal Indian flavors with modern presentation.",
    image: "/images/lohagarhfortresort/food-item-1.jpg",
  },
];

export default function SignatureDishesSection() {
  return (
    <section className="py-28 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-20 text-center">
          <h2 className="font-serif text-5xl mb-4">Signature Dining</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our chef's curated specialties where traditional royal
            recipes meet contemporary culinary craftsmanship.
          </p>
        </div>

        {/* Dish rows */}
        <div className="space-y-24">
          {dishes.map((dish, i) => (
            <div key={i} className="grid md:grid-cols-2 gap-16 items-center">
              {/* Image */}
              <div
                className={`relative overflow-hidden ${i % 2 === 1 ? "md:order-2" : ""}`}
              >
                <Image
                  src={dish.image}
                  alt={dish.title}
                  width={700}
                  height={500}
                  className="w-full h-[420px] object-cover transition duration-700 hover:scale-110"
                />
              </div>

              {/* Text */}
              <div className={`${i % 2 === 1 ? "md:order-1" : ""}`}>
                <h3 className="font-serif text-3xl mb-4">{dish.title}</h3>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  {dish.desc}
                </p>

                <button className="text-sm tracking-widest text-[hsl(var(--gold))] border-b border-[hsl(var(--gold))] pb-1 hover:opacity-70">
                  EXPLORE DISH
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

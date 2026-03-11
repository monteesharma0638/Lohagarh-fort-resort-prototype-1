"use client";

import Image from "next/image";

const leaders = [
  {
    name: "Bhagat Singh Lohagarh",
    role: "Managing Director",
    image:
      "https://res.cloudinary.com/drayl5ppi/image/upload/v1773220327/lohagarh/images/management/1_oklgwr.png",
    bio: `Bhagat Singh Lohagarh is a visionary entrepreneur and leader from Bharatpur, Rajasthan, who has played a pivotal role in shaping the success of the Lohagarh Group of Companies. With a keen sense of business strategy and a deep connection to his cultural roots, he has built a diverse portfolio spanning sectors like hospitality, real estate, and technology.

Growing up in Bharatpur, a city rich in history and culture, Bhagat Singh’s educational journey laid the foundation for his entrepreneurial spirit. Over the years, he has transformed the Lohagarh Group into a powerhouse of innovation, constantly adapting to the changing business landscape while upholding values of excellence and integrity.

Under his leadership, the company has flourished, expanding into new industries and ventures, including the renowned Palace on Wheels, further solidifying his reputation as a forward-thinking business leader. Beyond his professional success, Bhagat Singh is also deeply committed to philanthropy, dedicating time and resources to community development and social welfare projects. He believes in the power of giving back and improving the lives of those in need, reflecting his core values of compassion and responsibility.

Looking ahead, Bhagat Singh envisions sustained growth, innovation, and ethical business practices as the pillars of his future endeavors. He is dedicated to creating positive change, not only within his businesses but also in the communities they serve.

Bhagat Singh welcomes opportunities for collaboration, networking, and mutual growth, inviting others to join him in building a brighter, more prosperous future.`,
  },
  {
    name: "Sanjay Nischal",
    role: "Vice President",
    image:
      "https://res.cloudinary.com/drayl5ppi/image/upload/v1773220324/lohagarh/images/management/vp-sir_hhjabo.webp",
    bio: <p>Vice President – Lohagarh Group of Companies <br /><br />

Sanjay Nischal is a seasoned veteran of the hospitality industry, bringing over 28 years of elite experience to his role as Vice President of the Lohagarh Group of Companies. His career is defined by a rare blend of operational precision, creative vision, and an unwavering commitment to the guest experience.<br /><br />

<b>A Global Perspective on Hospitality: – </b> 

Mr. Nischal’s expertise is not confined by borders. Having worked with prestigious properties both across India and internationally, he possesses a sophisticated understanding of global service standards. His influence on the industry is further cemented by his active participation in premier global forums, <b>including: – </b>

WTM (World Travel Market), London,  ITB, Berlin,Germany,Rome Italy,  FITUR (International Tourism Trade Fair, Madrid, Spain),  ATM Dubai, Operational Excellence & Strategic Growth

Throughout his tenure, Sanjay has been a pivotal force in balancing high-tier luxury with robust profitability. He is widely recognized for his:

Exceptional Managerial Acumen: Orchestrating complex operations with seamless efficiency.

Public Relations Expertise: Building lasting relationships and a distinguished brand reputation.

Strategic Leadership: Taking hands-on roles across all organizational levels to ensure the sustainable growth of the Lohagarh Fort Resort.

 The Guest-First Philosophy

At the heart of Sanjay’s leadership is a dedication to “going above and beyond.” He doesn’t just manage expectations; he anticipates them. By fostering a culture of creativity and high-quality service, he ensures that every guest encounter with the Lohagarh Group is marked by excellence and authenticity.</p>,
  },
  {
    name: "Pratap Singh Shekhawat",
    role: "General Manager",
    image:
      "https://res.cloudinary.com/drayl5ppi/image/upload/v1773220324/lohagarh/images/management/pratapji_ffnf49.jpg",
    bio: `Pratap Singh Shekhawat has over 20 years of experience in hospitality
    operations and guest experience management.

    His leadership ensures seamless resort operations, exceptional guest services,
    and maintaining the luxury standards that define the Lohagarh brand.`,
  },
];

export default function VisionaryLeaders() {
  return (
    <section className="py-20 bg-[#f7f5f2]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <h2 className="font-serif text-4xl mb-4">
            Meet Our Visionary Leadership
          </h2>

          <div className="w-16 h-[2px] bg-[hsl(var(--gold))] mx-auto"></div>
        </div>

        {/* Leaders */}
        <div className="space-y-24">
          {leaders.map((leader, i) => (
            <div
              key={i}
              className={`grid lg:grid-cols-3 gap-14 items-center ${
                i % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className="relative h-[500px] rounded-xl col-span-1 overflow-hidden shadow-lg">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="col-span-2">
                <h3 className="font-serif text-2xl mb-2">{leader.name}</h3>

                <p className="text-[hsl(var(--gold))] text-sm mb-6 uppercase tracking-widest">
                  {leader.role}
                </p>

                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {leader.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

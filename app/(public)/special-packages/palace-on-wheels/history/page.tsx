import { Sparkles } from "lucide-react";
import Image from "next/image";

export default function page() {
  return (
    <div>
      <section className="py-20 border-t-140 border-black bg-background">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-12 items-center">
          {/* Text Content */}
          <div className="lg:w-3/5 space-y-6">
            <h2 className="text-4xl md:text-5xl gold-text-gradient">
              Our Royal Legacy
            </h2>
            <div className="w-20 h-1 bg-bhagwa"></div>

            <div className="editorjs-content">
              <p className="text-md leading-relaxed">
                The “Palace on Wheels” is India’s heritage symbol. It is timeless journey through legacy of the country and cultural heritage. When you book a trip on the Palace on Wheels, you experience carefully selected destinations curated by experts, celebrating the grandeur of India's past and present.
              </p>
              <blockquote className="my-8">
                "Architecture is a visual history; at Lohagarh, we ensure that
                history remains vibrant and luxurious."
              </blockquote>
              <p className="text-md leading-relaxed">
                It is a journey of historic opulence and importance for nation history. In this Information, we will outline each stage of the Palace on Wheels' history. It’s a unique monumental symbol of the country.
              </p>
            </div>
          </div>

          {/* Featured Image with Heritage Border */}
          <div className="w-[100%] lg:w-2/5 relative h-100">
            <div className="absolute -inset-4 border border-gold/20 translate-x-4 translate-y-4 -z-10"></div>
            <Image
              src="https://www.thepalaceonwheels.org/storage/banners/pow-restaurant(1).jpeg"
              className="w-full h-auto border border-gold/30 shadow-2xl"
              alt="Heritage Architecture"
              fill
            />
          </div>
        </div>
        <div className="container px-4 my-10 mx-auto items-center">
            <h3 className="text-2xl font-bold leading-relaxed">
                Historical background – The origin
            </h3>
            <br />
            <ul>
                <li>
                    <p className="text-md leading-relaxed text-justify">
                        <strong>The royal heritage roots –</strong> This extraordinary concept originated from Royal carriages, which were used by the Princely icons of the country during and before the British era. The authorities have made every effort to keep this tradition alive till the present time. Thus, this historic rail route depicts the 500 royal states during the British era. During this time, royal states were known to operate luxury travel coaches for royals. This led to the reincarnation of luxury coaches of The Palace on Wheels - custom-built coaches, royal preferences, gold inlays, velvet upholstery, and ornate decorative interiors.
                    </p>
                </li>
                <br/>
                <li>
                    <p className="text-md leading-relaxed text-justify">
                        <strong>The true inspiration –</strong> The true inspiration behind Palace on Wheels comes from the Viceroy of India, the <strong>Hyderabad Nizam families, and the Rajasthan Rajputana families.</strong> You get to notice the unmatched grandeur in the reflections of the rail coach design. The inspiration is a blend of carriages used by the great royals during these eras in Udaipur, Jodhpur, and Jaipur, when Maharajas liked to travel in royal comfort and luxury.
                    </p>
                </li>
                <br/>
                <li>
                    <p className="text-md leading-relaxed text-justify">
                        <strong>Late 1970s (The ideal birth) –</strong> The <strong>RTDC</strong>, also known as <strong>Rajasthan Tourism Development Corporation,</strong> is an undisputed part of Indian Railways. The Palace on Wheels concept was launched as a joint venture between RTDC and Indian Railways as a part of the tourism industry. The two authorities managed to retrieve traditional royal coaches when introducing this tourism to the general public. This was introduced to help offer a two-fold benefit- preserving the royal legacy and promoting the Heritage tourism of the state. These gave birth to the concept of Palace on Wheels.
                    </p>
                </li>
            </ul>
        </div>
      </section>
      {/* <section className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {[
            "Royal Suites",
            "Fine Dining",
            "Heritage Spa",
            "Private Safaris",
          ].map((item) => (
            <div
              key={item}
              className="p-8 border border-border hover:border-gold transition-all group bg-card"
            >
              <div className="w-12 h-12 bhagwa-gradient flex items-center justify-center mb-6 group-hover:animate-gold-shine">
                <Sparkles className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-serif text-maroon mb-3">{item}</h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                Experience the finest luxury service curated by our heritage
                experts.
              </p>
            </div>
          ))}
        </div>
      </section> */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Decorative Header */}
          <div className="text-center mb-16">
            <span className="text-bhagwa font-sans uppercase tracking-[0.4em] text-xs mb-4 block">
              Est. 1994
            </span>
            <h2 className="text-5xl font-serif text-maroon mb-6">
              A Legacy Carved in Stone
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] w-12 bg-gold/50"></div>
              <Sparkles className="text-gold" size={20} />
              <div className="h-[1px] w-12 bg-gold/50"></div>
            </div>
          </div>

          {/* Bulk Text Content */}
          <div className="editorjs-content space-y-8 text-justify">
            <p>
              The story of Lohagarh is not merely one of hospitality, but of
              preserving the architectural soul of Rajasthan. For decades, our
              group has meticulously restored havelis and fortified structures,
              ensuring that the intricate jali work and expansive courtyards of
              the past meet the discerning standards of the modern global
              traveler.
            </p>

            <p>
              Walking through our corridors, you will notice the seamless
              integration of
              <b>hand-carved sandstone</b> and contemporary <b>glass-dark</b>{" "}
              aesthetics. Every pillar tells a story of local craftsmanship,
              supported by a commitment to sustainable luxury that honors the
              earth as much as it honors our guests.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-12 items-center">
              <img
                src="https://www.thepalaceonwheels.org/storage/pow-exterior.jpeg"
                className="border border-gold/20"
                alt="Detail"
              />
              <p className="italic font-serif text-xl text-maroon/80">
                "We believe that true luxury lies in the details—the coolness of
                the marble, the scent of fresh marigolds, and the silence of a
                desert night."
              </p>
            </div>

            <p>
              As we expand our footprint across the heritage corridors of India,
              our guiding principle remains unchanged: to provide an sanctuary
              where time slows down. Whether it is a royal wedding or a quiet
              retreat, the Lohagarh experience is designed to be a living museum
              of comfort.
            </p>
          </div>
        </div>
      </section>
      <section className="py-20 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="bg-white border border-gold/10 shadow-xl overflow-hidden">
            {/* Tab Headers */}
            <div className="flex flex-wrap border-b border-border">
              {["Facilities", "Journey experience", "International awards", "Heritage"].map(
                (tab, i) => (
                  <button
                    key={tab}
                    className={`px-8 py-5 font-serif text-lg transition-all ${
                      i === 0
                        ? "bg-maroon text-gold"
                        : "hover:bg-muted text-maroon"
                    }`}
                  >
                    {tab}
                  </button>
                ),
              )}
            </div>

            {/* Tab Body */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row gap-12">
              <div className="lg:w-2/3 editorjs-content">
                <h3>Architectural Foundations</h3>
                <p>
                  The structural integrity of our resorts draws inspiration from
                  the
                  <i>Lohagarh Fort</i> (Iron Fort), known for its impregnable
                  mud walls. We utilize traditional lime-plastering techniques
                  that naturally regulate temperature, keeping our interiors
                  cool during the peak Rajasthani summers.
                </p>
                <ul>
                  <li>Original Sandstone Sourcing from local quarries.</li>
                  <li>
                    Inlay work (Parchin Kari) performed by master craftsmen.
                  </li>
                  <li>
                    Integration of smart-home technology within heritage
                    facades.
                  </li>
                </ul>
              </div>

              {/* Side Info Box (Similar to the reference image sidebar) */}
              <div className="lg:w-1/3 bg-background border-l-4 border-bhagwa p-6">
                <h4 className="font-serif text-maroon text-xl mb-4">
                  Quick Facts
                </h4>
                <table className="w-full text-sm font-sans">
                  <tbody className="divide-y divide-border">
                    <tr className="py-2 inline-block w-full">
                      <td className="font-bold text-maroon pr-4">Founded:</td>
                      <td className="text-muted-foreground">1994, Jaipur</td>
                    </tr>
                    <tr className="py-2 inline-block w-full">
                      <td className="font-bold text-maroon pr-4">Style:</td>
                      <td className="text-muted-foreground">
                        Indo-Saracenic Revival
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

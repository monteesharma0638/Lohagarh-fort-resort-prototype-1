import MotionDiv from "@/components/MotionDiv";
import HotelBreadcrumb from "@/components/HotelBreadcrumb";
import { MapPin } from "lucide-react";
import Image from "next/image";

function SectionDivider() {
  return (
    <div className="flex items-center gap-4 my-14">
      <div className="flex-1 h-[1px] bg-border" />
      <div className="w-1.5 h-1.5 rotate-45 bg-primary" />
      <div className="flex-1 h-[1px] bg-border" />
    </div>
  );
}

function ImagePlaceholder({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-muted border border-border flex items-center justify-center text-muted-foreground text-xs tracking-widest uppercase ${className}`}>
      Image
    </div>
  );
}

export default function RegalExperience() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-[#1E0800]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />

        <div className="absolute top-28 left-0 right-0 px-8 md:px-16">
          <div className="container mx-auto">
            <HotelBreadcrumb
              items={[
                { label: "Experiences", href: "/experiences" },
                { label: "Regal Experiences" },
              ]}
            />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="container mx-auto">
            <MotionDiv
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="flex items-center gap-2 text-primary text-xs tracking-[0.25em] uppercase font-bold mb-4">
                <MapPin size={14} /> Rajasthan, India
              </span>
              <h1 className="text-5xl md:text-7xl font-serif text-white hero-text-shadow leading-tight">
                Regal Experiences
              </h1>
              <p className="mt-5 text-white/70 text-lg max-w-2xl font-light leading-relaxed">
                Where India's royal legacy meets contemporary grandeur — an immersive celebration of culture, cuisine, and ceremony.
              </p>
            </MotionDiv>
          </div>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-6xl py-16">

        {/* Description */}
        <MotionDiv initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-4xl font-serif text-foreground mb-6">Description</h2>
          <div className="w-16 h-[2px] bg-primary mb-8" />
          <p className="text-foreground/70 text-lg leading-relaxed mb-6">
            Rajasthan is an amalgamation of Experiences to be lived in its diverse heritage. In the heart of Rajput country, you can find among Rajasthan's rich and varied heritage art traditions, divine stories, festivals, and adventure activities that are not found anywhere else in the country. From the grand palaces to the rolling dunes, every moment here is a living legend.
          </p>
          <p className="text-foreground/70 text-base leading-relaxed mb-6">
            Lohagarh Heritage stands as a proud custodian of this legacy, offering curated multi-day programs along 500 acres of meticulously managed grounds with 250 varieties of indigenous flora, creating an environment of timeless luxury and cultural immersion.
          </p>
          <p className="text-foreground/70 text-base leading-relaxed mb-8">
            Unique to Lohagarh Heritage is a calendar-year roster of cultural programs and performances — an invitation to live, not merely visit. Our expert concierge team and on-site guides ensure every encounter with Rajasthan's heritage is personal, purposeful, and deeply memorable.
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 text-foreground/70 text-sm">
            {[
              "Meetings & Conferences",
              "Incentive Programmes",
              "Corporate Events",
              "Themed Cultural Evenings",
              "Royal Dining Experiences",
              "Heritage & Nature Trails",
              "Traditional Art Workshops",
              "Destination Weddings",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </MotionDiv>

        {/* Gallery row – 4 placeholder images */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4"
        >
          {[
            "https://res.cloudinary.com/drayl5ppi/image/upload/v1773212409/lohagarh/images/hero/DSC03810_a2obbz.jpg",
            "https://res.cloudinary.com/drayl5ppi/image/upload/v1773212408/lohagarh/images/hero/edit8_spadua.jpg",
            "https://res.cloudinary.com/drayl5ppi/image/upload/v1773212407/lohagarh/images/hero/DSC03783_v1psxa.jpg",
            "https://res.cloudinary.com/drayl5ppi/image/upload/v1773212406/lohagarh/images/hero/DSC01586_qdlvzv.jpg"
          ].map((img, i) => (
            <Image key={i} src={img} alt="hello" width={300} height={200} className="aspect-[4/3]" />
          ))}
        </MotionDiv>
        <p className="text-center text-xs text-foreground/40 tracking-widest uppercase mb-2">Gallery</p>

        <SectionDivider />

        {/* ── Meetings & Conferences ──────────────────────────── */}
        <MotionDiv initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-4xl font-serif text-foreground mb-3">Meetings and Conferences</h2>
          <div className="w-16 h-[2px] bg-primary mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10">
            <div>
              <p className="text-foreground/70 text-base leading-relaxed mb-5">
                Set the stage for high-impact corporate meetings and landmark conferences amid the majestic fortifications of Rajasthan. Lohagarh Heritage offers state-of-the-art facilities seamlessly woven into a heritage environment — technology meets tradition in our fully equipped conference halls, open-air amphitheatres, and bespoke boardrooms.
              </p>
              <p className="text-foreground/70 text-base leading-relaxed mb-5">
                At Lohagarh Heritage, the Conference Rooms can be arranged for groups of up to 500+. The event team will help you select the format and seating arrangement best suited to your event.
              </p>
              <p className="text-foreground/70 text-base leading-relaxed">
                From formal board sessions to visionary leadership retreats, every detail is orchestrated to amplify focus, foster collaboration, and leave a lasting impression on every delegate.
              </p>
            </div>
            <div className="space-y-4">
              <Image src="https://res.cloudinary.com/drayl5ppi/image/upload/v1773212409/lohagarh/images/hero/DSC03810_a2obbz.jpg" alt="first image" width={400} height={200} className="w-full h-56" />
              <div className="grid grid-cols-2 gap-3">
                <Image src="https://res.cloudinary.com/drayl5ppi/image/upload/v1773212408/lohagarh/images/hero/edit8_spadua.jpg" alt="second image" width={300} height={300} className="aspect-[4/3]" />
                <Image src="https://res.cloudinary.com/drayl5ppi/image/upload/v1773212406/lohagarh/images/hero/DSC01586_qdlvzv.jpg" alt="second image" width={300} height={300} className="aspect-[4/3]" />
              </div>
            </div>
          </div>

          {/* Conference capacities */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-10">
            {[
              { venue: "Grand Durbar Hall", capacity: "500+", style: "Theatre / Banquet" },
              { venue: "Sheesh Mahal Room", capacity: "120", style: "Board / U-Shape" },
              { venue: "Garden Pavilion", capacity: "300", style: "Cocktail / Gala" },
              { venue: "Royal Terrace", capacity: "80", style: "Board / Hollow Square" },
            ].map((v) => (
              <div key={v.venue} className="border border-border p-6 bg-card">
                <p className="text-3xl font-serif text-primary mb-1">{v.capacity}</p>
                <p className="text-foreground font-semibold text-sm mb-1">{v.venue}</p>
                <p className="text-foreground/50 text-xs tracking-wider uppercase">{v.style}</p>
              </div>
            ))}
          </div> */}
        </MotionDiv>

        <SectionDivider />

        {/* ── Incentives ──────────────────────────────────────── */}
        <MotionDiv initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-4xl font-serif text-foreground mb-3">Incentives</h2>
          <div className="w-16 h-[2px] bg-primary mb-8" />

          <p className="text-foreground/70 text-base leading-relaxed mb-5">
            Inspire your top performers with an incentive programme unlike any other. At Lohagarh Heritage, every reward is a journey — through royal palaces, desert horizons, and candlelit evening spectacles that stay etched in memory long after the trip ends.
          </p>
          <p className="text-foreground/70 text-base leading-relaxed mb-5">
            Our incentive specialists design bespoke itineraries that blend exclusive access to heritage properties, private cultural experiences, adventure excursions, and lavish group dinners curated with authentic Rajasthani flavours. From a private elephant polo match on a heritage lawn to a starlit desert camp, we craft moments that motivate.
          </p>
          <p className="text-foreground/70 text-base leading-relaxed mb-10">
            At Lohagarh Heritage, all of our Rajasthan incentive packages are thoughtfully curated with premium accommodation, seamless ground transfers, dedicated event managers, and a suite of exclusive leisure activities to ensure your team's experience is truly world-class.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { image: "https://pub-ff97545f109a472fb64184a710a01a80.r2.dev/lohagarh-fort-resort/explore/private_trail.jpg", title: "Private Heritage Trail", desc: "An exclusive behind-the-scenes guided walk through centuries of Rajput history." },
              { image: "https://pub-ff97545f109a472fb64184a710a01a80.r2.dev/lohagarh-fort-resort/activities/outdoor-games-1.jpeg", title: "Royal Polo & Sports", desc: "Engage your team in ceremonial polo, archery, and traditional sporting spectacles." },
              { image: "https://lohagarhdesertresortjaisalmer.com/wp-content/uploads/2025/10/l6.png", title: "Desert Safari & Camp", desc: "Sunset camel rides, folk performances, and a private starlit dinner under Rajasthan skies." },
            ].map((item, i) => (
              <div key={i} className="border border-border overflow-hidden group">
                <Image src={item.image} alt="some alternative text" width={100} height={100} className="w-full h-44 group-hover:opacity-90 transition-opacity" />
                <div className="p-5">
                  <h4 className="font-serif text-lg text-foreground mb-2">{item.title}</h4>
                  <p className="text-foreground/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </MotionDiv>
        <div id="events"></div>
        <SectionDivider />
        {/* ── Events ──────────────────────────────────────────── */}
        <MotionDiv initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-4xl font-serif text-foreground mb-3">Events</h2>
          <div className="w-16 h-[2px] bg-primary mb-8" />

          <p className="text-foreground/70 text-base leading-relaxed mb-5">
            At Lohagarh Heritage, events are not just occasions — they are theatrical celebrations of royal grandeur. Whether you envision a glittering gala beneath a canopy of stars, a high-profile product launch within ancient fort walls, or a vibrant cultural festival showcasing Rajasthan's living traditions, our events team transforms your vision into an extraordinary reality.
          </p>
          <p className="text-foreground/70 text-base leading-relaxed mb-10">
            Our expansive grounds host events for 50 to 5,000 guests, with dedicated zones for themed décor, live performances, pyrotechnics, and fine dining experiences. Every element — from lighting and sound to bespoke menus and cultural acts — is managed in-house by our seasoned specialists.
          </p>

          {/* Large image strip */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
            <Image src="https://www.lohagarhfortresort.in/wp-content/uploads/2023/07/9.jpg" alt="Lohagarh Fort Resort" width={1200} height={300} className="aspect-video col-span-2 md:col-span-2" />
            <Image src="https://www.lohagarhfortresort.in/wp-content/uploads/2022/07/11-1.jpg" alt="Lohagarh Fort Resort" width={400} height={100} className="aspect-video" />
            <Image src="https://www.lohagarhfortresort.in/wp-content/uploads/2025/12/18.jpg" alt="Lohagarh Fort Resort" width={400} height={100} className="aspect-video" />
            <Image src="https://lohagarhdesertresortjaisalmer.com/wp-content/uploads/2025/11/bg.png" alt="Lohagarh Desert Resort" width={1200} height={300} className="aspect-video col-span-2 md:col-span-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-serif text-2xl text-foreground mb-3">Cultural Evenings</h4>
              <p className="text-foreground/70 text-sm leading-relaxed">
                Experience the soul of Rajasthan through classical Kathak recitals, vibrant Kalbelia folk dances, Manganiyar musical performances, and spectacular fire shows — all set against the illuminated backdrop of a heritage property that brings history to life.
              </p>
            </div>
            <div>
              <h4 className="font-serif text-2xl text-foreground mb-3">Corporate Galas</h4>
              <p className="text-foreground/70 text-sm leading-relaxed">
                From black-tie award nights to themed masquerade balls, our gala evenings are crafted with meticulous attention to ambiance, cuisine, and entertainment — ensuring your guests depart with memories that endure long after the applause fades.
              </p>
            </div>
          </div>
        </MotionDiv>

        <SectionDivider />

        {/* ── Dining ──────────────────────────────────────────── */}
        <MotionDiv initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-4xl font-serif text-foreground mb-3">Dining</h2>
          <div className="w-16 h-[2px] bg-primary mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10">
            <div>
              <p className="text-foreground/70 text-base leading-relaxed mb-5">
                Dine like the Maharajas — in grand courtyards, on royal terraces, or within opulent dining halls adorned with frescoes and chandeliers. Every meal at Lohagarh Heritage is a culinary journey through centuries of royal recipes, refined by our master chefs using locally sourced, organic ingredients.
              </p>
              <p className="text-foreground/70 text-base leading-relaxed mb-5">
                From lavish multi-course Rajasthani thalis to intimate candlelit dinners curated for two, from poolside barbecues to grand celebration banquets — each dining experience is conceived to delight the senses and honour the legacy of Rajput hospitality.
              </p>
              <p className="text-foreground/70 text-base leading-relaxed">
                Group dining is available for parties of 10 to 1,000. Our team of skilled culinary professionals and event planners are on hand to devise a bespoke menu reflecting your cultural preferences, dietary requirements, and themed expectations.
              </p>
            </div>
            <div className="space-y-3">
              <Image src="https://res.cloudinary.com/drayl5ppi/image/upload/v1773307031/lohagarh/images/dining/DSC02330_yyau8v.jpg" alt="Dining 1" width={500} height={300} className="w-full h-56" />
              <div className="grid grid-cols-2 gap-3">
                <Image src="https://res.cloudinary.com/drayl5ppi/image/upload/v1773307030/lohagarh/images/dining/DSC05329_iimkd5.jpg" alt="Dining 2" width={300} height={300} className="aspect-[4/3]" />
                <Image src="https://res.cloudinary.com/drayl5ppi/image/upload/v1773307030/lohagarh/images/dining/DSC02346_bf8sho.jpg" alt="Dining 3" width={300} height={300} className="aspect-[4/3]" />
              </div>
            </div>
          </div>

          {/* Dining venues */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Durbar Dining Hall", desc: "Grand banquet hall for up to 500 guests with royal décor and live music." },
              { name: "Sikargah", desc: "For a unique and immersive forest dining experience, Shikargah Restaurant is the perfect choice." },
              { name: "Townhall Restaurant", desc: "Curated spirits, heritage cocktails, and small plates in an intimate setting." },
              { name: "Sheesh Mahal", desc: "Casual daytime dining with views over manicured gardens and heritage architecture." },
              { name: "Gulab Mahal", desc: "Contemporary grills and light fare by the infinity pool, open all day." },
              { name: "Kothi Restaurant", desc: "Exclusive tasting menus for up to 12 guests in a fully private setting." },
            ].map((v, i) => ( 
              <div key={i} className="border-l-2 border-primary pl-5 py-1">
                <h4 className="font-serif text-lg text-foreground mb-1">{v.name}</h4>
                <p className="text-foreground/60 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </MotionDiv>

        <SectionDivider />

        {/* ── Recent Events & Conferences ─────────────────────── */}
        <MotionDiv initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-4xl font-serif text-foreground mb-3">Recent Events and Conferences</h2>
          <div className="w-16 h-[2px] bg-primary mb-8" />

          <p className="text-foreground/70 text-base leading-relaxed mb-10">
            Over the years, Lohagarh Heritage has been honoured to host some of India's most prestigious corporate and cultural gatherings. Below is a selection of recent events hosted at our properties.
          </p>

          {/* Event photos grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-12">
            {[
              "https://pub-ff97545f109a472fb64184a710a01a80.r2.dev/meetings/events.jpg", 
              "https://pub-ff97545f109a472fb64184a710a01a80.r2.dev/meetings/meeting_mahalkhas.jpg", 
              "https://pub-ff97545f109a472fb64184a710a01a80.r2.dev/meetings/meetings.jpg", 
              "https://pub-ff97545f109a472fb64184a710a01a80.r2.dev/meetings/meetings2.jpg", 
              "https://pub-ff97545f109a472fb64184a710a01a80.r2.dev/meetings/meetings_pow.jpg", 
              "https://pub-ff97545f109a472fb64184a710a01a80.r2.dev/meetings/rewards.jpg"
            ].map((img, i) => (
              <div  className="relative aspect-video w-[100%] h-60">
                <Image src={img} alt="Meeting & Conferences" fill key={i} style={{ objectFit: 'cover', objectPosition: 'center' }} />
              </div>
            ))}
          </div>

          {/* Partner / client logos */}
          {/* <div>
            <p className="text-xs tracking-[0.2em] uppercase text-foreground/40 text-center mb-8">Trusted By</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-px border border-border">
              {["Allianz", "ABB", "Johnson & Johnson", "Genpact", "Capgemini", "Carpet One",
                "IBM", "KPMG", "Deloitte", "EY", "PwC", "Accenture"].map((logo) => (
                <div
                  key={logo}
                  className="flex items-center justify-center h-20 bg-card border-b border-r border-border px-4 text-foreground/40 text-xs font-medium tracking-wider text-center"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div> */}
        </MotionDiv>

        {/* ── CTA Strip ───────────────────────────────────────── */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 bg-[#1E0800] p-12 text-center"
        >
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-4">Book an Experience</p>
          <h3 className="text-3xl md:text-4xl font-serif text-white mb-5">
            Ready to Create Unforgettable Moments?
          </h3>
          <p className="text-white/60 text-base mb-8 max-w-xl mx-auto leading-relaxed">
            Contact our dedicated events team to start planning your bespoke Regal Experience — from intimate gatherings to grand royal celebrations.
          </p>
          <a
            href="/contact"
            className="inline-block bg-primary text-white px-10 py-4 text-xs tracking-[0.2em] uppercase font-bold hover:bg-primary/90 transition-colors"
          >
            Enquire Now
          </a>
        </MotionDiv>

      </div>
    </div>
  );
}

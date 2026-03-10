"use client";

import {
  Clock,
  Utensils,
  Thermometer,
  Bed,
  Flower,
  MapPin,
  Mail,
  Phone,
  Download,
} from "lucide-react";

export default function HotelInformationSection() {
  return (
    <section className="bg-muted/30 py-28">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-start gap-6 mb-20">
          <span className="w-16 h-[1px] bg-primary mt-6"></span>

          <h2 className="font-serif text-3xl md:text-5xl text-primary leading-tight tracking-wide">
            HOTEL INFORMATION
          </h2>
        </div>

        {/* Info Grid */}
        <div className="grid lg:grid-cols-3 gap-12">

          {/* Column 1 */}
          <div className="space-y-8">

            <InfoItem
              title="CHECK IN – CHECK OUT"
              icon={<Clock size={18} />}
              text={
                <>
                  Check-in from 2:00 pm <br />
                  Check-out until noon
                </>
              }
            />

            <Divider />

            <InfoItem
              title="DINING"
              icon={<Utensils size={18} />}
              text="Multiple dining areas"
            />

            <Divider />

            <InfoItem
              title="CURRENT TEMPERATURE"
              icon={<Thermometer size={18} />}
              text="35.27°C"
            />
          </div>

          {/* Column 2 */}
          <div className="space-y-8 border-l border-border pl-10">

            <InfoItem
              title="ROOMS & SUITES"
              icon={<Bed size={18} />}
              text="12 stand-alone bungalows built beside a picturesque seasonal riverbed"
            />

            <Divider />

            <InfoItem
              title="WELLNESS"
              icon={<Flower size={18} />}
              text="Spa Therapies, Pool and In-room fitness equipment"
            />

            <Divider />

            <InfoItem
              title="HOTEL ESSENTIALS"
              text="GSTIN: 23AACCT1849D4ZL"
            />
          </div>

          {/* Column 3 */}
          <div className="space-y-8 border-l border-border pl-10">

            <div>
              <p className="text-xs tracking-widest text-muted-foreground mb-2">
                CONTACT
              </p>

              <div className="flex gap-3">
                <MapPin size={18} className="mt-1 text-muted-foreground" />
                <p className="text-sm leading-relaxed">
                  Baghvan, A Taj Safari - Pench National Park, Village Awargani
                  Pench National Park, Madhya Pradesh, 480881, India
                  <br />
                  <span className="text-gold uppercase text-xs tracking-wide cursor-pointer">
                    VIEW MAP
                  </span>
                </p>
              </div>
            </div>

            <Divider />

            <div className="flex gap-3 items-start">
              <Mail size={18} className="text-muted-foreground mt-1" />
              <p className="text-sm">tajsafaris@tajhotels.com</p>
            </div>

            <Divider />

            <div className="flex gap-3 items-start">
              <Phone size={18} className="text-muted-foreground mt-1" />
              <p className="text-sm">
                +91 97704 29399
                <br />
                +91 22660 11825
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Divider */}
        {/* <div className="border-t border-border mt-16 pt-10 flex justify-center">

          <button className="flex items-center gap-3 text-gold uppercase tracking-widest text-sm hover:opacity-70 transition">
            <Download size={18} />
            Download Factsheet
          </button>

        </div> */}
      </div>
    </section>
  );
}

function Divider() {
  return <div className="border-t border-border" />;
}

function InfoItem({
  title,
  icon,
  text,
}: {
  title: string;
  icon?: React.ReactNode;
  text: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs tracking-widest text-muted-foreground mb-2">
        {title}
      </p>

      <div className="flex gap-3 items-start">
        {icon && <span className="text-muted-foreground mt-1">{icon}</span>}
        <p className="text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
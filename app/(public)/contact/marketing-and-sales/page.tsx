import React from 'react';
import { Phone, Mail, MapPin, Smartphone } from 'lucide-react'; // Using lucide-react for icons
import { getPageDataByRoute } from '@/lib/db';

const contactOffices = [
  {
    title: "Mumbai Sales Office",
    location: "Mumbai",
    phones: ["+91 22 23535648", "+91 22 23514649"],
    fax: "+91 22 23526348",
    email: "sales.mumbai@hrhhotels.com"
  }
];

const SalesMarketing = async () => {
  const pageData = await getPageDataByRoute("/contact/marketing-and-sales");

  return (
    <section className="bg-white py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Title Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-serif text-gray-800 mb-2 underline decoration-primary underline-offset-8">
            Sales & Marketing
          </h1>
          <p className="text-secondary text-sm uppercase tracking-widest font-medium mt-6">
            Contact Information: Sales Offices
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pageData?.contacts?.map((office: any, index: number) => (
            <div 
              key={index} 
              className="border border-gray-100 p-8 shadow-sm bg-[#FFFEFA] hover:shadow-md transition-shadow duration-300"
            >
              {/* Header: Name or Title */}
              <div className="mb-6">
                <h3 className="text-xl font-serif text-gray-900 leading-tight">
                  {office.name || office.title}
                </h3>
                {office.designation && (
                  <p className="text-sm text-gray-600 mt-1">{office.designation}</p>
                )}
                <br />
                {office.mobile && (
                  <p className="text-sm text-gray-600 mt-1">Mobile: {office.mobile}</p>
                )}
                <p className="text-sm text-gray-600">Location - {office.location}</p>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                {office.ph && office.ph.map((phone: any, pIdx: number) => (
                  <div key={pIdx} className="flex items-center gap-4 group">
                    <div className="bg-gold p-1.5 rounded-sm">
                      <Phone size={14} className="text-white" />
                    </div>
                    <span className="text-sm text-gray-700 hover:text-[#C2A978] cursor-pointer">
                      {phone}
                    </span>
                  </div>
                ))}

                {office.fax && (
                  <div className="flex items-center gap-4">
                    <div className="bg-gold p-1.5 rounded-sm">
                      <Smartphone size={14} className="text-white" />
                    </div>
                    <span className="text-sm text-gray-700">{office.fax}</span>
                  </div>
                )}

                {office.email && (
                  <div className="flex items-center gap-4 group">
                    <div className="bg-gold p-1.5 rounded-sm">
                      <Mail size={14} className="text-white" />
                    </div>
                    <a 
                      href={`mailto:${office.email}`} 
                      className="text-sm text-gray-700 hover:text-[#C2A978] transition-colors"
                    >
                      {office.email}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SalesMarketing;
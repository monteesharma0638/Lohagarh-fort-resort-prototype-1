import React from 'react';
import { Phone, Mail, MapPin, Smartphone } from 'lucide-react'; // Using lucide-react for icons

const contactOffices = [
  {
    title: "Mumbai Sales Office",
    location: "Mumbai",
    phones: ["+91 22 23535648", "+91 22 23514649"],
    fax: "+91 22 23526348",
    email: "sales.mumbai@hrhhotels.com"
  },
  {
    name: "Ms. Ruchi Singh",
    mobile: "+91 99109 00630",
    location: "Delhi",
    phones: ["+91 11 40537019 23"],
    fax: "+91 11 40537024",
    email: "sales.delhi@hrhhotels.com"
  },
  {
    name: "Mr. Kunal Singh",
    mobile: "+91 99289 12889",
    location: "Udaipur",
    phones: ["+91 294 2528016-19"],
    fax: "+91 294 2528012",
    email: "sales.udaipur@hrhhotels.com"
  },
  {
    name: "Mr. Jitendra Singh Shekhawat",
    mobile: "+91 9928015306",
    location: "Bikaner",
    phones: ["+91 151 2524701-05"],
    email: "js.shekhawat@hrhhotels.com"
  },
  {
    name: "Ms. Sabina Bailey",
    mobile: "+44 7881 581 291",
    location: "UK",
    phones: ["+44 788 1581291"],
    fax: "+44 207 5048569",
    email: "sales.uk@hrhhotels.com"
  },
  {
    title: "Ahmedabad Sales Office",
    location: "Ahmedabad",
    email: "sales.ahm@hrhhotels.com"
  }
];

const SalesMarketing = () => {
  return (
    <section className="bg-white py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Title Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-serif text-gray-800 mb-2 underline decoration-primary underline-offset-8">
            Sales & Marketing
          </h1>
          <p className="text-secondary text-sm uppercase tracking-widest font-medium mt-6">
            Corporate Contact Information: Sales Offices
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactOffices.map((office, index) => (
            <div 
              key={index} 
              className="border border-gray-100 p-8 shadow-sm bg-[#FFFEFA] hover:shadow-md transition-shadow duration-300"
            >
              {/* Header: Name or Title */}
              <div className="mb-6">
                <h3 className="text-xl font-serif text-gray-900 leading-tight">
                  {office.name || office.title}
                </h3>
                {office.mobile && (
                  <p className="text-sm text-gray-600 mt-1">Mobile: {office.mobile}</p>
                )}
                <p className="text-sm text-gray-600">Location - {office.location}</p>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                {office.phones && office.phones.map((phone, pIdx) => (
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
import React from 'react';

const InvestorCard = ({ name, firm, tier, logoUrl }: any) => {
  return (
    <div className="group relative p-8 border border-neutral-200 bg-white transition-all duration-300 hover:shadow-2xl hover:border-neutral-800">
      {/* Subtle Corner Accent - Royal Minimalist detail */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-neutral-100 transition-colors group-hover:border-neutral-800" />
      
      <div className="flex flex-col items-center text-center">
        {/* Logo Container - No vibrant backgrounds, just grayscale/muted depth */}
        <div className="w-20 h-20 mb-6 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500">
          {logoUrl ? (
            <img src={logoUrl} alt={name} className="max-w-full h-auto opacity-80" />
          ) : (
            <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 font-serif italic">
              {name.charAt(0)}
            </div>
          )}
        </div>

        {/* Typography Hierarchy */}
        <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 mb-2 font-bold">
          {tier || "Lead Strategic Partner"}
        </span>
        
        <h3 className="text-xl font-light tracking-tight text-neutral-900 font-serif">
          {name}
        </h3>
        
        <p className="text-sm text-neutral-500 mt-1 font-sans">
          {firm}
        </p>

        {/* Minimalist interactive element */}
        <div className="mt-8 overflow-hidden h-px w-0 bg-neutral-800 transition-all duration-500 group-hover:w-full" />
      </div>
    </div>
  );
};

const InvestorsSection = () => {
  return (
    <section className="py-24 bg-[#FCFCFC]"> {/* Use the lightest tone from your palette */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-serif text-neutral-900 mb-4 tracking-tighter">Backed by Vision</h2>
          <div className="h-1 w-12 bg-neutral-900 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0"> {/* Gap-0 creates a high-end "tiled" look */}
          <InvestorCard name="Alexander Sterling" firm="Sterling Capital" tier="Series A Lead" />
          <InvestorCard name="Elena Vance" firm="Vance Global" tier="Institutional Partner" />
          <InvestorCard name="Julian Thorne" firm="Thorne Ventures" tier="Strategic Advisor" />
        </div>
      </div>
    </section>
  );
};

export default InvestorsSection;
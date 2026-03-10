const FeedbackSection = () => {
  return (
    <section className="bg-white py-20 px-6 font-serif">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-secondary tracking-tight mb-4">
            Enquiries & Feedback
          </h2>
          <div className="h-[1px] w-24 bg-primary mx-auto mb-6" />
          <p className="text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto font-sans">
            We value the insights of our partners and investors. Your feedback is essential 
            to our commitment to excellence and long-term strategic growth.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-secondary p-8 md:p-12 shadow-2xl">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Input Fields */}
            <div className="space-y-6">
              <input 
                type="text" 
                placeholder="First Name*" 
                className="w-full bg-transparent border border-gray-600 p-3 text-white text-sm focus:border-primary outline-none transition-colors"
              />
              <input 
                type="text" 
                placeholder="Last Name*" 
                className="w-full bg-transparent border border-gray-600 p-3 text-white text-sm focus:border-primary outline-none transition-colors"
              />
            </div>

            <div className="space-y-6">
              <input 
                type="email" 
                placeholder="Email Address*" 
                className="w-full bg-transparent border border-gray-600 p-3 text-white text-sm focus:border-primary outline-none transition-colors"
              />
              <select className="w-full bg-[#262626] border border-gray-600 p-3 text-gray-400 text-sm focus:border-primary outline-none">
                <option>Select Investor Type</option>
                <option>Institutional</option>
                <option>Individual</option>
                <option>Strategic Partner</option>
              </select>
            </div>

            {/* Textarea spans both columns */}
            <div className="md:col-span-2">
              <textarea 
                rows={5} 
                placeholder="Your Message / Enquiry*" 
                className="w-full bg-transparent border border-gray-600 p-3 text-white text-sm focus:border-primary outline-none transition-colors resize-none"
              />
            </div>

            {/* Submit Button - The "Royal" Accent */}
            <div className="md:col-span-2 mt-4">
              <button 
                type="submit" 
                className="w-full bg-primary hover:bg-gold text-secondary font-bold py-4 uppercase tracking-[0.2em] text-xs transition-all duration-300 shadow-lg"
              >
                Submit Enquiry
              </button>
              <p className="text-[10px] text-gray-400 mt-4 text-center uppercase tracking-widest">
                * All information is handled with strict confidentiality.
              </p>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
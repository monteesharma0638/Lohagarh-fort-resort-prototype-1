import EnquiryForm from "@/components/EnquiryForm";

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
          <EnquiryForm />
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
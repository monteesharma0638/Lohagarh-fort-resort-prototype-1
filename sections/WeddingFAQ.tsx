export const WeddingFAQ = () => {
  const faqs = [
    { q: "What is the best time for a wedding in Jaipur?", a: "The ideal months are from October to March when the weather is pleasant for outdoor ceremonies." },
    { q: "How many guests can the venue accommodate?", a: "We have multiple venues that can host from 100 to over 1,500 guests." },
    { q: "Do you provide in-house catering and decor?", a: "Yes, we offer comprehensive wedding packages including royal catering and customized decor themes." },
    { q: "Is there enough parking for wedding guests?", a: "Yes, we have extensive valet parking and dedicated spots for over 200 vehicles." }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-serif text-center mb-12 italic text-gray-900">
          Frequently Asked Questions About Weddings at Lohagarh
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details key={index} className="group border-b border-gray-100 pb-4">
              <summary className="flex justify-between items-center cursor-pointer list-none font-medium text-gray-800 py-2">
                <span className="text-lg">{faq.q}</span>
                <span className="text-[#C2A978] group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 text-sm leading-relaxed px-2">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
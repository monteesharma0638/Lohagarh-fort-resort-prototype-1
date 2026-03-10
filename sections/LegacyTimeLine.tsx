export const LegacyTimeline = () => {
  const milestones = [
    { year: '2023', title: 'Best Heritage Resort', body: 'Awarded for exceptional preservation of Rajasthani architecture.' },
    { year: '2021', title: 'Safety First Certification', body: 'Recognized for world-class hygiene standards during global challenges.' },
    { year: '2019', title: 'Top 10 Resorts in India', body: 'Voted by travelers on TripAdvisor for excellence in hospitality.' },
  ];

  return (
    <section className="py-20 bg-[#F9F8F6]">
      <div className="container mx-auto px-4 max-w-4xl">
        <h3 className="text-center text-3xl font-serif mb-16">Our Journey of Excellence</h3>
        <div className="space-y-12">
          {milestones.map((item, i) => (
            <div key={i} className="flex gap-8 group">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border border-[#C2A978] flex items-center justify-center text-[#C2A978] font-bold group-hover:bg-[#C2A978] group-hover:text-white transition-all">
                  {item.year}
                </div>
                {i !== milestones.length - 1 && <div className="w-px h-full bg-[#C2A978]/30 mt-4"></div>}
              </div>
              <div className="pb-8">
                <h4 className="text-xl font-serif text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
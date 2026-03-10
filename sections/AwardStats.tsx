export const AwardStats = () => {
  const stats = [
    { label: 'Overall Guest Rating', value: '4.7/5' },
    { label: 'Awards Won', value: '12+' },
    { label: 'Happy Guests', value: '50K+' },
    { label: 'Years of Excellence', value: '10+' },
  ];

  return (
    <div className="bg-[#1A1A1A] py-12 border-y border-[#C2A978]/20">
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-3xl md:text-4xl font-serif text-[#C2A978] mb-1">{stat.value}</div>
            <div className="text-[10px] md:text-xs tracking-widest text-gray-400 uppercase font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
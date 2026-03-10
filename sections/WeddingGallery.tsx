export const WeddingGallery = () => {
  const weddings = [
    { id: 1, name: 'Anjali & Rohit', img: 'https://www.lohagarhfortresort.in/wp-content/uploads/2026/03/11.webp' },
    { id: 2, name: 'Sanya & Karan', img: 'https://www.lohagarhfortresort.in/wp-content/uploads/2026/03/3.webp' },
    { id: 3, name: 'Meera & Arjun', img: 'https://www.lohagarhfortresort.in/wp-content/uploads/2024/02/3-1.jpg' },
    { id: 4, name: 'Priya & Vikram', img: 'https://www.lohagarhfortresort.in/wp-content/uploads/2024/02/4-4.jpg' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Intro Text */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Regal Weddings</h2>
          <p className="text-gray-600 leading-relaxed italic text-lg">
            "Experience the magic of a royal union where heritage meets modern luxury. 
            From grand mandaps to intimate celebrations, we curate every detail to perfection."
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {weddings.map((wedding) => (
            <div key={wedding.id} className="group text-center">
              <div className="overflow-hidden mb-4 rounded-sm border-[6px] border-[#F9F8F6] shadow-sm">
                <img 
                  src={wedding.img} 
                  alt={wedding.name} 
                  className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-serif text-gray-800 uppercase tracking-widest mb-3">
                {wedding.name}
              </h3>
              <button className="px-8 py-2 border border-[#C2A978] text-[#C2A978] text-xs uppercase tracking-tighter hover:bg-[#C2A978] hover:text-white transition-all duration-300">
                View Gallery
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
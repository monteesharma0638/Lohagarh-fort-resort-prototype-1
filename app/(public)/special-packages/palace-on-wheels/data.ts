// data.ts

export type SightseeingCard = {
  id: number;
  image: string;
  title: string;
  description: string;
};

export type Station = {
  id: number;
  name: string;
  pathPercentage: number; // 0 to 1, where on the SVG path this station sits
  sightseeing: SightseeingCard[];
};

export const itinerary: Station[] = [
  {
    id: 1,
    name: "New Delhi",
    pathPercentage: 0,
    sightseeing: [
      { id: 101, image: "https://images.unsplash.com/photo-1587474260584-1f65a12f5e3e?q=80&w=400", title: "Red Fort", description: "Mughal-era iconic fortress complex." },
      { id: 102, image: "https://images.unsplash.com/photo-1598971842068-19e0b11b15e3?q=80&w=400", title: "India Gate", description: "War memorial archway." },
      { id: 103, image: "https://images.unsplash.com/photo-1623165241031-64d4204c35e4?q=80&w=400", title: "Qutub Minar", description: "73m tapering tower of five storeys." },
      { id: 104, image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=400", title: "Humayun's Tomb", description: "Magnificent tomb of the Mughal Emperor." },
      { id: 105, image: "https://images.unsplash.com/photo-1549117180-87779f4c1be8?q=80&w=400", title: "Lotus Temple", description: "Notable Baháʼí House of Worship." },
      { id: 106, image: "https://images.unsplash.com/photo-1621515259960-9d224b179b0a?q=80&w=400", title: "Akshardham", description: "Massive Hindu temple complex." },
    ],
  },
  {
    id: 2,
    name: "Jaipur",
    pathPercentage: 0.15,
    sightseeing: [
      { id: 201, image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=400", title: "Hawa Mahal", description: "Palace of Winds with intricate windows." },
      { id: 202, image: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?q=80&w=400", title: "Amber Fort", description: "Majestic hilltop fort-palace complex." },
      { id: 203, image: "https://images.unsplash.com/photo-1629814421443-15be9b24ed67?q=80&w=400", title: "City Palace", description: "Royal residence & museum." },
      { id: 204, image: "https://images.unsplash.com/photo-1634262110263-fb0112e7cc33?q=80&w=400", title: "Jantar Mantar", description: "Astronomical observation site." },
    ],
  },
  {
    id: 3,
    name: "Sawai Madhupur",
    pathPercentage: 0.30,
    sightseeing: [
      { id: 301, image: "https://images.unsplash.com/photo-1616111100345-4a57b32a24fa?q=80&w=400", title: "Ranthambore Fort", description: "Formidable fort inside the national park." },
      { id: 302, image: "https://images.unsplash.com/photo-1598971842068-19e0b11b15e3?q=80&w=400", title: "Tiger Safari", description: "Spotting the elusive Bengal Tiger." },
    ],
  },
  {
    id: 4,
    name: "Udaipur",
    pathPercentage: 0.45,
    sightseeing: [
      { id: 401, image: "https://images.unsplash.com/photo-1605367679313-17277b07e868?q=80&w=400", title: "City Palace", description: "Massive palace complex on Lake Pichola." },
      { id: 402, image: "https://images.unsplash.com/photo-1591147113115-46f0ff524d77?q=80&w=400", title: "Lake Pichola", description: "Scenic lake boat ride." },
      { id: 403, image: "https://images.unsplash.com/photo-1605367679313-17277b07e868?q=80&w=400", title: "Jag Mandir", description: "Island palace on Lake Pichola." },
    ],
  },
  {
    id: 5,
    name: "Jaisalmer",
    pathPercentage: 0.60,
    sightseeing: [
      { id: 501, image: "https://images.unsplash.com/photo-1590716209211-ea74d5f63573?q=80&w=400", title: "Jaisalmer Fort", description: "Living fort carved from yellow sandstone." },
      { id: 502, image: "https://images.unsplash.com/photo-1591147113115-46f0ff524d77?q=80&w=400", title: "Sam Sand Dunes", description: "Camel safari in the Thar Desert." },
    ],
  },
  {
    id: 6,
    name: "Jodhpur",
    pathPercentage: 0.75,
    sightseeing: [
      { id: 601, image: "https://images.unsplash.com/photo-1590716209211-ea74d5f63573?q=80&w=400", title: "Mehrangarh Fort", description: "One of the largest forts in India." },
      { id: 602, image: "https://images.unsplash.com/photo-1605367679313-17277b07e868?q=80&w=400", title: "Umaid Bhawan", description: "Palace, museum, and luxury hotel." },
    ],
  },
  {
    id: 7,
    name: "Agra",
    pathPercentage: 0.90,
    sightseeing: [
      { id: 701, image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=400", title: "Taj Mahal", description: "Iconic white marble mausoleum." },
      { id: 702, image: "https://images.unsplash.com/photo-1588102371217-0d3c05128ff4?q=80&w=400", title: "Agra Fort", description: "Powerful red sandstone fortress." },
    ],
  },
  {
    id: 8,
    name: "New Delhi (Return)",
    pathPercentage: 1, // End of path
    sightseeing: [
      { id: 801, image: "https://images.unsplash.com/photo-1623165241031-64d4204c35e4?q=80&w=400", title: "Chandni Chowk", description: "Bustling historic market area." },
      { id: 802, image: "https://images.unsplash.com/photo-1587474260584-1f65a12f5e3e?q=80&w=400", title: "India Gate (Night)", description: "The memorial beautifully lit up." },
    ],
  },
];
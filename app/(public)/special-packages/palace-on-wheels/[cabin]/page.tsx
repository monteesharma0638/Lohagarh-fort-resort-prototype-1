import { motion } from "framer-motion";
import MotionDiv from "@/components/MotionDiv";
import Image from "next/image";

// Mock Data Structure matching your reference image
const cabinData: Record<string, any> = {
  "presidential-suite": {
    title: "Presidential Suite",
    banner:
      "https://palaceonwheels.rajasthan.gov.in/public/admin/images/cabins/d0c3251e901ddb2da7fbc01b2bdf2346e81cb4a91.png",
    description:
      "The Presidential Suite on the Palace on Wheels is a sanctuary of luxury, offering an unparalleled experience of royal living. These suites are designed to provide the ultimate comfort with expansive living spaces.",
    images: [
      "https://palaceonwheels.rajasthan.gov.in/public/admin/images/cabins/d0c3251e901ddb2da7fbc01b2bdf2346e81cb4a91.png",
      "https://palaceonwheels.rajasthan.gov.in/public/admin/images/cabins/cf4d850e12e9b0383fb345176815ec88b2e051b61.png",
    ],
    amenities: [
      "Fully air-conditioned environment",
      "High-speed internet access",
      "24x7 personal butler service",
      "Wake-up call and concierge assistance",
    ],
    cabinFeatures: [
      "240 sq. ft. expansive suite with a luxurious king-size bed",
      "En-suite bathroom with a jacuzzi and separate shower area",
      "Private in-cabin lounge area for relaxation or entertaining",
      "Two handcrafted armchairs with a center table, placed near a large window for enjoying drinks with scenic views",
      "Wide window for sightseeing during the journey",
      "Ceiling decorated with intricate Thikri work, reflecting traditional mirror artistry",
      "Flooring made of premium Vietnam marble, enhancing the elegance of the space",
      "LED TV for in-suite entertainment",
    ],
    luxuryFacilities: [
      "Fully air-conditioned environment",
      "Complimentary in-house drinks & beverages",
      "Private car and dedicated guide for sightseeing",
      "24x7 personal butler service",
      "Doctor on call and high-speed internet access",
      "Electronic safe for valuables",
      "Priority check-in and check-out assistance",
      "In-room dining available on request",
      "Daily housekeeping and turndown service",
      "Wake-up call and concierge assistance",
    ],
    details: {
      cabin_size: "225 sq. ft.",
      bed_type: "King Size Bed",
      occupancy: "Up to 3 Guests",
      features: [
        "Wi-Fi",
        "Mini Bar",
        "Ensuite Bathroom with Bathtub",
        "Climate Control",
      ],
    },
  },
  "deluxe-cabin": {
    title: "Deluxe Cabin",
    banner:
      "https://palaceonwheels.rajasthan.gov.in/public/admin/images/cabins/351cfb0933784814ea0c1293b5cda97917c07cea4.jpg",
    description:
      "The Presidential Suite on the Palace on Wheels is a sanctuary of luxury, offering an unparalleled experience of royal living. These suites are designed to provide the ultimate comfort with expansive living spaces.",
    images: [
      "https://palaceonwheels.rajasthan.gov.in/public/admin/images/cabins/351cfb0933784814ea0c1293b5cda97917c07cea4.jpg",
      "https://palaceonwheels.rajasthan.gov.in/public/admin/images/cabins/229aacc22c0903ee0cd034417ebfa336deda678a4.jpg",
    ],
    amenities: [
      "Fully air-conditioned environment",
      "High-speed internet access",
      "24x7 personal butler service",
      "Wake-up call and concierge assistance",
    ],
    cabinFeatures: [
      "131 sq. ft. cabin with twin sharing beds",
      "En-suite bathroom with shower",
      "Large window beside the bed for scenic views",
      "Traditional Rajasthani décor and refined interiors",
    ],
    luxuryFacilities: [
      "Fully air-conditioned environment",
      "Complimentary beverages served onboard",
      "24-hour butler service in each saloon",
      "Doctor on call",
      "Internet access",
      "Electronic safe for valuables",
      "Luxury amenities including fine loungewear and premium toiletries",
      "Daily housekeeping and turndown service",
      "Wake-up call and concierge assistance",
      "Personalized cabin service throughout the journey",
    ],
    details: {
      cabin_size: "225 sq. ft.",
      bed_type: "King Size Bed",
      occupancy: "Up to 3 Guests",
      features: [
        "Wi-Fi",
        "Mini Bar",
        "Ensuite Bathroom with Bathtub",
        "Climate Control",
      ],
    },
  },
  "suite-cabin": {
    title: "Suite Cabin",
    banner:
      "https://palaceonwheels.rajasthan.gov.in/public/admin/images/cabins/e1a3a942d373fcf4e96445f472c9396c3ef3f1872.png",
    description:
      "The Presidential Suite on the Palace on Wheels is a sanctuary of luxury, offering an unparalleled experience of royal living. These suites are designed to provide the ultimate comfort with expansive living spaces.",
    images: [
      "https://palaceonwheels.rajasthan.gov.in/public/admin/images/cabins/e1a3a942d373fcf4e96445f472c9396c3ef3f1872.png",
      "https://palaceonwheels.rajasthan.gov.in/public/admin/images/cabins/4c6c1c9d5f12dc223c31098634f5913807a73b2a2.png",
      "https://palaceonwheels.rajasthan.gov.in/public/admin/images/cabins/682e0d7f6764a3e1f36a31d766524be2ea51c59c2.png",
      "https://palaceonwheels.rajasthan.gov.in/public/admin/images/cabins/7e286f529eef94307d482ae2c87a0de6c012c3932.png",
    ],
    amenities: [
      "Fully air-conditioned environment",
      "High-speed internet access",
      "24x7 personal butler service",
      "Wake-up call and concierge assistance",
    ],
    cabinFeatures: [
      "Spacious 180 sq. ft. layout with queen-size bed",
      "En-suite bathroom with modern shower",
      "Large panoramic window for scenic views",
      "Traditional Rajasthani interiors and elegant furnishings",
    ],
    luxuryFacilities: [
      "Fully air-conditioned environment",
      "Complimentary in-house drinks & beverages",
      "Private car and dedicated guide for sightseeing",
      "24x7 personal butler service",
      "Doctor on call",
      "High-speed internet access",
      "Electronic safe for valuables",
      "Premium loungewear and luxury toiletries",
      "Priority check-in and check-out assistance",
      "In-room dining available on request",
      "Daily housekeeping and turndown service",
      "Wake-up call and concierge assistance",
    ],
    details: {
      cabin_size: "225 sq. ft.",
      bed_type: "King Size Bed",
      occupancy: "Up to 3 Guests",
      features: [
        "Wi-Fi",
        "Mini Bar",
        "Ensuite Bathroom with Bathtub",
        "Climate Control",
      ],
    },
  },
  "super-deluxe-cabin": {
    title: "Super Deluxe Cabin",
    description:
      "Experience the timeless elegance and warm hospitality of Rajasthan in our Super Deluxe Cabins, where heritage meets modern luxury.",
    banner:
      "https://palaceonwheels.rajasthan.gov.in/public/admin/images/cabins/8d6390650793d1d0af96f688dedb8ff2ccfbec263.jpg",
    images: [
      "https://palaceonwheels.rajasthan.gov.in/public/admin/images/cabins/8d6390650793d1d0af96f688dedb8ff2ccfbec263.jpg",
      "https://palaceonwheels.rajasthan.gov.in/public/admin/images/cabins/8d6390650793d1d0af96f688dedb8ff2ccfbec263.jpg",
    ],
    amenities: [
      "Silk Upholstery",
      "Hand-carved Furniture",
      "Dedicated Attendant",
    ],
    cabinFeatures: [
      "131 sq. ft. cabin with twin sharing beds",
      "En-suite bathroom with shower",
      "Large window beside the bed for scenic views",
      "Traditional Rajasthani décor and refined interiors",
    ],
    luxuryFacilities: [
      "Fully air-conditioned environment",
      "Complimentary beverages served onboard",
      "24-hour butler service in each saloon",
      "Doctor on call",
      "Internet access",
      "Electronic safe for valuables",
      "Luxury amenities including fine loungewear and premium toiletries",
      "Daily housekeeping and turndown service",
      "Wake-up call and concierge assistance",
      "Personalized cabin service throughout the journey",
    ],
    details: {
      cabin_size: "150 sq. ft.",
      bed_type: "Queen/Twin Beds",
      occupancy: "2 Guests",
      features: ["Electronic Safe", "Daily Newspaper", "Ensuite Shower"],
    },
  },
};

const CabinDetails = async ({ params }: { params: any }) => {
  const { cabin } = await params;
  console.log("🚀 ~ CabinDetails ~ slug:", cabin);
  const data = cabinData[cabin as string] || cabinData["presidential-suite"];

  return (
    <main className="bg-[#FAF9F6] min-h-screen pb-20">
      {/* 1. Header Section */}
      <div
        className="relative h-[80vh] flex items-center justify-center bg-secondary/30"
        style={{
          backgroundImage: `url('${data.banner}')`,
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-4">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="block text-sm tracking-[0.3em] uppercase mb-4 text-white">
              Luxury Accommodations
            </span>
            <h1 className="text-5xl md:text-8xl font-serif">{data.title}</h1>
          </MotionDiv>
        </div>
      </div>

      {/* 2. Image Collage Section */}
      <section className="max-w-7xl mt-20 mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.images.map((img: string, i: number) => (
            <MotionDiv
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2 }}
              className="aspect-[4/3] md:aspect-video relative overflow-hidden border border-gold/10 shadow-lg"
            >
              {/* <div className="absolute inset-0 bg-maroon/10 flex items-center justify-center font-serif italic text-maroon/30">
                {data.title} View {i + 1}
              </div> */}
              <Image src={img} alt={data.title} fill className="object-cover" />
            </MotionDiv>
          ))}
        </div>
      </section>

      {/* 3. Description & Details Section */}
      <section className="max-w-6xl mx-auto px-6 mt-20 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left: Description */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-serif text-maroon mb-6">Overview</h2>
          <p className="text-gray-700 font-sans leading-relaxed text-lg mb-10">
            {data.description}
          </p>

          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
              {/* Column 1: Cabin Features */}
              <div className="editorjs-content">
                <h3 className="text-maroon flex items-center gap-3 mb-8">
                  <span className="w-8 h-[1px] bg-gold/50"></span>
                  Cabin Features
                </h3>
                <ul className="space-y-4">
                  {data.cabinFeatures?.map((value: any, i: number) => (
                    <li key={i}>{value}</li>
                  ))}
                </ul>
              </div>

              {/* Column 2: Luxury Facilities */}
              <div className="editorjs-content">
                <h3 className="text-maroon flex items-center gap-3 mb-8">
                  <span className="w-8 h-[1px] bg-gold/50"></span>
                  Luxury Facilities
                </h3>
                <ul className="space-y-4 grid grid-cols-1 md:grid-cols-1 gap-x-8">
                  {data.luxuryFacilities?.map((value: any, i: number) => (
                    <li key={i}>{value}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Subtle Decorative Element */}
            <div className="mt-20 flex justify-center opacity-30">
              <div className="delimiter"></div>
            </div>
          </div>
        </div>

        {/* Right: Technical Details Table */}
        <div className="bg-white p-8 border border-gold/20 shadow-xl h-fit">
          <h3 className="text-xl font-serif text-maroon mb-6 border-b border-gold pb-4 uppercase tracking-wider">
            Cabin Specifications
          </h3>
          <dl className="space-y-6">
            {Object.entries(data.details).map(([key, value]: any) => (
              <div key={key}>
                <dt className="text-[10px] uppercase font-bold text-bhagwa tracking-widest mb-1">
                  {key.replace("_", " ")}
                </dt>
                <dd className="text-sm font-serif text-gray-800">
                  {Array.isArray(value) ? (
                    <ul className="list-disc list-inside space-y-1">
                      {value.map((v, idx) => (
                        <li key={idx}>{v}</li>
                      ))}
                    </ul>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <button className="w-full mt-10 bg-maroon text-gold py-4 font-sans font-bold uppercase tracking-[0.2em] text-xs hover:bg-bhagwa transition-colors duration-300">
            Check Availability
          </button>
        </div>
      </section>
    </main>
  );
};

export default CabinDetails;

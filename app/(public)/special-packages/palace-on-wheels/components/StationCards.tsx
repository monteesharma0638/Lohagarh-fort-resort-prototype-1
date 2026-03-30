import { motion } from "framer-motion";

export default function StationCards({ data }: any) {
  return (
    <motion.div
      key={data.name}
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-4 justify-center"
    >
      {data.places.map((place: any, i: number) => (
        <div
          key={i}
          className="w-60 bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden"
        >
          <img src={place.img} className="h-32 w-full object-cover" />
          <div className="p-3">
            <h3>{place.title}</h3>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
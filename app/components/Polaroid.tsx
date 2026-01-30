import { motion } from "framer-motion";

export default function Polaroid({
  feature,
  rotation,
  offsetY,
}: {
  feature: {
    image: string;
    title: string;
    desc: string;
  };
  rotation: number;
  offsetY: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: offsetY + 40 }}
      animate={{ opacity: 1, y: offsetY }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: offsetY - 10, rotate: rotation + 1 }}
      className="relative flex flex-col items-center"
      style={{ rotate: rotation }}
    >
      {/* CLOTHESPIN */}
      <div className="absolute -top-6 z-20">
        <div className="w-6 h-10 bg-amber-300 rounded-sm shadow-md border border-amber-400" />
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-amber-500" />
      </div>

      {/* POLAROID */}
      <div className="bg-white w-85 h-105 rounded-md shadow-2xl border border-gray-200">
        <img
          src={feature.image}
          alt={feature.title}
          className="w-[90%] mx-auto h-56 pt-6 object-cover"
        />

        <div className="p-7 text-center">
          <h3 className="text-2xl text-gray-800 font-bold mb-1">
            {feature.title}
          </h3>
          <p className="text-lg ibm-plex-sans text-gray-500">
            {feature.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

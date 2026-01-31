import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Polaroid({
  feature,
  rotation,
  offsetY,
  color,
  bgColor,
}: {
  feature: {
    image: string;
    title: string;
    desc: string;
  };
  rotation: number;
  offsetY: number;
  color: string;
  bgColor: string;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const mobileProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    whileHover: { y: -5, scale: 1.02 },
    style: { rotate: 0 }
  };

  const desktopProps = {
    initial: { opacity: 0, y: offsetY + 40 },
    animate: { opacity: 1, y: offsetY },
    transition: { duration: 0.6 },
    whileHover: { y: offsetY - 10, rotate: rotation + 1 },
    style: { rotate: rotation }
  };

  const animationProps = isMobile ? mobileProps : desktopProps;

  return (
    <motion.div
      {...animationProps}
      className="relative flex flex-col items-center w-full max-w-sm mx-auto"
    >
      {/* CLOTHESPIN */}
      <div className={`absolute z-20 ${isMobile ? 'hidden' : '-top-6'}`}>
        <div className="w-6 h-10 bg-amber-300 rounded-sm shadow-md border border-amber-400" />
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-amber-500" />
      </div>

      {/* TAPE */}
      <div className={`absolute z-20 ${!isMobile ? 'hidden' : '-top-3'}`}>
        <div className="w-15 h-5 bg-gray-100/50 shadow-md border border-gray-400/90" />
      </div>

      {/* POLAROID */}
      <div className={`${bgColor} w-full sm:w-85 h-auto sm:h-105 rounded-md shadow-2xl border border-gray-200`}>
        {/* Image */}
        <img
          src={feature.image}
          alt={feature.title}
          className="w-[90%] mx-auto h-48 sm:h-56 pt-4 sm:pt-6 object-cover rounded-t-md"
        />

        {/* Text Content */}
        <div className="p-4 sm:p-6 md:p-7 text-center">
          <h3 className={`text-lg sm:text-xl md:text-2xl ${color} font-bold mb-1 sm:mb-2`}>
            {feature.title}
          </h3>
          <p className="text-sm sm:text-base md:text-lg ibm-plex-sans text-gray-500 leading-relaxed">
            {feature.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
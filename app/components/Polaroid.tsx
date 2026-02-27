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
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
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
      className="relative flex flex-col items-center w-full max-w-7xl mx-auto"
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

      <div
        className={`${bgColor} rounded-md shadow-2xl border border-gray-200`}
        style={isMobile ? { width: '100%', height: 'auto' } : {
          width: 'clamp(180px, 23vw, 340px)',
          height: 'clamp(228px, 29vw, 432px)', 
        }}
      >
        {/* Image */}
        <img
          src={feature.image}
          alt={feature.title}
          className="w-[90%] mx-auto object-cover rounded-t-md"
          style={isMobile ? { height: '12rem', paddingTop: '1rem' } : {
            height: 'clamp(100px, 14vw, 224px)',
            paddingTop: 'clamp(8px, 1.5vw, 24px)', 
          }}
        />

        {/* Text Content */}
        <div
          className="text-center"
          style={isMobile ? { padding: '1rem 0.5rem' } : {
            padding: 'clamp(8px, 1vw, 28px) clamp(8px, 1.2vw, 20px)',
          }}
        >
          <h3
            className={`${color} font-bold`}
            style={{ fontSize: isMobile ? '1.125rem' : 'clamp(18px, 1.5vw, 25px)', marginBottom: '0.25rem' }}
          >
            {feature.title}
          </h3>
          <p
            className="ibm-plex-sans text-gray-600 leading-relaxed"
            style={{ fontSize: isMobile ? '1rem' : 'clamp(14px, 1.2vw, 20px)', marginBottom: '0.75rem' }}
          >
            {feature.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
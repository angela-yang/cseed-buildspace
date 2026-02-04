import { motion } from "framer-motion";
import Link from "next/link";

export default function PhotoGallery() {
  const photos = [
    { src: "/images/cohort-3/img22.webp", alt: "Buildspace 1", rotation: -2 },
    { src: "/images/cohort-0/img6.webp", alt: "Buildspace 2", rotation: 1 },
    { src: "/images/cohort-2/img7.webp", alt: "Buildspace 3", rotation: -1 },
  ];

  return (
    <section id="gallery" className="relative section py-20 md:py-25 px-[5vw] min-h-[80vh] mx-auto overflow-hidden">
      {/* Background Grid */}
      <div 
        className="absolute inset-0 opacity-95 pointer-events-none z-0"
        style={{
          backgroundImage: 'url(/images/grid.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Floating gradient blobs for depth */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-20 animate-pulse delay-1000" />

      <div className="relative z-10">
        {/* Title with enhanced styling */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-3">
            Buildspace Moments
          </h2>
          <div className="flex items-center justify-center gap-2">
            <motion.span 
              className="text-5xl md:text-6xl"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              📸
            </motion.span>
          </div>
        </motion.div>

        {/* Photo Grid with Polaroid-style cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              className={`${index > 0 ? 'hidden md:block' : ''}`}
              initial={{ opacity: 0, y: 50, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: photo.rotation }}
              transition={{ 
                delay: 0.2 + index * 0.15, 
                duration: 0.7,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -12, 
                rotate: 0,
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              {/* Polaroid-style card */}
              <div 
                className="bg-white rounded-lg shadow-2xl hover:shadow-3xl transition-all duration-300 p-4 cursor-pointer group"
                style={{
                  boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.3)",
                }}
              >
                {/* Image */}
                <div className="relative overflow-hidden rounded-md bg-gray-100">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Polaroid bottom space with tape effect */}
                <div className="mt-4 mb-2 relative">
                  <div className="h-1 w-20 bg-yellow-100 mx-auto rounded-full opacity-60 shadow-sm" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button with enhanced design */}
        <motion.div
          className="mt-16 md:mt-20 flex flex-col items-center gap-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Link href="/gallery">
            <motion.button
              className="relative overflow-hidden bg-[rgb(57,123,255)] text-white text-lg md:text-xl ibm-plex-sans font-bold px-10 py-4 rounded-full shadow-xl transition-all duration-300 group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              
              <span className="relative z-10 flex items-center gap-2">
                Explore our photo gallery!
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>
          </Link>
          
          <motion.p
            className="text-gray-600 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Over 500+ moments captured
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
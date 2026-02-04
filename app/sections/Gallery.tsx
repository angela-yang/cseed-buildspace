import { motion } from "framer-motion";
import Link from "next/link";

export default function PhotoGallery() {
  return (
    <section id="gallery" className="section py-24 px-[5vw] mx-auto">
      <h2 className="text-5xl font-bold text-center mb-2 mt-10 text-gray-900">
        Buildspace Moments 📸
      </h2>

      <motion.div
        className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <img
          src="/images/cohort-3/img22.webp"
          alt="Buildspace 1"
          className="w-full h-64 object-cover rounded-2xl shadow-lg"
        />

        <img
          src="/images/cohort-0/img6.webp"
          alt="Buildspace 2"
          className="hidden md:block w-full h-64 object-cover rounded-2xl shadow-lg"
        />

        <img
          src="/images/cohort-2/img7.webp"
          alt="Buildspace 3"
          className="hidden md:block w-full h-64 object-cover rounded-2xl shadow-lg"
        />
      </motion.div>

      <motion.div
        className="mt-10 z-20 flex justify-center items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        <Link href="/gallery">
          <button
            className="bg-[rgb(57,123,255)] hover:bg-[rgb(109,156,249)] text-white text-xl ibm-plex-sans font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            Explore our photo gallery!
          </button>
        </Link>
      </motion.div>
    </section>
  );
}


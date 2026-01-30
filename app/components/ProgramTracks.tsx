"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ProgramTracks() {
  const [activeTrack, setActiveTrack] = useState<number | null>(null);

  const tracks = [
    {
      name: "Software",
      image: "/images/green.png",
      width: 200,
      desc: "Learn to build full-stack applications and scalable software solutions.",
      yOffset: 200
    },
    {
      name: "Hardware",
      image: "/images/purple.png",
      width: 150,
      desc: "Dive into electronics, circuits, and embedded systems development.",
      yOffset: 250
    },
    {
      name: "Wildcard",
      image: "/images/pink.png",
      width: 210,
      desc: "Explore unconventional tracks and creative projects beyond standard boundaries.",
      yOffset: 300
    },
    {
      name: "Creatives",
      image: "/images/yellow.png",
      width: 210,
      desc: "Focus on design, visual storytelling, and creative problem-solving.",
      yOffset: 250
    }
  ];

  return (
    <section className="py-20">
      <motion.h3
        className="relative flex justify-center text-5xl md:text-6xl font-bold text-[rgb(55,58,65)] mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        4 Program Tracks
      </motion.h3>

      <div className="relative left-1/2 pt-10 pb-50 -translate-x-1/2 flex gap-4 justify-center items-end">
        {tracks.map((track, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center relative cursor-pointer"
            onClick={() =>
              setActiveTrack(activeTrack === index ? null : index)
            }
          >
            {/* Animated Icon */}
            <motion.div
              initial={{ y: track.yOffset, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.1 + index * 0.1,
                duration: 1.5,
                type: "spring",
                stiffness: 50
              }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ scale: 1.1, rotateY: 15, rotateX: 5 }}
            >
              <img
                src={track.image}
                alt={track.name}
                className="object-contain"
                style={{ width: track.width }}
              />
            </motion.div>
            <p className="mt-4 text-2xl font-semibold text-[rgb(55,58,65)]">
              {track.name}
            </p>

            {/* Description overlay */}
            {activeTrack === index && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: -40 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-0 w-64 md:w-72 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl text-center z-50"
              >
                <p className="text-gray-700 text-sm md:text-base">
                  {track.desc}
                </p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

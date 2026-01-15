"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import React, { useState, useEffect } from 'react';

export default function Projects() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e : MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <main className="cursor-none">
      {/* Custom Cursor */}
      <div
        className={`fixed pointer-events-none z-50 transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <img
          src="images/cursor.png"
          alt="cursor"
          className="w-6"
        />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center -translate-y-30 text-center z-10 px-4">
        <motion.h1
          className="text-7xl md:text-8xl font-bold text-[rgb(57,123,255)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Projects
        </motion.h1>

        <motion.h3
          className="mt-4 text-2xl md:text-3xl text-[rgb(57,123,255)] font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Take a look at previous cohorts' works!
        </motion.h3>
      </div>
    </main>
  )
}

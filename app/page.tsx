"use client"
import HomeNav from "./components/HomeNav"
import Background from "./components/Background"
import { motion } from "framer-motion"
import Link from "next/link"
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'text'>('default');

  useEffect(() => {
    const updateMousePosition = (e : MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement;
      
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.style.cursor === 'pointer') {
        setCursorType('pointer');
      } else if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        setCursorType('text');
      } else {
        setCursorType('default');
      }
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

  const cursorConfig = {
    default: {
      image: 'images/cursor.png',
      size: 'h-10'
    },
    pointer: {
      image: 'images/pointer-cursor.png',
      size: 'h-10'
    },
    text: {
      image: 'images/text-cursor.png',
      size: 'h-8'
    },
  };

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
          src={cursorConfig[cursorType].image}
          alt="cursor"
          className={`${cursorConfig[cursorType].size}`}
        />
      </div>

      <HomeNav />
      <Background />

      <div className="absolute inset-0 flex flex-col items-center justify-center -translate-y-30 text-center z-10 px-4">
        <motion.h1
          className="text-10xl md:text-9xl font-bold text-[rgb(57,123,255)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          BUILDSPACE
        </motion.h1>

        <motion.h3
          className="mt-4 text-3xl md:text-4xl text-[rgb(57,123,255)] font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          6 weeks to bring your ideas → reality!
        </motion.h3>

        <motion.div
          className="mt-10 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <Link href="/projects">
            <button className="bg-[rgb(57,123,255)] hover:bg-[rgb(109,156,249)] text-white text-xl font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
              Explore projects
            </button>
          </Link>
        </motion.div>

        <div className="absolute left-1/2 -translate-x-1/2 w-[70vw] h-[400px]">
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 1.5, type: "spring", stiffness: 50 }}
            className="absolute top-[22%] left-[5%]"
          >
            <img
              src={"/images/green.png"}
              alt="Green Square"
              className="object-contain"
              style={{ width: "100px" }}
            />
          </motion.div>

          <motion.div
            initial={{ y: 250, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1.5, type: "spring", stiffness: 50 }}
            className="absolute top-[48%] left-[78%]"
          >
            <img
              src={"/images/purple.png"}
              alt="Purple Circle"
              className="object-contain"
              style={{ width: "80px" }}
            />
          </motion.div>

          <motion.div
            initial={{ y: 300, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1.5, type: "spring", stiffness: 50 }}
            className="absolute top-[6%] left-[68%]"
          >
            <img
              src={"/images/pink.png"}
              alt="Pink Flower"
              className="object-contain"
              style={{ width: "90px" }}
            />
          </motion.div>

          <motion.div
            initial={{ y: 250, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1.2, type: "spring", stiffness: 50 }}
            className="absolute top-[56%] left-[18%]"
          >
            <img
              src={"/images/yellow.png"}
              alt="Yellow Star"
              className="object-contain"
              style={{ width: "100px" }}
            />
          </motion.div>
        </div>
      </div>
    </main>
  )
}

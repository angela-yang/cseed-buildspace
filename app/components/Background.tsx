"use client"
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Background() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = ((e.clientX - innerWidth / 2) / innerWidth) * -30;
      const y = ((e.clientY - innerHeight / 2) / innerHeight) * -30;
      setOffset({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const parallaxStyle = (xFactor: number, yFactor: number) => ({
    transform: `translate(${offset.x * xFactor}px, ${offset.y * yFactor}px)`,
  });

  return (
    <main className="min-h-[300vh] relative">
      <div 
        className="absolute inset-0 opacity-80 pointer-events-none z-0"
        style={{
          backgroundImage: 'url(/images/grid.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div className="absolute w-full h-full">
        {/* Main graphic on top */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 2 }}
          className="absolute left-1/2 top-[50vh] -translate-x-1/2"
        >
          <div style={parallaxStyle(0.9, 0.8)}>
            <img
              src={"/images/graphic.png"}
              alt="Buildspace Graphic"
              className="object-contain"
              style={{ maxWidth: "85vw" }}
            />
          </div>
        </motion.div>

        {/* 4 Program Tracks */}
        <motion.h3
          className="absolute left-1/2 top-[150vh] -translate-x-1/2 text-3xl md:text-3xl text-[rgb(34,36,42)] font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          4 Program Tracks
        </motion.h3>

        <div className="absolute left-1/2 top-[160vh] -translate-x-1/2 flex gap-4 justify-center items-center">
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 1.5, type: "spring", stiffness: 50 }}
          >
            <div style={parallaxStyle(1.2, 0.4)}>
              <img
                src={"/images/green.png"}
                alt="Green Square"
                className="object-contain"
                style={{ width: "200px" }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 250, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1.5, type: "spring", stiffness: 50 }}
          >
            <div style={parallaxStyle(0.8, 0.7)}>
              <img
                src={"/images/purple.png"}
                alt="Purple Circle"
                className="object-contain"
                style={{ width: "150px" }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 300, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1.5, type: "spring", stiffness: 50 }}
          >
            <div style={parallaxStyle(1.5, 1.0)}>
              <img
                src={"/images/pink.png"}
                alt="Pink Flower"
                className="object-contain"
                style={{ width: "210px" }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 250, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1.2, type: "spring", stiffness: 50 }}
          >
            <div style={parallaxStyle(1.5, 1.0)}>
              <img
                src={"/images/yellow.png"}
                alt="Yellow Star"
                className="object-contain"
                style={{ width: "210px" }}
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="relative pt-[200vh] text-center text-4xl text-[rgb(57,123,255)] font-light z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          What is Buildspace?
        </motion.div>
      </div>
    </main>
  );
}
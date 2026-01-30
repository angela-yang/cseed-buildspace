"use client"
import { useState, useEffect, } from "react";
import { motion } from "framer-motion";
import DraggableToy from "../components/DraggableToy"

export default function Landing() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
    <main id="home" className="section min-h-[110vh] relative">
      <div className="absolute inset-0 flex flex-col items-center justify-center -translate-y-40 text-center z-10 px-4">
        <motion.h1
          className="text-8xl md:text-9xl font-bold text-[rgb(57,123,255)]"
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
          <button
            onClick={() =>
              document.getElementById("projects")?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className="bg-[rgb(57,123,255)] hover:bg-[rgb(109,156,249)] text-white text-xl font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            Explore projects
          </button>
        </motion.div>

        <div className="absolute left-1/2 -translate-x-1/2 w-[70vw] h-[400px]">
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 1.5, type: "spring", stiffness: 50 }}
            className="absolute top-[22%] left-[5%]"
          >
            <DraggableToy 
              imageSrc="/images/green.png"
              initialX={0} 
              initialY={0} 
              size="100px"
            />
          </motion.div>

          <motion.div
            initial={{ y: 250, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1.5, type: "spring", stiffness: 50 }}
            className="absolute top-[48%] left-[78%]"
          >
            <DraggableToy 
              imageSrc="/images/purple.png"
              initialX={0} 
              initialY={0} 
              size="80px" 
            />
          </motion.div>

          <motion.div
            initial={{ y: 300, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1.5, type: "spring", stiffness: 50 }}
            className="absolute top-[6%] left-[68%]"
          >
            <DraggableToy 
              imageSrc="/images/pink.png"
              initialX={0} 
              initialY={0} 
              size="90px"
              showHint
            />
          </motion.div>

          <motion.div
            initial={{ y: 250, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1.2, type: "spring", stiffness: 50 }}
            className="absolute top-[56%] left-[18%]"
          >
            <DraggableToy 
              imageSrc="/images/yellow.png"
              initialX={0} 
              initialY={0} 
              size="100px" 
            />
          </motion.div>
        </div>
      </div>
      
      <div className="absolute w-full h-full">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 2 }}
          className="absolute left-1/2 top-[55vh] -translate-x-1/2"
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
      </div>
    </main>
  );
}
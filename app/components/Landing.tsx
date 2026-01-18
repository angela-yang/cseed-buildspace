"use client"
import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";

interface DraggableProps {
  imageSrc: string;
  initialX: number;
  initialY: number;
  size?: number;
}

const DraggableToy = ({ imageSrc, initialX, initialY, size = 80 }: DraggableProps) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const velocityRef = useRef({ x: 0, y: 0 });
  const lastPosRef = useRef({ x: 0, y: 0 });

  const { floatY, floatScale, duration, delay } = useMemo(() => {
      return {
        floatY: -5 - Math.random() * 10, 
        floatScale: 1 + Math.random() * 0.05,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2,
      };
    }, []);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - lastPosRef.current.x;
      const deltaY = e.clientY - lastPosRef.current.y;

      velocityRef.current = { x: deltaX * 0.3, y: deltaY * 0.3 }; // Reduced velocity

      setPosition(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));

      lastPosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      setIsDragging(false);

      // Apply gentle momentum
      let animationId: number;
      const applyMomentum = () => {
        velocityRef.current.x *= 0.92; // More friction
        velocityRef.current.y *= 0.92;

        setPosition(prev => ({
          x: prev.x + velocityRef.current.x,
          y: prev.y + velocityRef.current.y
        }));

        if (Math.abs(velocityRef.current.x) > 0.3 || Math.abs(velocityRef.current.y) > 0.3) {
          animationId = requestAnimationFrame(applyMomentum);
        }
      };

      animationId = requestAnimationFrame(applyMomentum);
      
      return () => cancelAnimationFrame(animationId);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    velocityRef.current = { x: 0, y: 0 }; // Reset velocity
  };

  return (
    <motion.div
      data-cursor="pointer"
      className="absolute cursor-grab active:cursor-grabbing select-none pointer-events-auto"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size}px`,
        height: `${size}px`,
        transition: isDragging ? 'none' : 'transform 0.1s ease-out'
      }}
      animate={{
        y: [0, floatY, 0], // moves up floatY px and back
        scale: [1, floatScale, 1], // slightly grows and shrinks
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay,
      }}
      onMouseDown={handleMouseDown}
    >
      <img
        src={imageSrc}
        alt="draggable"
        data-cursor="pointer" 
        className="w-full h-full object-contain cursor-pointer"
        style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}
        draggable={false}
      />
    </motion.div>
  );
};

export default function Landing() {
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
    <main id="home" className="section min-h-[150vh] relative">
      <div className="absolute inset-0 flex flex-col items-center justify-center -translate-y-75 text-center z-10 px-4">
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
              size={100} 
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
              size={80} 
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
              size={90} 
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
              size={100} 
            />
          </motion.div>
        </div>
      </div>
      
      <div className="absolute w-full h-full">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 2 }}
          className="absolute left-1/2 top-[55vh] mb-10 -translate-x-1/2"
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
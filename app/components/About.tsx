"use client"
import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";

const ScrollReveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {children}
    </div>
  );
};

interface DraggableProps {
  imageSrc: string;
  initialX: number;
  initialY: number;
  size?: string;
}

const DraggableToy = ({ imageSrc, initialX, initialY, size = "80px" }: DraggableProps) => {
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
      className="absolute cursor-grab active:cursor-grabbing select-none pointer-events-auto"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: size,
        height: size,
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
        className="w-full h-full object-contain"
        style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}
        draggable={false}
      />
    </motion.div>
  );
};

export default function About() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
    <main>
      <section
        id="about" 
        className="section py-24 px-10 relative"
      >
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
              className="absolute w-36 h-36 bg-yellow-400 rounded-full opacity-60 top-[10%] left-[10%]"
              style={{ transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * 0.7}px)` }}
          />
          <div
              className="absolute w-24 h-24 bg-pink-500 rounded-2xl opacity-60 top-[20%] right-[15%]"
              style={{ transform: `translate(${mousePos.x * -1}px, ${mousePos.y * 1}px)` }}
          />
          <div
              className="absolute w-28 h-28 bg-purple-500 opacity-60 top-[75%] right-[53%]"
              style={{
              borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
              transform: `translate(${mousePos.x * 1}px, ${mousePos.y * -0.3}px)`
              }}
          />
        </div>

        <ScrollReveal>
          <h2 className="text-5xl font-bold text-center mb-12 text-[rgb(57,123,255)]">
            What is Buildspace?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
            {[
              { image: '/images/passion.png', title: 'Passion', desc: 'Build your dreams' },
              { image: '/images/community2.png', title: 'Community', desc: 'Connect with amazing people + mentors' },
              { image: '/images/accountability.png', title: 'Acountability', desc: 'Be held accountable to finish your project' }
            ].map((card, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div className="bg-white rounded-2xl p-10 mb-10 shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:rotate-2 transition-all duration-300">
                  <img
                    src={card.image}
                    className="object-contain mb-5"
                    style={{ width: "50" }}
                  />
                  <h3 className="text-2xl font-bold mb-4 text-[rgb(57,123,255)]">{card.title}</h3>
                  <p className="text-gray-600">{card.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* 4 Program Tracks */}
      <motion.h3
        className="relative flex justify-center mt-15 text-6xl md:text-5xl text-[rgb(55,58,65)] font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        4 Program Tracks
      </motion.h3>

      <div className="relative left-1/2 pt-10 pb-10 -translate-x-1/2 flex gap-4 justify-center items-end">
        <motion.div
          initial={{ y: 200, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 1.5, type: "spring", stiffness: 50 }}
          className="flex flex-col items-center"
        >
          <motion.div 
            style={parallaxStyle(1.2, 0.4)}
            whileHover={{ scale: 1.1, rotateY: 15, rotateX: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src={"/images/green.png"}
              alt="Green Square"
              className="object-contain"
              style={{ width: "200px" }}
            />
          </motion.div>
          <p className="mt-4 text-2xl font-semibold text-[rgb(55,58,65)]">software</p>
        </motion.div>

        <motion.div
          initial={{ y: 250, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 1.5, type: "spring", stiffness: 50 }}
          className="flex flex-col items-center"
        >
          <motion.div 
            style={parallaxStyle(0.8, 0.7)}
            whileHover={{ scale: 1.1, rotateY: 15, rotateX: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src={"/images/purple.png"}
              alt="Purple Circle"
              className="object-contain mb-5"
              style={{ width: "150px" }}
            />
          </motion.div>
          <p className="mt-4 text-2xl font-semibold text-[rgb(55,58,65)]">hardware</p>
        </motion.div>

        <motion.div
          initial={{ y: 300, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1.5, type: "spring", stiffness: 50 }}
          className="flex flex-col items-center"
        >
          <motion.div 
            style={parallaxStyle(1.5, 1.0)}
            whileHover={{ scale: 1.1, rotateY: 15, rotateX: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src={"/images/pink.png"}
              alt="Pink Flower"
              className="object-contain"
              style={{ width: "210px" }}
            />
          </motion.div>
          <p className="mt-4 text-2xl font-semibold text-[rgb(55,58,65)]">wildcard</p>
        </motion.div>

        <motion.div
          initial={{ y: 250, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1.2, type: "spring", stiffness: 50 }}
          className="flex flex-col items-center"
        >
          <motion.div 
            style={parallaxStyle(1.5, 1.0)}
            whileHover={{ scale: 1.1, rotateY: 15 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src={"/images/yellow.png"}
              alt="Yellow Star"
              className="object-contain"
              style={{ width: "210px" }}
            />
          </motion.div>
          <p className="mt-4 text-2xl font-semibold text-[rgb(55,58,65)]">creatives</p>
        </motion.div>
      </div>

      {/* Timeline */}
      <section className="section min-h-[50vh] flex flex-col justify-center items-center text-center relative mb-50">
        <h2 className="text-5xl font-bold text-center mt-15 mb-8 text-[rgb(57,123,255)]">
          Weekly Cohort Meetings
        </h2>
        <p className="text-3xl text-center text-gray-600">
          Weekly opportunity to make progress (2 hrs/wk) and receive feedback from experienced mentors.
        </p>

        <motion.div
          className="relative flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1.2, type: "spring", stiffness: 50 }}
        >
          <DraggableToy imageSrc="/images/ruler.png" initialX={-400} initialY={-250} size="50vw" />
        </motion.div>
      </section>

      {/* Hero Section */}
      {/* <section
        id="hero"
        className="section min-h-[80vh] flex flex-col justify-center items-center text-center relative bg-gradient-to-br from-indigo-600 to-purple-700 text-white pt-20"
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <DraggableToy imageSrc="/images/purple.png" initialX={200} initialY={150} size="80px" />
          <DraggableToy imageSrc="/images/yellow.png" initialX={1000} initialY={100} size="80px" />
          <DraggableToy imageSrc="/images/green.png" initialX={1200} initialY={400} size="80px" />
          <DraggableToy imageSrc="/images/pink.png" initialX={700} initialY={500} size="80px" />
        </div>
        <h1 className="text-8xl font-black mb-5 animate-[fadeInUp_1s_ease-out]">BUILD THE FUTURE</h1>
      </section> */}
   </main> 
  );
}
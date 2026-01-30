"use client"
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import DraggableToy from "../components/DraggableToy"
import HoverText from "../components/HoverText"
import Polaroid from "../components/Polaroid"
import PhotoGallery from "../sections/PhotoGallery"

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

export default function About() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeFeature, setActiveFeature] = useState(0);

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

  const features = [
    { 
      image: '/images/passion.jpg', 
      title: '1. Build your passion', 
      desc: 'Commit to a project youre passionate about, and report your weekly progress.',
      color: 'from-orange-400 to-pink-500',
      bgColor: 'bg-gradient-to-br from-orange-50 to-pink-50'
    },
    { 
      image: '/images/community.jpg', 
      title: '2. Meet the community', 
      desc: 'Connect with a space of other passionate people, and learn from experiences mentors.',
      color: 'from-blue-400 to-purple-500',
      bgColor: 'bg-gradient-to-br from-blue-50 to-purple-50'
    },
    { 
      image: '/images/showcase.jpg', 
      title: '3. Showcase your project!', 
      desc: 'At the end of the 6 weeks, showcase your project and display the fruition of your work.',
      color: 'from-green-400 to-teal-500',
      bgColor: 'bg-gradient-to-br from-green-50 to-teal-50'
    }
  ];

  return (
    <main id="about" className="section">
      <section
        className="py-24 px-10 mt-60 relative"
      >
        {/* Overview */}
        <ScrollReveal>
          <h2 className="text-5xl font-bold text-center my-14 text-[rgb(57,123,255)]">
            What is Buildspace?
          </h2>

          <HoverText />

          <div className="relative max-w-7xl mx-auto px-6">
            <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[100vw] max-w-5xl h-[2px]">
                <svg
                  viewBox="0 0 600 200"
                  className="string"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 50 80 Q 300 140 550 80"
                    fill="none"
                    stroke="#b89879ff"
                    strokeWidth="3"
                  />
                </svg>
              </div>
            <div className="relative flex justify-center gap-20 -mt-10">
              {features.map((feature, index) => {
                return (
                  <Polaroid
                    key={index}
                    feature={feature}
                    rotation={index === 0 ? 6 : index === 1 ? -1 : -5}
                    offsetY={index === 0 ? 15 : index === 1 ? 50 : 15}
                  />
                );
              })}
            </div>
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

      <div className="relative left-1/2 pt-10 pb-50 -translate-x-1/2 flex gap-4 justify-center items-end">
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

      {/* Timeline 
      <section className="min-h-[50vh] flex flex-col justify-center items-center text-center relative mb-50">
        <h2 className="text-5xl font-bold text-center mt-15 mb-8 text-[rgb(57,123,255)] z-10">
          Weekly Cohort Meetings
        </h2>
        <p className="text-3xl text-center text-gray-600 z-10">
          Weekly opportunity to make progress (2 hrs/wk) and receive feedback from experienced mentors.
        </p>

        <motion.div
          className="relative flex justify-center z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1.2, type: "spring", stiffness: 50 }}
        >
          <DraggableToy imageSrc="/images/ruler.png" initialX={-400} initialY={-250} size="50vw" />
        </motion.div>
      </section>*/}
   </main> 
  );
}
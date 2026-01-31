"use client"
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Background from "../components/Background"
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
  const [showDesc, setShowDesc] = useState(false);
  const [showDesc1, setShowDesc1] = useState(false);
  const [showDesc2, setShowDesc2] = useState(false);
  const [showDesc3, setShowDesc3] = useState(false);
  const aboutSectionRef = useRef<HTMLElement>(null);

  const tracks = [
    {
      image: "/images/green.png",
      name: "software",
      desc: "Learn to build full-stack applications and scalable software solutions.",
      showDesc: showDesc,
      setShowDesc: setShowDesc,
      width: "200px",
      parallax: { x: 1.2, y: 0.4 }
    },
    {
      image: "/images/purple.png",
      name: "hardware",
      desc: "Dive into electronics, circuits, and embedded systems development.",
      showDesc: showDesc1,
      setShowDesc: setShowDesc1,
      width: "150px",
      parallax: { x: 0.8, y: 0.7 }
    },
    {
      image: "/images/pink.png",
      name: "wildcard",
      desc: "Explore unconventional tracks and creative projects beyond standard boundaries.",
      showDesc: showDesc2,
      setShowDesc: setShowDesc2,
      width: "210px",
      parallax: { x: 1.5, y: 1.0 }
    },
    {
      image: "/images/yellow.png",
      name: "creatives",
      desc: "Focus on design, visual storytelling, and creative problem-solving.",
      showDesc: showDesc3,
      setShowDesc: setShowDesc3,
      width: "210px",
      parallax: { x: 1.5, y: 1.0 }
    }
  ];

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
      color: 'text-[rgb(255,0,102)]',
      bgColor: 'bg-gradient-to-br from-orange-50 to-pink-50'
    },
    { 
      image: '/images/community.jpg', 
      title: '2. Meet the community', 
      desc: 'Connect with a space of other amazing people, and learn from experienced mentors.',
      color: 'text-[rgb(136,0,185)]',
      bgColor: 'bg-gradient-to-br from-blue-50 to-purple-50'
    },
    { 
      image: '/images/showcase.jpg', 
      title: '3. Showcase your project!', 
      desc: 'At the end of the 6 weeks, showcase your project and display the fruition of your work.',
      color: 'text-[rgb(19,163,122)]',
      bgColor: 'bg-gradient-to-br from-green-50 to-teal-50'
    }
  ];

  return (
    <main id="about" className="section">
      <section
        ref={aboutSectionRef} className="py-24 px-10 mt-60 relative"
      >
        <Background sectionRef={aboutSectionRef} />
        {/* Overview */}
        <ScrollReveal>
          <h2 className="text-5xl font-bold text-center my-14 text-[rgb(57,123,255)]">
            What is Buildspace?
          </h2>

          <HoverText />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            {/* Desktop: String decoration */}
            <div className="hidden md:block absolute top-[-150px] left-1/2 -translate-x-1/2 w-[100vw] max-w-5xl h-[2px]">
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

            {/* Responsive Polaroids Layout */}
            <div className="relative flex flex-col md:flex-row justify-center gap-6 md:gap-20 -mt-0 md:-mt-10">
              {features.map((feature, index) => (
                <div key={index} className="w-full md:w-auto flex justify-center">
                  <Polaroid
                    feature={feature}
                    rotation={index === 0 ? 6 : index === 1 ? -1 : -5}
                    offsetY={index === 0 ? 15 : index === 1 ? 50 : 15}
                    bgColor={feature.bgColor}
                    color={feature.color}
                  />
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 4 Program Tracks */}
      <motion.h3
        className="hidden relative md:flex justify-center mt-15 text-6xl md:text-5xl text-[rgb(55,58,65)] font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        4 Program Tracks
      </motion.h3>

      <div className="hidden md:flex relative left-1/2 pt-10 pb-50 -translate-x-1/2 gap-4 justify-center items-end">
        {tracks.map((track, idx) => (
          <motion.div
            key={track.name}
            initial={{ y: 200 + idx * 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 + 0.1, duration: 1.5, type: "spring", stiffness: 50 }}
            className="flex flex-col items-center relative"
          >
            <motion.div
              style={parallaxStyle(track.parallax.x, track.parallax.y)}
              whileHover={{ scale: 1.1, rotateY: 15, rotateX: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => track.setShowDesc(!track.showDesc)}
              className="cursor-pointer"
            >
              <img
                src={track.image}
                alt={`${track.name} track`}
                className="object-contain"
                style={{ width: track.width }}
              />
            </motion.div>
            <p className="mt-4 text-2xl font-semibold text-[rgb(55,58,65)]">{track.name}</p>
            <AnimatePresence>
              {track.showDesc && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: -40 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute top-0 w-64 md:w-72 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl text-center z-50"
                >
                  <p className="text-gray-700 text-sm md:text-base">{track.desc}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden px-4 py-8 pb-25 space-y-6">
        <motion.h3
          className="relative flex justify-center mt-15 text-6xl md:text-5xl text-[rgb(55,58,65)] font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          4 Program Tracks
        </motion.h3>
        {tracks.map((track, idx) => (
          <motion.div
            key={track.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={track.image}
                alt={`${track.name} track`}
                className="object-contain w-16 h-16"
              />
              <h4 className="text-xl font-bold text-[rgb(55,58,65)] capitalize">
                {track.name}
              </h4>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {track.desc}
            </p>
          </motion.div>
        ))}
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
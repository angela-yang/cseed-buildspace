"use client"
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Background from "../components/Background"
import HoverText from "../components/HoverText"
import Polaroid from "../components/Polaroid"
import Photos from "../components/Photos";

const ScrollReveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTimeout(() => setIsVisible(true), delay); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
      {children}
    </div>
  );
};

const resources = [
  {
    title: "Mentor Support",
    desc: "Get paired with experienced mentors (from engineers, to designers, to founders) who give you real, personalized guidance throughout the program.",
    color: "rgb(57,123,255)",
    bg: "rgba(57,123,255,0.08)",
    border: "rgba(57,123,255,0.18)",
    cutout: "/images/resource-2.png",
  },
  {
    title: "Software & Hardware Access",
    desc: "Get special access to industry-grade software licenses and cutting-edge hardware. No need to own expensive tools to build something incredible.",
    color: "rgb(136,0,185)",
    bg: "rgba(136,0,185,0.08)",
    border: "rgba(136,0,185,0.18)",
    cutout: "/images/resource-3.png",
  },
  {
    title: "Free Snacks",
    desc: "Build better on a full stomach. We keep the workspace stocked so you can stay in flow and focus on what matters!",
    color: "rgb(255,0,102)",
    bg: "rgba(255,0,102,0.08)",
    border: "rgba(220,80,30,0.18)",
    cutout: "/images/resource-4.png",
  },
];

export default function About() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [showDesc, setShowDesc]   = useState(false);
  const [showDesc1, setShowDesc1] = useState(false);
  const [showDesc2, setShowDesc2] = useState(false);
  const [showDesc3, setShowDesc3] = useState(false);
  const aboutSectionRef = useRef<HTMLElement>(null);

  const tracks = [
    { image: "/images/green.png",  name: "software",  desc: "Learn to build full-stack applications and scalable software solutions.",          showDesc, setShowDesc,   width: 200, parallax: { x: 1.2, y: 0.4 }, showHint: true  },
    { image: "/images/purple.png", name: "hardware",  desc: "Dive into electronics, circuits, and embedded systems development.",               showDesc: showDesc1, setShowDesc: setShowDesc1, width: 150, parallax: { x: 0.8, y: 0.7 }, showHint: false },
    { image: "/images/pink.png",   name: "wildcard",  desc: "Explore unconventional tracks and creative projects beyond standard boundaries.",   showDesc: showDesc2, setShowDesc: setShowDesc2, width: 210, parallax: { x: 1.5, y: 1.0 }, showHint: false },
    { image: "/images/yellow.png", name: "creatives", desc: "Focus on design, visual storytelling, and creative problem-solving.",              showDesc: showDesc3, setShowDesc: setShowDesc3, width: 210, parallax: { x: 1.5, y: 1.0 }, showHint: false },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = ((e.clientX - window.innerWidth  / 2) / window.innerWidth)  * -30;
      const y = ((e.clientY - window.innerHeight / 2) / window.innerHeight) * -30;
      setOffset({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const parallaxStyle = (xFactor: number, yFactor: number) => ({
    transform: `translate(${offset.x * xFactor}px, ${offset.y * yFactor}px)`,
  });

  const features = [
    { image: "/images/passion.webp",   title: "1. Build your passion",    desc: "Commit to a project you're passionate about, and report your weekly progress.",                         color: "text-[rgb(255,0,102)]",  bgColor: "bg-gradient-to-br from-orange-50 to-pink-50"   },
    { image: "/images/community.webp", title: "2. Meet the community",    desc: "Connect with a space of other amazing people, and learn from experienced mentors.",                      color: "text-[rgb(136,0,185)]",  bgColor: "bg-gradient-to-br from-blue-50 to-purple-50"   },
    { image: "/images/showcase.webp",  title: "3. Showcase your project!", desc: "At the end of the 6 weeks, showcase your project and display the fruition of your work.", color: "text-[rgb(19,163,122)]", bgColor: "bg-gradient-to-br from-green-50 to-teal-50"    },
  ];

  return (
    <main id="about" className="section">
      <section
        ref={aboutSectionRef}
        className="py-24 px-10 relative"
        style={{ marginTop: "clamp(20px, 3vw, 30px)" }}
      >
        <ScrollReveal>
          <h2 className="text-4xl md:text-[3.5vw] font-bold text-center my-14 text-[rgb(57,123,255)]">
            What is Buildspace?
          </h2>

          <HoverText />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <div className="hidden md:block absolute top-[-150px] left-1/2 -translate-x-1/2 w-[100vw] max-w-5xl h-[2px]">
              <svg viewBox="0 0 600 200" className="string" preserveAspectRatio="none">
                <path d="M 50 80 Q 300 140 550 80" fill="none" stroke="#b89879ff" strokeWidth="3" />
              </svg>
            </div>

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

      {/* 4 Program Tracks — desktop */}
      <motion.h3
        className="hidden relative md:flex justify-center mt-15 text-6xl md:text-5xl text-[rgb(55,58,65)] font-bold"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        4 Program Tracks
      </motion.h3>

      <div className="hidden md:flex relative left-1/2 pt-10 pb-50 -translate-x-1/2 gap-4 justify-center items-end">
        {tracks.map((track, idx) => (
          <motion.div key={track.name}
            initial={{ y: 200 + idx * 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}
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
              <img src={track.image} alt={`${track.name} track`} className="object-contain" style={{ width: track.width }} />
            </motion.div>
            <p className="mt-4 text-2xl font-semibold text-[rgb(55,58,65)]">{track.name}</p>
            <AnimatePresence>
              {track.showDesc && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: -40 }} exit={{ opacity: 0, y: -20 }}
                  className="absolute top-0 w-64 md:w-72 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl text-center z-50"
                >
                  <p className="text-gray-700 ibm-plex-sans text-sm md:text-base">{track.desc}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* 4 Program Tracks — mobile */}
      <div className="md:hidden px-4 py-8 pb-25 space-y-6">
        <motion.h3
          className="relative flex justify-center mt-15 text-6xl md:text-5xl text-[rgb(55,58,65)] font-bold"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          4 Program Tracks
        </motion.h3>
        {tracks.map((track, idx) => (
          <motion.div key={track.name}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            className="bg-white/60 backdrop-blur rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-4 mb-4">
              <img src={track.image} alt={`${track.name} track`} className="object-contain" width={track.width / 3} />
              <h4 className="text-xl font-bold text-[rgb(55,58,65)] capitalize">{track.name}</h4>
            </div>
            <p className="text-gray-600 text-sm ibm-plex-sans leading-relaxed">{track.desc}</p>
          </motion.div>
        ))}
      </div>
      
      {/* Resources */}
      <section className="relative px-[8vw] xl:px-[10vw] mb-40">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-[rgb(57,123,255)]">
            What You Get
          </h2>
          <p className="text-center text-2xl text-gray-500 ibm-plex-sans mb-16 max-w-xl mx-auto">
            We set you up for success, with every resource you need to build, learn, and grow.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {resources.map((resource, idx) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="relative rounded-2xl p-7 flex flex-col gap-4"
                style={{
                  background: resource.bg,
                  border: `1.5px solid ${resource.border}`,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                }}
              >
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ color: resource.color }}>
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 text-lg pb-2 ibm-plex-sans text-base leading-relaxed">
                    {resource.desc}
                  </p>
                </div>

                <motion.img
                  src={resource.cutout}
                  alt=""
                  className="absolute bottom-[-25] right-[-20] pointer-events-none select-none opacity-80"
                  style={{ height: "100px", objectFit: "contain" }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3.5 + idx * 0.5, repeat: Infinity, ease: "easeInOut", delay: idx * 0.4 }}
                />
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Endless Possibilities */}
      <section className="relative xl:max-w-[90vw] z-10 grid grid-cols-1 md:grid-cols-2 gap-10 mx-auto items-center px-[10vw]">
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-10 text-[rgb(57,123,255)]">
            Endless Possibilities
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 ibm-plex-sans leading-relaxed space-y-2">
            <span>Maybe you want to create your own app.</span><br />
            <span>Maybe you want to turn a hobby into something more.</span><br />
            <span>Maybe you want to launch a business.</span><br />
            <span>Maybe you want to build your tech startup.</span><br />
            <span>Maybe you want to launch your youtube channel.</span><br />
            <span>Maybe you want to experiment with large language models.</span><br />
            <span>Maybe you want to write your own book.</span><br /><br />
          </p>
          <span className="font-bold text-2xl md:text-3xl text-gray-600">
            Buildspace is the place for you 💫
          </span>
        </div>
        <ScrollReveal>
          <div className="flex justify-center md:justify-end">
            <img src="/images/buildspace0.webp" alt="Buildspace" className="w-full rounded-lg" />
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
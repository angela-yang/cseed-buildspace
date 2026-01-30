"use client"
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import DraggableToy from "../components/DraggableToy"
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
      image: '/images/passion.png', 
      title: 'Passion', 
      desc: 'Build your dreams',
      color: 'from-orange-400 to-pink-500',
      bgColor: 'bg-gradient-to-br from-orange-50 to-pink-50'
    },
    { 
      image: '/images/community2.png', 
      title: 'Community', 
      desc: 'Connect with amazing people + mentors',
      color: 'from-blue-400 to-purple-500',
      bgColor: 'bg-gradient-to-br from-blue-50 to-purple-50'
    },
    { 
      image: '/images/accountability.png', 
      title: 'Accountability', 
      desc: 'Be held accountable to finish your project',
      color: 'from-green-400 to-teal-500',
      bgColor: 'bg-gradient-to-br from-green-50 to-teal-50'
    }
  ];

  return (
    <main id="about" className="section">
      <section
        className="py-24 px-10 mt-60 relative"
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

        {/* Overview - Enhanced Interactive Section */}
        <ScrollReveal>
          <h2 className="text-5xl font-bold text-center mb-16 text-[rgb(57,123,255)]">
            What is Buildspace?
          </h2>
          
          <div className="max-w-7xl mx-auto relative z-10">
            {/* Desktop View - Interactive Showcase */}
            <div className="hidden md:flex gap-8 items-start">
              {/* Left Side - Feature List */}
              <div className="flex-1 space-y-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    onMouseEnter={() => setActiveFeature(index)}
                    className={`
                      relative p-8 rounded-3xl cursor-pointer transition-all duration-500
                      ${activeFeature === index 
                        ? `${feature.bgColor} shadow-2xl scale-105` 
                        : 'bg-white/50 hover:bg-white/80 shadow-lg hover:shadow-xl'
                      }
                    `}
                  >
                    {/* Animated Border */}
                    <div className={`
                      absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.color} opacity-0
                      transition-opacity duration-500
                      ${activeFeature === index ? 'opacity-20' : ''}
                    `} />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-3">
                        <motion.div
                          animate={{ 
                            scale: activeFeature === index ? 1.1 : 1,
                            rotate: activeFeature === index ? 5 : 0
                          }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="relative"
                        >
                          <div className={`
                            absolute inset-0 blur-xl rounded-full bg-gradient-to-r ${feature.color}
                            ${activeFeature === index ? 'opacity-40' : 'opacity-0'}
                            transition-opacity duration-500
                          `} />
                          <img
                            src={feature.image}
                            alt={feature.title}
                            className="w-16 h-16 object-contain relative z-10"
                          />
                        </motion.div>
                        
                        <h3 className={`
                          text-3xl font-bold bg-gradient-to-r ${feature.color} bg-clip-text
                          ${activeFeature === index ? 'text-transparent' : 'text-[rgb(57,123,255)]'}
                          transition-all duration-300
                        `}>
                          {feature.title}
                        </h3>
                      </div>
                      
                      <p className={`
                        text-lg transition-all duration-300
                        ${activeFeature === index ? 'text-gray-700' : 'text-gray-500'}
                      `}>
                        {feature.desc}
                      </p>
                    </div>

                    {/* Hover Indicator */}
                    <motion.div
                      className={`
                        absolute right-8 top-1/2 -translate-y-1/2
                        text-3xl transition-all duration-300
                        ${activeFeature === index ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
                      `}
                      animate={{
                        x: activeFeature === index ? [0, 5, 0] : 0
                      }}
                      transition={{
                        repeat: activeFeature === index ? Infinity : 0,
                        duration: 1.5
                      }}
                    >
                      →
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Right Side - Visual Showcase */}
              <motion.div 
                className="flex-1 sticky top-32 h-[600px]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <div className="relative h-full rounded-3xl overflow-hidden">
                  {/* Main Image Display */}
                  <div className="absolute inset-0 flex items-center justify-center p-12">
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                        animate={{
                          opacity: activeFeature === index ? 1 : 0,
                          scale: activeFeature === index ? 1 : 0.8,
                          rotateY: activeFeature === index ? 0 : -90,
                          z: activeFeature === index ? 0 : -100
                        }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 200,
                          damping: 20
                        }}
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ 
                          perspective: "1000px",
                          transformStyle: "preserve-3d" 
                        }}
                      >
                        <motion.img
                          src={feature.image}
                          alt={feature.title}
                          className="max-w-full max-h-full object-contain drop-shadow-2xl"
                          animate={{
                            y: activeFeature === index ? [0, -20, 0] : 0,
                            rotateZ: activeFeature === index ? [0, 5, 0, -5, 0] : 0
                          }}
                          transition={{
                            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                            rotateZ: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Decorative Elements */}
                  <motion.div
                    className={`absolute top-10 right-10 w-32 h-32 rounded-full bg-gradient-to-br ${features[activeFeature].color} opacity-20 blur-3xl`}
                    animate={{
                      scale: [1, 1.2, 1],
                      x: [0, 20, 0],
                      y: [0, -20, 0]
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />
                  <motion.div
                    className={`absolute bottom-10 left-10 w-40 h-40 rounded-full bg-gradient-to-br ${features[activeFeature].color} opacity-20 blur-3xl`}
                    animate={{
                      scale: [1, 1.3, 1],
                      x: [0, -20, 0],
                      y: [0, 20, 0]
                    }}
                    transition={{ duration: 6, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Mobile View - Stacked Cards */}
            <div className="md:hidden grid grid-cols-1 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className={`relative p-8 rounded-3xl ${feature.bgColor} shadow-xl`}
                >
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.color} opacity-20`} />
                  
                  <div className="relative z-10 text-center">
                    <motion.img
                      src={feature.image}
                      alt={feature.title}
                      className="w-32 h-32 object-contain mx-auto mb-6"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <h3 className={`text-3xl font-bold mb-4 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                      {feature.title}
                    </h3>
                    <p className="text-lg text-gray-700">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
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
      </section>
   </main> 
  );
}
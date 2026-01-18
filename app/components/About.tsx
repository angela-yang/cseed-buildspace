"use client"
import { useState, useEffect, useRef } from "react";
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
          id="features"
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
              className="absolute w-28 h-28 bg-purple-500 opacity-60 top-[75%] left-[55%]"
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
                <div className="bg-white rounded-2xl p-10 shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:rotate-2 transition-all duration-300">
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
        className="relative flex pt-20 justify-center text-6xl md:text-5xl text-[rgb(55,58,65)] font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        4 Program Tracks
      </motion.h3>

      <div className="relative left-1/2 pt-10 pb-50 -translate-x-1/2 flex gap-4 justify-center items-center">
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
    </main>
  );
}
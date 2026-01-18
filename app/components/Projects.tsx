"use client"
import { useState, useEffect, useRef } from "react";

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
  size?: number;
}

const DraggableToy = ({ imageSrc, initialX, initialY, size = 80 }: DraggableProps) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const velocityRef = useRef({ x: 0, y: 0 });
  const lastPosRef = useRef({ x: 0, y: 0 });

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
    <div
      className="absolute cursor-grab active:cursor-grabbing select-none pointer-events-auto"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size}px`,
        height: `${size}px`,
        transition: isDragging ? 'none' : 'transform 0.1s ease-out'
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
    </div>
  );
};

export default function Projects() {
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
        id="projects"
        className="section py-24 px-10 relative bg-[rgb(57,123,255)]"
      >
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
              className="absolute w-36 h-36 bg-[rgb(255,231,164)] rounded-full top-[15%] left-[10%]"
              style={{ transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * 0.7}px)` }}
          />
          <div
              className="absolute w-24 h-24 bg-[rgb(253,186,211)] rounded-2xl top-[25%] right-[15%]"
              style={{ transform: `translate(${mousePos.x * -1}px, ${mousePos.y * 1}px)` }}
          />
          <div
              className="absolute w-28 h-28 bg-[rgb(216,109,255)] top-[84%] left-[60%]"
              style={{
              borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
              transform: `translate(${mousePos.x * 1}px, ${mousePos.y * -0.3}px)`
              }}
          />
        </div>

        <ScrollReveal>
          <h2 className="text-5xl font-bold text-center mt-20 mb-12 text-white">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
            {[
              { image: '/images/bobby.png', title: 'Bobby!', desc: 'A homemade Alexa and digital assistant that incorporates hardware, software, and gen AI.' },
              { image: '/images/jam.png', title: 'JamJournal', desc: 'Jenny and Kelly built a music journaling platform that allows for note-taking alongside music streaming!' },
              { image: '/images/racecar.png', title: 'Automated Racecar', desc: 'Mukund worked on building autonomous racecars that play Mario Kart!' }
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
   </main>
  );
}
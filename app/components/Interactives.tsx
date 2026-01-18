"use client"
import { useState, useEffect, useRef } from 'react';

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

const ProgressBar = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = (scrollTop / docHeight) * 100;
      setScrollPercent(percent);

      // Determine current section
      const sections = document.querySelectorAll('.section');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          setCurrentSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sectionLabels = ['Home', 'About', 'Features', 'Contact'];

  return (
    <div className="w-full h-1 bg-gray-200 relative overflow-visible">
      <div className="absolute top-0 left-0 w-full h-full flex justify-between pointer-events-none">
        {sectionLabels.map((label, index) => (
          <div key={index} className="relative w-0.5 h-full bg-indigo-500 opacity-30">
            <span className="absolute top-3 left-1/2 -translate-x-1/2 text-xs text-indigo-600 font-medium whitespace-nowrap">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

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

export default function Interactives() {
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

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="px-10 py-5 flex justify-between items-center">
          <div className="text-2xl font-bold text-indigo-600">EVENT 2025</div>
          <ul className="flex gap-8">
            {['Home', 'About', 'Features', 'Contact'].map((item, index) => (
              <li key={item}>
                <button
                  onClick={() => scrollToSection(['hero', 'about', 'features', 'contact'][index])}
                  className="text-gray-800 font-medium hover:text-indigo-600 relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <ProgressBar />
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="section min-h-screen flex flex-col justify-center items-center text-center relative bg-gradient-to-br from-indigo-600 to-purple-700 text-white pt-20"
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <DraggableToy imageSrc="/images/purple.png" initialX={200} initialY={300} size={80} />
          <DraggableToy imageSrc="/images/green.png" initialX={1200} initialY={400} size={80} />
          <DraggableToy imageSrc="/images/pink.png" initialX={700} initialY={600} size={80} />
        </div>
        <h1 className="text-8xl font-black mb-5 animate-[fadeInUp_1s_ease-out]">BUILD THE FUTURE</h1>
        <p className="text-2xl animate-[fadeInUp_1s_0.2s_ease-out_backwards]">March 15-16, 2025</p>
      </section>

      {/* About Section */}
      <section id="about" className="section min-h-screen bg-white py-24 px-10 relative">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <DraggableToy imageSrc="/images/yellow.png" initialX={150} initialY={250} size={80} />
          <DraggableToy imageSrc="/images/purple.png" initialX={1300} initialY={350} size={80} />
          <DraggableToy imageSrc="/images/green.png" initialX={800} initialY={550} size={80} />
        </div>
        <ScrollReveal>
          <h2 className="text-5xl font-bold text-center mb-12 text-indigo-600">About The Event</h2>
          <p className="text-center max-w-3xl mx-auto text-lg leading-relaxed text-gray-700">
            Join us for 24 hours of innovation, creativity, and community. Build something amazing,
            learn new skills, and connect with hundreds of talented creators.
          </p>
        </ScrollReveal>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section min-h-screen bg-white py-24 px-10">
        <ScrollReveal>
          <h2 className="text-5xl font-bold text-center mb-12 text-indigo-600">Get In Touch</h2>
          <p className="text-center text-lg text-gray-700">
            Questions? Reach out to us at <span className="text-indigo-600 font-semibold">hello@event2025.com</span>
          </p>
        </ScrollReveal>
      </section>
    </div>
  );
}
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

export default function Contact() {
  return (
    <section id="contact" className="section py-24 px-10">
      <ScrollReveal>
        <h2 className="text-5xl font-bold text-center mb-12 text-[rgb(57,123,255)]">Get In Touch</h2>
        <p className="text-center text-lg text-gray-700 mb-100">
          Follow us on our socials!
        </p>
      </ScrollReveal>
    </section>
  )
}
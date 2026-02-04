"use client"
import { useState, useEffect, useRef } from "react";
import { FaDiscord, FaEnvelope, FaInstagram, FaLinkedin } from "react-icons/fa";

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
    <section id="apply" className="section min-h-[100vh] py-24 px-10 bg-[rgb(57,123,255)]">
      <ScrollReveal>
        <h2 className="text-5xl font-bold text-center mb-12 text-white">Get In Touch</h2>
        <p className="text-center text-3xl text-gray-100 mb-10">
          Follow us on our socials!
        </p>

        <div className="flex justify-center items-center gap-12 text-6xl text-white">
          <a 
            href="https://www.linkedin.com/company/cseeduw/posts/?feedView=all" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform pointer-cursor"
          >
            <FaLinkedin />
          </a>
          <a 
            href="https://www.instagram.com/cseeduw" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform pointer-cursor"
          >
            <FaInstagram />
          </a>
          <a 
            href="https://discord.com/invite/4qWcR9U7d3" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform pointer-cursor"
          >
            <FaDiscord />
          </a>
          <a 
            href="mailto:cseed-buildspace@u.washington.edu" 
            id="email-link"
            className="hover:scale-110 transition-transform pointer-cursor"
          >
            <FaEnvelope />
          </a>
        </div>
      </ScrollReveal>
    </section>
  )
}
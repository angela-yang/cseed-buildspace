"use client"
import Landing from "./components/Landing"
import About from "./components/About"
import Interactives from "./components/Interactives"
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'text'>('default');

  useEffect(() => {
    const updateMousePosition = (e : MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement;
      
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.style.cursor === 'pointer') {
        setCursorType('pointer');
      } else if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        setCursorType('text');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const cursorConfig = {
    default: {
      image: 'images/cursor.png',
      size: 'h-10'
    },
    pointer: {
      image: 'images/pointer-cursor.png',
      size: 'h-10'
    },
    text: {
      image: 'images/text-cursor.png',
      size: 'h-8'
    },
  };

  return (
    <main className="cursor-none">
      <div 
        className="absolute min-h-[300vh] inset-0 opacity-95 pointer-events-none z-0"
        style={{
          backgroundImage: 'url(/images/grid.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Custom Cursor */}
      <div
        className={`fixed pointer-events-none z-50 transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <img
          src={cursorConfig[cursorType].image}
          alt="cursor"
          className={`${cursorConfig[cursorType].size}`}
        />
      </div>

      <Landing />
      <About/>
      <Interactives/>
      
    </main>
  )
}

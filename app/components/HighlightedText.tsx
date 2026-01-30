'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';

interface MousePosition {
  x: number;
  y: number;
}

interface ImageSet {
  src: string;
  alt: string;
}

interface WordImagesConfig {
  [key: string]: ImageSet[];
}

interface HighlightedWordProps {
  word: string;
  wordKey: string;
  images: ImageSet[];
  hoveredWord: string | null;
  setHoveredWord: (word: string | null) => void;
  mousePos: MousePosition;
  onMouseMove: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

const HighlightedWord: React.FC<HighlightedWordProps> = ({
  word,
  wordKey,
  images,
  hoveredWord,
  setHoveredWord,
  mousePos,
  onMouseMove
}) => {
  const isActive = hoveredWord === wordKey;

  return (
    <span
      className="highlighted-word inline-block"
      onMouseEnter={() => setHoveredWord(wordKey)}
      onMouseLeave={() => setHoveredWord(null)}
      onMouseMove={onMouseMove}
    >
      {word}
      
      {isActive && (
        <div 
          className="absolute pointer-events-none"
          style={{ 
            left: `${mousePos.x - 70}px`,
            top: `${mousePos.y - 70}px`,
            zIndex: 50
          }}
        >
          {images.map((image, idx) => (
            <div
              key={`${wordKey}-${idx}`}
              className="image-bubble"
              style={{
                position: 'absolute',
                left: `${idx * 35 - 35}px`,
                top: `${idx * 25 - 25}px`,
                transform: `scale(${1 - idx * 0.1})`,
                zIndex: 50 - idx
              }}
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </span>
  );
};

const HighlightedText: React.FC = () => {
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });
  const wordRef = useRef<HTMLSpanElement>(null);

  // Image configuration - replace with your own images
  const wordImagesConfig: WordImagesConfig = {
    cultural: [
      { src: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop', alt: 'Cultural image 1' },
      { src: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=400&fit=crop', alt: 'Cultural image 2' },
      { src: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=400&h=400&fit=crop', alt: 'Cultural image 3' }
    ],
    crossChannel: [
      { src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=400&fit=crop', alt: 'Cross channel 1' },
      { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop', alt: 'Cross channel 2' },
      { src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=400&fit=crop', alt: 'Cross channel 3' }
    ]
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (wordRef.current) {
      const rect = wordRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-8 overflow-hidden">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .text-line {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .text-line:nth-child(1) { animation-delay: 0.1s; }
        .text-line:nth-child(2) { animation-delay: 0.2s; }
        .text-line:nth-child(3) { animation-delay: 0.3s; }
        .text-line:nth-child(4) { animation-delay: 0.4s; }
        .text-line:nth-child(5) { animation-delay: 0.5s; }
        .text-line:nth-child(6) { animation-delay: 0.6s; }
        .text-line:nth-child(7) { animation-delay: 0.7s; }

        .highlighted-word {
          position: relative;
          display: inline-block;
          cursor: pointer;
          color: #fff;
          transition: color 0.3s ease;
          text-decoration: none;
        }

        .highlighted-word:hover {
          color: #22ff00;
        }

        .highlighted-word::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, #22ff00 0%, #00ffff 100%);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .highlighted-word:hover::after {
          transform: scaleX(1);
        }

        .image-bubble {
          position: absolute;
          width: 140px;
          height: 140px;
          border-radius: 50%;
          overflow: hidden;
          pointer-events: none;
          box-shadow: 0 20px 60px rgba(34, 255, 0, 0.3);
          border: 2px solid rgba(34, 255, 0, 0.5);
          animation: float 3s ease-in-out infinite, scaleIn 0.3s ease-out;
        }

        .image-bubble:nth-child(1) {
          animation-delay: 0s, 0s;
        }

        .image-bubble:nth-child(2) {
          animation-delay: 0.5s, 0.1s;
        }

        .image-bubble:nth-child(3) {
          animation-delay: 1s, 0.2s;
        }

        @media (max-width: 768px) {
          .image-bubble {
            width: 100px;
            height: 100px;
          }
        }
      `}</style>

      <div className="max-w-5xl w-full" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        <h2 className="text-lg font-light text-gray-400 mb-8 text-line tracking-wider">
          At the crossroads of consulting & advertising, we design
        </h2>
        
        <div className="space-y-6 text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
          {/* Cultural innovations */}
          <div className="text-line relative" ref={hoveredWord === 'cultural' ? wordRef : null}>
            <HighlightedWord
              word="cultural"
              wordKey="cultural"
              images={wordImagesConfig.cultural}
              hoveredWord={hoveredWord}
              setHoveredWord={setHoveredWord}
              mousePos={mousePos}
              onMouseMove={handleMouseMove}
            />
          </div>
          
          <div className="text-line text-white">
            innovations
          </div>

          <div className="text-line text-gray-400 font-light text-3xl md:text-4xl lg:text-5xl">
            that create value and
          </div>

          {/* Cross channel communications */}
          <div className="text-line relative" ref={hoveredWord === 'crossChannel' ? wordRef : null}>
            <HighlightedWord
              word="cross channel"
              wordKey="crossChannel"
              images={wordImagesConfig.crossChannel}
              hoveredWord={hoveredWord}
              setHoveredWord={setHoveredWord}
              mousePos={mousePos}
              onMouseMove={handleMouseMove}
            />
          </div>

          <div className="text-line text-white">
            communications
          </div>

          <div className="text-line text-gray-400 font-light text-3xl md:text-4xl lg:text-5xl">
            that spark conversations.
          </div>
        </div>

        {/* Decorative animated line */}
        <div className="mt-16 text-line">
          <div className="h-px bg-gradient-to-r from-transparent via-[#22ff00] to-transparent opacity-30"></div>
        </div>
      </div>
    </div>
  );
};

export default HighlightedText;
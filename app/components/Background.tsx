"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

const polaroids = [
  "/images/cohort-3/img22.jpg",
  "/images/cohort-3/img9.jpg",
  "/images/cohort-3/img19.jpg",
  "/images/cohort-4/img5.jpg",
  "/images/cohort-4/img3.jpg",
  "/images/cohort-4/img10.jpg",
];

interface PolaroidData {
  src: string;
  left: number; 
  baseTop: number;
  parallaxSpeed: number;
  rotate: number;
}

// Hard-coded positions
const polaroidPositions: PolaroidData[] = [
  { src: polaroids[0], left: 5, baseTop: 200, parallaxSpeed: 0.35, rotate: -8 },
  { src: polaroids[1], left: 85, baseTop: 150, parallaxSpeed: 0.36, rotate: 6 },
  { src: polaroids[2], left: 4, baseTop: 550, parallaxSpeed: 0.28, rotate: -5 },
  { src: polaroids[3], left: 84, baseTop: 470, parallaxSpeed: 0.35, rotate: 7 },
  { src: polaroids[4], left: 5, baseTop: 880, parallaxSpeed: 0.27, rotate: -6 },
  { src: polaroids[5], left: 86, baseTop: 850, parallaxSpeed: 0.34, rotate: 5 },
];

export default function Background({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const sectionTop = sectionRef.current.offsetTop;
        setScrollY(window.scrollY - sectionTop);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionRef]);

  return (
    <>
      {polaroidPositions.map((p, i) => {
        const top = p.baseTop + scrollY * p.parallaxSpeed;
        const rotate = p.rotate + Math.sin(scrollY / 200 + i) * 2;

        return (
          <div
            key={i}
            className="absolute pointer-events-none transition-transform duration-200 z-0"
            style={{
              left: `${p.left}%`,
              top: `${top}px`,
              transform: `rotate(${rotate}deg)`,
            }}
          >
            <div className="bg-white shadow-xl rounded-md p-2" style={{ width: "190px" }}>
              <Image
                src={p.src}
                alt="Floating polaroid"
                width={190}
                height={210}
                className="object-cover rounded-sm"
              />
              <div className="h-6 bg-white mt-2" />
            </div>
          </div>
        );
      })}
    </>
  );
}
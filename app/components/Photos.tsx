"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export type PhotoConfig = {
  src: string;
  left: string;
  top: string;
  size: string; 
  shape: "circle" | "rounded" | "square";
  rotate: number;
};

const photos: PhotoConfig[] = [
  { src: "/images/cohort-3/img10.jpg", left: "50%", top: "5vh",  size: "clamp(180px, 28vw, 360px)", shape: "circle",  rotate: 0 },
  { src: "/images/cohort-3/img17.jpg", left: "58%", top: "1vh", size: "clamp(160px, 26vw, 340px)", shape: "rounded", rotate: 0 },
  { src: "/images/cohort-3/img20.jpg", left: "8%",  top: "1vh", size: "clamp(200px, 30vw, 380px)", shape: "square",  rotate: 0 },
  { src: "/images/cohort-4/img5.jpg",  left: "55%", top: "2vh", size: "clamp(180px, 28vw, 360px)", shape: "circle",  rotate: 0 },
  { src: "/images/cohort-4/img8.jpg",  left: "42%", top: "1vh", size: "clamp(180px, 28vw, 360px)", shape: "rounded", rotate: 0 },
  { src: "/images/cohort-3/img1.jpg",  left: "30%", top: "3vh", size: "clamp(160px, 25vw, 340px)", shape: "circle",  rotate: 0 },
  { src: "/images/cohort-3/img6.jpg",  left: "2%",  top: "1vh", size: "clamp(160px, 25vw, 340px)", shape: "rounded", rotate: 0 },
  { src: "/images/cohort-3/img19.jpg", left: "48%", top: "2vh", size: "clamp(200px, 30vw, 400px)", shape: "square",  rotate: 0 },
  { src: "/images/cohort-4/img7.jpg",  left: "5%",  top: "1vh", size: "clamp(180px, 28vw, 360px)", shape: "circle",  rotate: 0 },
  { src: "/images/cohort-4/img9.jpg",  left: "15%", top: "1vh", size: "clamp(180px, 28vw, 360px)", shape: "rounded", rotate: 0 },
];

export default function Photos() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Mobile-safe behavior
  if (isMobile) 
    return (
      <>
      {photos.map((p, index) => (
        <div
          key={index}
          className="relative pointer-events-none z-0"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
          }}
        >
            <Image
              src={p.src}
              alt=""
              width={600}
              height={600}
              className="object-cover w-full h-full"
              sizes="(max-width: 768px) 40vw, (max-width: 1200px) 30vw, 400px"
              quality={70}
            />
        </div>
      ))}
      </>
    );

  return (
    <>
      {photos.map((p, index) => (
        <div
          key={index}
          className="relative pointer-events-none z-0"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
          }}
        >
          <div
            className={`overflow-hidden bg-white shadow-xl ${
              p.shape === "circle"
                ? "rounded-full"
                : p.shape === "rounded"
                ? "rounded-2xl"
                : "rounded-none"
            }`}
          >
            <Image
              src={p.src}
              alt=""
              width={600}
              height={600}
              className="object-cover w-full h-full"
              sizes="(max-width: 768px) 40vw, (max-width: 1200px) 30vw, 400px"
              quality={70}
            />
          </div>
        </div>
      ))}
    </>
  );
}

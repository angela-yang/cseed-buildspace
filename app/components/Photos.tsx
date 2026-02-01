"use client";

import Image from "next/image";

export type PhotoConfig = {
  src: string;
  left: string; 
  baseTop: number;
  size: string;
  shape: "circle" | "rounded" | "square";
  speed: number; 
  rotate: number;
};

const photos: PhotoConfig[] = [
  { src: "/images/cohort-3/img10.jpg", left: "40%",  baseTop: 50,  size: "400px", shape: "circle",   speed: 0.12, rotate: -1 },
  { src: "/images/cohort-3/img9.jpg",  left: "70%", baseTop: 750, size: "400px", shape: "rounded",  speed: 0.15, rotate: 2 },
  { src: "/images/cohort-3/img12.jpg", left: "10%", baseTop: 480, size: "500px", shape: "square",   speed: 0.1,  rotate: -3 },
  { src: "/images/cohort-4/img5.jpg",  left: "65%", baseTop: 350, size: "450px", shape: "circle",   speed: 0.14, rotate: 2 },
  { src: "/images/cohort-4/img8.jpg",  left: "25%", baseTop: 920, size: "450px", shape: "rounded",  speed: 0.13, rotate: -2 },
];

export default function Photos() {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  if (isMobile) return null;
  
  return (
    <>
      {photos.map((p, index) => {
        const parallaxY = p.baseTop + scrollY * p.speed;
        const extraRotate = Math.sin((scrollY + index * 50) / 300) * 2;

        return (
          <div
            key={index}
            className="absolute pointer-events-none z-0"
            style={{
              left: p.left,
              top: `${parallaxY}px`,
              width: p.size,
              transform: `rotate(${p.rotate + extraRotate}deg)`,
            }}
          >
            <div
              className={`overflow-hidden shadow-xl bg-white ${
                p.shape === "circle"
                  ? "rounded-full"
                  : p.shape === "rounded"
                  ? "rounded-2xl"
                  : ""
              }`}
            >
              <Image
                src={p.src}
                alt=""
                width={parseInt(p.size)}
                height={parseInt(p.size)}
                className="object-cover"
              />
            </div>
          </div>
        );
      })}
    </>
  );
}

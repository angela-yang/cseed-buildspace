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
  { src: "/images/cohort-3/img10.jpg", left: "50%",  baseTop: 50,  size: "400px", shape: "circle",   speed: 0.12, rotate: 0 },
  { src: "/images/cohort-3/img17.jpg",  left: "70%", baseTop: 750, size: "400px", shape: "rounded",  speed: 0.15, rotate: 0 },
  { src: "/images/cohort-3/img20.jpg", left: "10%", baseTop: 550, size: "500px", shape: "square",   speed: 0.1,  rotate: 0 },
  { src: "/images/cohort-4/img5.jpg",  left: "65%", baseTop: 350, size: "450px", shape: "circle",   speed: 0.14, rotate: 0 },
  { src: "/images/cohort-4/img8.jpg",  left: "40%", baseTop: 1000, size: "450px", shape: "rounded",  speed: 0.13, rotate: 0 },
  { src: "/images/cohort-3/img1.jpg", left: "35%",  baseTop: 670,  size: "400px", shape: "circle",   speed: 0.12, rotate: 0 },
  { src: "/images/cohort-3/img6.jpg",  left: "0%", baseTop: 930, size: "400px", shape: "rounded",  speed: 0.15, rotate: 0 },
  { src: "/images/cohort-3/img19.jpg", left: "50%", baseTop: 1380, size: "500px", shape: "square",   speed: 0.1,  rotate: 0 },
  { src: "/images/cohort-4/img7.jpg",  left: "5%", baseTop: 1250, size: "450px", shape: "circle",   speed: 0.14, rotate: 0 },
  { src: "/images/cohort-4/img9.jpg",  left: "10%", baseTop: 1620, size: "450px", shape: "rounded",  speed: 0.13, rotate: 0 },
];

export default function Photos() {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  if (isMobile) return null;

  return (
    <>
      {photos.map((p, index) => {
        return (
          <div
            key={index}
            className="absolute pointer-events-none z-0"
            style={{
              left: p.left,
              top: `${p.baseTop}px`,
              width: p.size,
              transform: `rotate(${p.rotate}deg)`,
            }}
          >
            <div
              className={`overflow-hidden bg-white ${
                p.shape === "circle"
                  ? "rounded-full"
                  : p.shape === "rounded"
                  ? ""
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

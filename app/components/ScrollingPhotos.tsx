"use client";
import { useEffect, useRef, useState } from "react";

interface Photo { src: string; alt: string; }
interface ScrollingPhotoGalleryProps {
  photos?: { left: Photo[]; middle: Photo[]; right: Photo[]; };
  title?: { line1: string; line2: string; line3: string; };
  backgroundColor?: string;
}

export default function ScrollingPhotoGallery({
  photos,
  title = { line1: "BUILD", line2: "your", line3: "passion" },
  backgroundColor = "rgb(241,239,235)",
}: ScrollingPhotoGalleryProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const middleRef  = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);
  const rafRef     = useRef<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const galleryPhotos = photos ?? {
    left: [
      { src: "/images/cohort-0/img1.webp",  alt: "Photo 1" },
      { src: "/images/cohort-0/img13.webp", alt: "Photo 2" },
      { src: "/images/cohort-0/img43.webp", alt: "Photo 3" },
      { src: "/images/cohort-0/img4.webp",  alt: "Photo 4" },
    ],
    middle: [
      { src: "/images/cohort-2/img23.webp", alt: "Photo 5" },
      { src: "/images/cohort-2/img7.webp",  alt: "Photo 6" },
      { src: "/images/cohort-2/img21.webp", alt: "Photo 7" },
      { src: "/images/cohort-2/img22.webp", alt: "Photo 8" },
    ],
    right: [
      { src: "/images/cohort-3/img25.webp", alt: "Photo 9"  },
      { src: "/images/cohort-3/img1.webp",  alt: "Photo 10" },
      { src: "/images/cohort-3/img45.webp", alt: "Photo 11" },
      { src: "/images/cohort-4/img3.webp",  alt: "Photo 12" },
    ],
  };

  // Preload all images during the loading screen
  useEffect(() => {
    const allPhotos = [
      ...galleryPhotos.left,
      ...galleryPhotos.middle,
      ...galleryPhotos.right,
    ];
    allPhotos.forEach(({ src }) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Scroll parallax 
  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const progress =
          (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const speed = isMobile ? 0.35 : 1;

        if (leftRef.current)
          leftRef.current.style.transform = `translateY(${progress * 400 * speed}px)`;
        if (middleRef.current)
          middleRef.current.style.transform = `translateY(${-progress * 300 * speed}px)`;
        if (!isMobile && rightRef.current)
          rightRef.current.style.transform = `translateY(${progress * 500 * speed}px)`;

        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] md:min-h-[200vh] overflow-hidden py-24 px-6 md:px-12 lg:px-20"
      style={{ backgroundColor }}
    >
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <h2 className="text-[10vw] md:text-[15vw] lg:text-[20vw] font-black tracking-tighter leading-[0.85] text-gray-900 opacity-[0.1] text-center select-none whitespace-nowrap">
          <span className="block">{title.line1}</span>
          <span className="block italic">{title.line2}</span>
          <span className="block">{title.line3}</span>
        </h2>
      </div>

      {isMobile ? (
        <div className="relative z-10 flex gap-4">
          <div ref={leftRef} className="flex flex-col gap-4 w-1/2 will-change-transform">
            {galleryPhotos.left.map((photo, i) => (
              <div key={i} className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-md"
                style={{ transform: `rotate(${i % 2 === 0 ? 1.5 : -1.5}deg)` }}>
                <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div ref={middleRef} className="flex flex-col gap-4 w-1/2 will-change-transform">
            {galleryPhotos.middle.map((photo, i) => (
              <div key={i} className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-md"
                style={{ transform: `rotate(${i % 2 === 0 ? -1.5 : 1.5}deg)` }}>
                <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative z-10 flex justify-center gap-10 md:gap-20 lg:gap-30">
          <div ref={leftRef} className="flex flex-col gap-10 w-[18%] will-change-transform">
            {galleryPhotos.left.map((photo, i) => (
              <div key={i} className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl"
                style={{ transform: `rotate(${i % 2 === 0 ? 2 : -2}deg)` }}>
                <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
          <div ref={middleRef} className="flex flex-col gap-10 w-[18%] will-change-transform">
            {galleryPhotos.middle.map((photo, i) => (
              <div key={i} className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl"
                style={{ transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)` }}>
                <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
          <div ref={rightRef} className="flex flex-col gap-10 w-[18%] will-change-transform">
            {galleryPhotos.right.map((photo, i) => (
              <div key={i} className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl"
                style={{ transform: `rotate(${i % 2 === 0 ? 2 : -2}deg)` }}>
                <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
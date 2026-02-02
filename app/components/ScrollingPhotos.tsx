"use client"
import { useEffect, useRef, useState } from "react";

interface Photo {
  src: string;
  alt: string;
}

interface ScrollingPhotoGalleryProps {
  photos?: {
    left: Photo[];
    middle: Photo[];
    right: Photo[];
  };
  title?: {
    line1: string;
    line2: string;
    line3: string;
  };
  backgroundColor?: string;
}

export default function ScrollingPhotoGallery({
  photos,
  title = {
    line1: "BUILD",
    line2: "your",
    line3: "passion"
  },
  backgroundColor = "rgb(241,239,235)"
}: ScrollingPhotoGalleryProps) {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const defaultPhotos = {
    left: [
      { src: "/images/cohort-0/img1.webp", alt: "Photo 1" },
      { src: "/images/cohort-0/img13.webp", alt: "Photo 2" },
      { src: "/images/cohort-0/img43.webp", alt: "Photo 3" },
      { src: "/images/cohort-0/img4.webp", alt: "Photo 4" },
    ],
    middle: [
      { src: "/images/cohort-2/img23.webp", alt: "Photo 5" },
      { src: "/images/cohort-2/img7.webp", alt: "Photo 6" },
      { src: "/images/cohort-2/img21.webp", alt: "Photo 7" },
      { src: "/images/cohort-2/img22.webp", alt: "Photo 8" },
    ],
    right: [
      { src: "/images/cohort-3/img25.webp", alt: "Photo 9" },
      { src: "/images/cohort-3/img1.webp", alt: "Photo 10" },
      { src: "/images/cohort-3/img45.webp", alt: "Photo 11" },
      { src: "/images/cohort-4/img3.webp", alt: "Photo 12" },
    ]
  };

  const galleryPhotos = photos || defaultPhotos;

  const leftColumnPhotos = [
    ...galleryPhotos.left
  ];
  const middleColumnPhotos = [
    ...galleryPhotos.middle
  ];
  const rightColumnPhotos = [
    ...galleryPhotos.right
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = rect.top;
        const windowHeight = window.innerHeight;
        
        // Calculate scroll progress relative to section visibility
        const scrollProgress = (windowHeight - sectionTop) / (windowHeight + rect.height);
        setScrollY(scrollProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Much stronger parallax speeds for dramatic effect
  const leftOffset = scrollY * 500;
  const middleOffset = -scrollY * 1000; // Opposite direction
  const rightOffset = scrollY * 600;

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-[200vh] overflow-hidden py-20"
      style={{ backgroundColor }}
    >
      {/* Large Background Text */}
      <div className="hidden md:absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <h2 className="text-[10vw] md:text-[15vw] lg:text-[20vw] font-black tracking-tighter leading-[0.85] text-gray-900 opacity-[0.1] select-none whitespace-nowrap">
          <span className="block text-center">{title.line1}</span>
          <span className="block text-center italic">{title.line2}</span>
          <span className="block text-center">{title.line3}</span>
        </h2>
      </div>

      {/* Scrolling Photo Columns */}
      <div className="hidden md:flex justify-center items-center gap-8 md:gap-16 lg:gap-24 px-6 md:px-12 lg:px-20">
        {/* Left Column - Scrolls Down */}
        <div 
          className="flex flex-col gap-12 md:gap-20 lg:gap-32 w-1/4 will-change-transform"
          style={{ 
            transform: `translateY(${leftOffset}px)`,
          }}
        >
          {leftColumnPhotos.map((photo, index) => (
            <div 
              key={`left-${index}`}
              className="relative aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden md:shadow-2xl md:hover:shadow-3xl transition-all duration-500 group"
              style={{
                transform: `rotate(${index % 2 === 0 ? 2 : -2}deg)`,
              }}
            >
              <img 
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          ))}
        </div>

        {/* Middle Column - Scrolls Up (Opposite Direction) */}
        <div 
          className="flex flex-col gap-12 md:gap-20 lg:gap-32 w-1/4 will-change-transform pt-32 md:pt-48"
          style={{ 
            transform: `translateY(${middleOffset}px)`,
          }}
        >
          {middleColumnPhotos.map((photo, index) => (
            <div 
              key={`middle-${index}`}
              className="relative aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden md:shadow-2xl md:hover:shadow-3xl transition-all duration-500 group"
              style={{
                transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)`,
              }}
            >
              <img 
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          ))}
        </div>

        {/* Right Column - Scrolls Down */}
        <div 
          className="flex flex-col gap-12 md:gap-20 lg:gap-32 w-1/4 will-change-transform pt-16 md:pt-24"
          style={{ 
            transform: `translateY(${rightOffset}px)`,
          }}
        >
          {rightColumnPhotos.map((photo, index) => (
            <div 
              key={`right-${index}`}
              className="relative aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden md:shadow-2xl md:hover:shadow-3xl transition-all duration-500 group"
              style={{
                transform: `rotate(${index % 2 === 0 ? 2 : -2}deg)`,
              }}
            >
              <img 
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-8 px-6 md:hidden">
        {[leftColumnPhotos[0], middleColumnPhotos[0], rightColumnPhotos[0]].map(
          (photo, index) => (
            <div
              key={`mobile-${index}`}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover"
              />
            </div>
          )
        )}
      </div>
    </section>
  );
}
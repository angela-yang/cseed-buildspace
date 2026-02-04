"use client"

import { useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";

type Cohort = {
  name: string;
  photos: string[];
};

const cohorts: Cohort[] = [
  {
    name: "Cohort 0",
    photos: [
      "/images/cohort-0/img1.webp",
      "/images/cohort-0/img2.webp",
      "/images/cohort-0/img4.webp",
      "/images/cohort-0/img5.webp",
      "/images/cohort-0/img10.webp",
      "/images/cohort-0/img11.webp",
      "/images/cohort-0/img13.webp",
      "/images/cohort-0/img29.webp",
      "/images/cohort-0/img15.webp",
      "/images/cohort-0/img16.webp",
      "/images/cohort-0/img18.webp",
      "/images/cohort-0/img19.webp",
      "/images/cohort-0/img20.webp",
      "/images/cohort-0/img22.webp",
      "/images/cohort-0/img34.webp",
      "/images/cohort-0/img40.webp"
    ],
  },
  {
    name: "Cohort 2",
    photos: [
      "/images/cohort-2/img6.webp",
      "/images/cohort-2/img5.webp",
      "/images/cohort-2/img23.webp",
      "/images/cohort-2/img16.webp",
      "/images/cohort-2/img27.webp",
      "/images/cohort-2/img19.webp",
      "/images/cohort-2/img15.webp",
      "/images/cohort-2/img21.webp",
      "/images/cohort-2/img25.webp",
      "/images/cohort-2/img24.webp",
      "/images/cohort-2/img17.webp",
      "/images/cohort-2/img29.webp",
      "/images/cohort-2/img13.webp",
      "/images/cohort-2/img31.webp",
      "/images/cohort-2/img32.webp",
      "/images/cohort-2/img4.webp"
    ],
  },
  {
    name: "Cohort 3",
    photos: [
      "/images/cohort-3/img1.webp",
      "/images/cohort-3/img2.webp",
      "/images/cohort-3/img8.webp",
      "/images/cohort-3/img5.webp",
      "/images/cohort-3/img9.webp",
      "/images/cohort-3/img11.webp",
      "/images/cohort-3/img15.webp",
      "/images/cohort-3/img18.webp",
      "/images/cohort-3/img19.webp",
      "/images/cohort-3/img20.webp",
      "/images/cohort-3/img21.webp",
      "/images/cohort-3/img22.webp",
      "/images/cohort-3/img23.webp",
      "/images/cohort-3/img24.webp",
      "/images/cohort-3/img26.webp",
      "/images/cohort-3/img27.webp",
      "/images/cohort-3/img29.webp",
      "/images/cohort-3/img30.webp",
      "/images/cohort-3/img31.webp",
      "/images/cohort-3/img32.webp",
      "/images/cohort-3/img33.webp",
      "/images/cohort-3/img36.webp",
      "/images/cohort-3/img37.webp",
      "/images/cohort-3/img38.webp",
      "/images/cohort-3/img41.webp",
      "/images/cohort-3/img43.webp",
      "/images/cohort-3/img47.webp",
      "/images/cohort-3/img49.webp",
    ],
  },
  {
    name: "Cohort 4",
    photos: [
      "/images/cohort-4/img1.webp",
      "/images/cohort-4/img2.webp",
      "/images/cohort-4/img3.webp",
      "/images/cohort-4/img4.webp",
      "/images/cohort-4/img5.webp",
      "/images/cohort-4/img6.webp",
      "/images/cohort-4/img7.webp",
      "/images/cohort-4/img8.webp",
      "/images/cohort-4/img9.webp",
      "/images/cohort-4/img10.webp",
      "/images/cohort-4/img11.webp"
    ],
  },
];

function useOnScreen() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // preload slightly before view
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function CohortGallery({ title, photos }: { title: string; photos: string[] }) {
  const { ref, visible } = useOnScreen();

  return (
    <section ref={ref} className="py-16 z-10">
      <h3 className="text-3xl font-bold mb-8 text-center text-gray-800 z-10">
        {title}
      </h3>

      {visible && (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3 z-10">
          {photos.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              loading="lazy"
              className="w-full h-auto rounded-md break-inside-avoid"
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default function PhotoGallery() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'text'>('default');

  useEffect(() => {
    const updateMousePosition = (e : MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement;
      
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.dataset.cursor === 'pointer' || target.style.cursor === 'pointer') {
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
    <main id="gallery" className= "cursor-none py-24 px-[5vw] mx-auto">
      <NavBar />
      <div 
        className="absolute min-h-[600vh] inset-0 opacity-95 pointer-events-none z-0"
        style={{
          backgroundImage: 'url(/images/grid.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
        }}
      />
      
      {/* Custom Cursor */}
      <div
        className={`fixed pointer-events-none z-100 transition-opacity duration-200 ${
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

      <div className="absolute inset-0 items-center justify-center text-center z-10 py-30 px-10">
        <h2 className="text-5xl font-bold text-center mb-2 mt-10 text-gray-900 z-10">
          Buildspace Moments 📸
        </h2>

        {cohorts.map((cohort) => (
          <CohortGallery
            key={cohort.name}
            title={cohort.name}
            photos={cohort.photos}
          />
        ))}
      </div>
    </main>
  );
}


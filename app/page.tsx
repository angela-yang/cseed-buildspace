"use client"
import NavBar from "./components/NavBar"
import Landing from "./sections/Landing"
import About from "./sections/About"
import Projects from "./sections/Projects"
import Cohorts from "./sections/Cohorts"
import Contact from "./sections/Contact"
import ScrollingPhotos from "./components/ScrollingPhotos"
import Gallery from "./sections/Gallery"
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [isMobile, setIsMobile]   = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress]   = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'text'>('default');
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Loading screen
  useEffect(() => {
    progressRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 90) { clearInterval(progressRef.current!); return 90; }
        return p + Math.max(1, (90 - p) * 0.12);
      });
    }, 80);

    const finish = () => {
      clearInterval(progressRef.current!);
      setProgress(100);
      setTimeout(() => setIsLoading(false), 400);
    };

    if (document.readyState === 'complete') {
      setTimeout(finish, isMobile ? 600 : 0);
    } else {
      window.addEventListener('load', () => setTimeout(finish, isMobile ? 600 : 0), { once: true });
    }

    return () => { if (progressRef.current) clearInterval(progressRef.current); };
  }, [isMobile]);

  // Custom cursor
  useEffect(() => {
    if (isMobile) return;

    const onMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setCursorVisible(true);
      const t = e.target as HTMLElement;
      if (t.tagName === 'A' || t.tagName === 'BUTTON' || t.dataset.cursor === 'pointer' || t.style.cursor === 'pointer') {
        setCursorType('pointer');
      } else if (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable) {
        setCursorType('text');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', () => setCursorVisible(false));
    return () => window.removeEventListener('mousemove', onMove);
  }, [isMobile]);

  const cursorConfig = {
    default: { image: 'images/cursor.png',        size: 'h-10' },
    pointer: { image: 'images/pointer-cursor.png', size: 'h-10' },
    text:    { image: 'images/text-cursor.png',    size: 'h-8'  },
  };

  return (
    <>
      {/* Loading screen */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgb(241,239,235)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 20,
          opacity: isLoading ? 1 : 0,
          pointerEvents: isLoading ? 'all' : 'none',
          transition: 'opacity 0.4s ease',
        }}
      >
        <p style={{
          fontWeight: 900, fontSize: 'clamp(32px, 8vw, 52px)',
          letterSpacing: '-0.03em', color: 'rgb(57,123,255)',
          fontFamily: 'inherit',
        }}>
          BUILDSPACE
        </p>

        {/* Progress bar */}
        <div style={{
          width: 'clamp(140px, 35vw, 260px)', height: 3,
          background: 'rgba(57,123,255,0.15)', borderRadius: 99, overflow: 'hidden',
        }}>
          <div style={{
            height: '100%', borderRadius: 99,
            background: 'rgb(57,123,255)',
            width: `${progress}%`,
            transition: 'width 0.12s ease',
          }} />
        </div>

        <p style={{ fontSize: 11, letterSpacing: '0.1em', color: 'rgba(0,0,0,0.3)', fontWeight: 600 }}>
          {progress < 100 ? 'LOADING' : 'LET\'S GO'}
        </p>
      </div>

      <main
        className={`${!isMobile ? 'cursor-none' : ''} max-w-[100vw] overflow-hidden`}
        style={{ visibility: isLoading ? 'hidden' : 'visible' }}
      >
        <NavBar />

        {!isMobile && (
          <div
            className="absolute min-h-[300vh] inset-0 opacity-95 pointer-events-none z-0"
            style={{
              backgroundImage: 'url(/images/grid.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        )}

        {/* Custom cursor */}
        {!isMobile && (
          <div
            className={`fixed pointer-events-none z-[100] transition-opacity duration-200 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <img src={cursorConfig[cursorType].image} alt="" className={cursorConfig[cursorType].size} />
          </div>
        )}

        <Landing />
        <About />
        <ScrollingPhotos />
        <Projects />
        <Cohorts />
        <Gallery />
        <Contact />
      </main>
    </>
  );
}
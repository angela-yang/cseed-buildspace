"use client";

import { useEffect, useRef, useState } from "react";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "cohorts", label: "Cohorts" },
  { id: "apply", label: "Apply" },
];

export default function NavBar() {
  const navRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [labelXs, setLabelXs] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [iconX, setIconX] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /* Measure label positions once */
  useEffect(() => {
    const measure = () => {
      if (!navRef.current || isMobile) return;
      const xs = labelRefs.current.map((el) => {
        if (!el) return 0;
        const rect = el.getBoundingClientRect();
        const navRect = navRef.current!.getBoundingClientRect();
        return rect.left + rect.width / 2 - navRect.left - 82;
      });
      setLabelXs(xs);
      setIconX(xs[0]);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [isMobile]);

  /* Smooth icon movement based on scroll */
  useEffect(() => {
    const handleScroll = () => {
      if (!labelXs.length || isMobile) return;
      const sectionsEls = document.querySelectorAll<HTMLElement>(".section");
      if (!sectionsEls.length) return;

      const scrollY = window.scrollY;
      let active = 0;
      let sectionProgress = 0;

      for (let i = 0; i < sectionsEls.length; i++) {
        const current = sectionsEls[i];
        const next = sectionsEls[i + 1];

        const startTop = current.offsetTop;
        const endTop = next ? next.offsetTop : document.documentElement.scrollHeight;

        if (scrollY >= startTop && scrollY < endTop) {
          active = i;
          sectionProgress = (scrollY - startTop) / (endTop - startTop);
          break;
        }

        if (i === sectionsEls.length - 1 && scrollY >= startTop) {
          active = i;
          sectionProgress = 1;
        }
      }

      setActiveIndex(active);

      // Map section progress to icon X position
      const startX = labelXs[active];
      const endX = labelXs[active + 1] ?? startX;

      // Icon moves proportionally to the section's scroll
      setIconX(startX + (endX - startX) * sectionProgress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [labelXs, isMobile]);

  /* Scroll to section smoothly */
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  // Desktop Navigation
  if (!isMobile) {
    return (
      <nav
        ref={navRef}
        className="fixed left-[2vw] top-5 w-[65vw] z-50 bg-white/80 backdrop-blur-md shadow-sm border-1 border-[rgba(57,123,255,0.25)] rounded-full px-15 py-3"
      >
        <div className="relative w-full h-5 flex items-center">
          <div className="absolute top-1/2 left-0 w-full h-1 rounded-full" />
          {/* Section labels */}
          {sections.map((section, index) => (
            <button
              key={section.id}
              ref={el => {
                labelRefs.current[index] = el
              }}
              onClick={() => scrollToSection(section.id)}
              style={{ left: `${(index / (sections.length - 1)) * 100}%` }}
              className={`absolute -translate-x-1/2 top-1/2 -translate-y-1/2 text-lg transition-colors group
                ${index === activeIndex 
                  ? "text-[rgb(57,123,255)] font-bold" 
                  : "text-gray-700 hover:text-[rgb(57,123,255)] font-normal"
                }`}
            >
              {section.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[rgb(57,123,255)] transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}

          {/* Moving icon */}
          <div
            className="absolute top-1/2 -translate-y-1/2 transition-transform duration-50 ease-out"
            style={{
              transform: `translateX(${iconX}px)`,
            }}
          >
            <img src="images/purple.png" className="w-9" alt="Navigation icon" />
          </div>
        </div>
      </nav>
    );
  }

  // Mobile Navigation
  return (
    <>
      {/* Mobile Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgb(241,239,235)]/70 shadow-md border-b border-[rgba(57,123,255,0.25)]">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-[rgb(57,123,255)]">
              Buildspace
            </span>
          </div>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-[rgb(57,123,255)] rounded-full transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-[rgb(57,123,255)] rounded-full transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-[rgb(57,123,255)] rounded-full transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="px-6 pb-6 space-y-2">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                  index === activeIndex
                    ? "bg-[rgb(57,123,255)] text-white font-bold shadow-lg"
                    : "bg-[rgb(213,224,246)] text-gray-700 hover:bg-gray-100 font-medium"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Active Section Indicator - currently not working
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white/95 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-[rgba(57,123,255,0.25)]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[rgb(57,123,255)] rounded-full animate-pulse" />
          <span className="text-sm font-semibold text-[rgb(57,123,255)]">
            {sections[activeIndex]?.label}
          </span>
        </div>
      </div>*/}
    </>
  );
}
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

  /* Measure label positions once */
  useEffect(() => {
    const measure = () => {
      if (!navRef.current) return;
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
  }, []);

  /* Smooth icon movement based on scroll */
  useEffect(() => {
    const handleScroll = () => {
      if (!labelXs.length) return;
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
  }, [labelXs]);

  /* Scroll to section smoothly */
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className="fixed left-[2vw] top-5 w-[65vw] z-50 bg-white/80 shadow-sm border-1 border-[rgba(57,123,255,0.25)] rounded-full px-15 py-3"
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
          <img src="images/purple.png" className="w-9" />
        </div>
      </div>
    </nav>
  )
}

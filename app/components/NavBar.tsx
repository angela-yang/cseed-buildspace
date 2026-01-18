"use client"

import { useEffect, useRef, useState } from "react"

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "cohorts", label: "Cohorts" },
  { id: "apply", label: "Apply" },
]

export default function NavBar() {
  const navRef = useRef<HTMLDivElement>(null)
  const labelRefs = useRef<(HTMLButtonElement | null)[]>([])
  const sectionRefs = useRef<HTMLElement[]>([])

  const [activeIndex, setActiveIndex] = useState(0)
  const [iconX, setIconX] = useState(0)
  const [labelXs, setLabelXs] = useState<number[]>([])
  const [sectionTops, setSectionTops] = useState<number[]>([])

  // Measure label positions and section tops
  useEffect(() => {
    const measure = () => {
      if (!navRef.current) return

      const navRect = navRef.current.getBoundingClientRect()

      // Button centers
      const xs = labelRefs.current.map(el => {
        if (!el) return 0
        const rect = el.getBoundingClientRect()
        return rect.left + rect.width / 2 - navRect.left - 50
      })
      setLabelXs(xs)

      // Section top positions relative to document
      const tops = sections.map(s => {
        const el = document.getElementById(s.id)
        if (!el) return 0
        return el.offsetTop
      })
      setSectionTops(tops)

      // Start icon at first label
      setIconX(xs[0])
    }

    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  // Scroll handler
  useEffect(() => {
    let raf: number

    const handleScroll = () => {
      const scrollY = window.scrollY
      if (!sectionTops.length || !labelXs.length) return

      // Find current section
      let index = sectionTops.findIndex((top, i) => {
        const nextTop = sectionTops[i + 1] ?? Infinity
        return scrollY >= top && scrollY < nextTop
      })
      if (index === -1) index = sectionTops.length - 1
      setActiveIndex(index)

      // Compute progress between current and next section
      const start = sectionTops[index]
      const end = sectionTops[index + 1] ?? start + window.innerHeight
      const t = Math.min(Math.max((scrollY - start) / (end - start), 0), 1)

      const startX = labelXs[index]
      const endX = labelXs[index + 1] ?? startX

      setIconX(startX + (endX - startX) * t)
    }

    const onScroll = () => {
      // Use requestAnimationFrame for smooth updates
      raf = requestAnimationFrame(handleScroll)
    }

    window.addEventListener("scroll", onScroll)
    handleScroll()
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(raf)
    }
  }, [labelXs, sectionTops])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav
      ref={navRef}
      className="fixed left-[2vw] top-5 w-[70vw] z-50 bg-white/80 shadow-sm border-1 border-color-[rgb(57,123,255)] rounded-full px-10 py-4"
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
            className={`absolute -translate-x-1/2 top-1/2 -translate-y-1/2 text-sm transition-colors group
              ${index === activeIndex 
                ? "text-[rgb(57,123,255)] font-bold" 
                : "text-gray-500 hover:text-[rgb(57,123,255)] font-normal"
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
          <img src="images/purple.png" className="w-10" />
        </div>
      </div>
    </nav>
  )
}

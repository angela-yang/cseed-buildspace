"use client"
import { useState, useEffect, useRef } from "react";
import ProjectCard from "../components/ProjectCard"
import DraggableToy from "../components/DraggableToy"
import { FaSearch } from "react-icons/fa";
import { getFeaturedProjects } from "../components/ProjectsData";

const ScrollReveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      {
        threshold: 0.15, 
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [delay, isMobile]);

  return (
    <div
      ref={ref}
      className={`
        transition-all
        duration-700
        ease-out
        will-change-transform
        ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6 md:translate-y-12"
        }
      `}
    >
      {children}
    </div>
  );
}

export default function Projects() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = ((e.clientX - innerWidth / 2) / innerWidth) * -30;
      const y = ((e.clientY - innerHeight / 2) / innerHeight) * -30;
      setOffset({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const featuredProjects = getFeaturedProjects();
 
  const filteredProjects = featuredProjects.filter(project => {
    const matchesFilter = filter === "all" || project.track === filter;
    const matchesSearch = project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.creatorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <main>
      <section
        id="projects"
        className="section py-16 md:py-24 px-4 sm:px-6 lg:px-10 relative bg-[rgb(57,123,255)]"
      >
        <ScrollReveal>
          <div className="min-h-screen py-10">
            <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">
              
              {/* Header */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-end">
                
                {/* Title and Description */}
                <div>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 text-white">
                    Featured Projects
                  </h2>
                  <p className="text-lg sm:text-xl lg:text-2xl text-white/90">
                    Discover amazing projects from our past cohorts
                  </p>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white/50 pointer-events-none z-10" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-6 py-3.5 rounded-full border-2 border-white/40 hover:border-white/60 focus:border-white text-white text-base sm:text-lg placeholder-white/60 focus:outline-none transition-all duration-300 bg-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl"
                  />
                </div>
              </div>

              {/* Filter buttons */}
              <div className="flex flex-wrap justify-center gap-4 mb-10">
              {["all", "software", "hardware", "wildcard", "creatives"].map((track) => {
                const getActiveColor = () => {
                  switch(track) {
                    case "all": return "rgb(124,165,249)";
                    case "software": return "rgb(133,216,186)";
                    case "hardware": return "rgb(216,109,255)";
                    case "wildcard": return "rgb(253,186,211)";
                    case "creatives": return "rgb(255,231,164)";
                    default: return "rgb(124,165,249)";
                  }
                };

                return (
                  <button
                    key={track}
                    onClick={() => setFilter(track)}
                    className={`px-6 py-2 rounded-full border-1 border-gray-800/75 font-semibold transition-all transform hover:scale-105 ${
                      filter === track
                        ? "text-black shadow-lg"
                        : "bg-[rgb(241,239,235)] text-gray-900 hover:bg-gray-100 shadow-sm"
                    }`}
                    style={filter === track ? { backgroundColor: getActiveColor() } : {}}
                  >
                    {track.charAt(0).toUpperCase() + track.slice(1)}
                  </button>
                );
              })}
            </div>
          </div>

            {/* Projects grid */}
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {filteredProjects.map((project, index) => (
                  <ProjectCard key={index} {...project} index={index} />
                ))}
              </div>

              {filteredProjects.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-2xl text-gray-200">No featured projects found</p>
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section
        className="min-h-[80vh] flex flex-col justify-center items-center text-center relative text-[rgb(57,123,255)] pt-5 z-20"
      >
        <div 
          className="absolute inset-0 opacity-95 pointer-events-none z-0"
          style={{
            backgroundImage: 'url(/images/grid.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
          <DraggableToy imageSrc="/images/purple.png" initialX={150} initialY={150} size="8vw" showHint />
          <DraggableToy imageSrc="/images/yellow.png" initialX={1000} initialY={100} size="10vw" />
          <DraggableToy imageSrc="/images/green.png" initialX={1200} initialY={400} size="9vw" />
          <DraggableToy imageSrc="/images/pink.png" initialX={550} initialY={450} size="10vw" />
        </div>
        <h1 className="text-8xl font-black mb-5 animate-[fadeInUp_1s_ease-out] z-20">BUILD THE FUTURE</h1>
      </section>
   </main>
  );
}
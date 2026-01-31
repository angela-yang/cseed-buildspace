"use client"
import { useState, useEffect, useRef } from "react";
import ProjectCard from "../components/ProjectCard"
import { FaSearch } from "react-icons/fa";
import { projects, type Project, type Cohort } from "../components/ProjectsData";

const ScrollReveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {children}
    </div>
  );
};

export default function Cohorts() {
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
  const [cohortFilter, setCohortFilter] = useState<"all" | Cohort>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter projects based on track, cohort, and search
  const filteredProjects = projects.filter((project) => {
    const matchesTrack =
      filter === "all" || project.track === filter;

    const matchesCohort =
      cohortFilter === "all" || project.cohort === cohortFilter;

    const matchesSearch =
      project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.creatorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTrack && matchesCohort && matchesSearch;
  });

  // Group projects by cohort
  const projectsByCohort = filteredProjects.reduce<Record<number, Project[]>>(
    (acc, project) => {
      acc[project.cohort] ||= [];
      acc[project.cohort].push(project);
      return acc;
    },
    {}
  );

  // Determine which cohorts to display
  const cohortsToDisplay = cohortFilter === "all" 
    ? [4, 3, 2, 1, 0]
    : [cohortFilter];

  return (
    <main>
      <section id="cohorts" className="section py-24 px-6 bg-[rgb(57,123,255)]">
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-end">
            
            {/* Title and Description */}
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 text-white">
                Cohort Showcase
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-white/90">
                See all works from past cohorts.
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

          {/* Cohort Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {(["all", 0, 1, 2, 3, 4] as const).map((cohort) => {
              const isActive = cohortFilter === cohort;

              return (
                <button
                  key={cohort}
                  onClick={() => setCohortFilter(cohort)}
                  className={`px-6 py-2 rounded-full border border-gray-800/75 font-semibold transition-all transform hover:scale-105 ${
                    isActive
                      ? "bg-[rgb(124,165,249)] text-black shadow-lg"
                      : "bg-[rgb(241,239,235)] text-gray-900 hover:bg-gray-100 shadow-sm"
                  }`}
                >
                  {cohort === "all" ? "All Cohorts" : `Cohort ${cohort}`}
                </button>
              );
            })}
          </div>

          {/* Track Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-5">
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

          {/* Display Cohorts */}
          {cohortsToDisplay.map((cohort) => {
            const cohortProjects = projectsByCohort[cohort];
            
            if (!cohortProjects || cohortProjects.length === 0) {
              return null;
            }

            return (
              <div key={cohort} className="mb-20 text-left">
                <h3 className="text-4xl font-bold text-white mb-8">
                  Cohort {cohort}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                  {cohortProjects.map((project, i) => (
                    <ProjectCard key={i} {...project} index={i} />
                  ))}
                </div>
              </div>
            );
          })}

          {/* No Results Message */}
          {filteredProjects.length === 0 && (
            <p className="text-gray-200 text-xl text-center py-12">
              No projects found matching your filters
            </p>
          )}
        </div>
      </section>
   </main>
  );
}
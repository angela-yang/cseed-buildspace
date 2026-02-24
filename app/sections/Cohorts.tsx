"use client"
import { useState, useEffect, useRef } from "react";
import ProjectCard from "../components/ProjectCard"
import { FaSearch } from "react-icons/fa";
import { projects, type Project, type Cohort } from "../components/ProjectsData";

const COLS = 4;

export default function Cohorts() {
  const [filter, setFilter] = useState("all");
  const [cohortFilter, setCohortFilter] = useState<"all" | Cohort>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const PROJECTS_PER_COHORT = 12;
  const [expandedCohorts, setExpandedCohorts] = useState<Record<number, boolean>>({});
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [galleryIndexMap, setGalleryIndexMap] = useState<{ [key: number]: number }>({});
  const [viewportCols, setViewportCols] = useState(COLS);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 768) setViewportCols(1);
      else if (w < 1024) setViewportCols(2);
      else if (w < 1280) setViewportCols(3);
      else setViewportCols(4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleExpand = (index: number) => setExpandedIndex(index);
  const handleCollapse = () => setExpandedIndex(null);

  const filteredProjects = projects.filter((project) => {
    const matchesTrack   = filter === "all" || project.track === filter;
    const matchesCohort  = cohortFilter === "all" || project.cohort === cohortFilter;
    const matchesSearch  =
      project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.creatorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTrack && matchesCohort && matchesSearch;
  });

  useEffect(() => { setExpandedCohorts({}); }, [filter, cohortFilter, searchTerm]);

  const projectsByCohort = filteredProjects.reduce<Record<number, Project[]>>(
    (acc, project) => { acc[project.cohort] ||= []; acc[project.cohort].push(project); return acc; },
    {}
  );

  const cohortsToDisplay = cohortFilter === "all" ? [4, 3, 2, 1, 0] : [cohortFilter];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (expandedIndex === null) return;
      if (e.key === "ArrowRight") setExpandedIndex((prev) => (prev! + 1) % filteredProjects.length);
      else if (e.key === "ArrowLeft") setExpandedIndex((prev) => (prev! - 1 + filteredProjects.length) % filteredProjects.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expandedIndex, filteredProjects]);

  return (
    <main>
      <section id="cohorts" className="section py-24 px-6 bg-[rgb(57,123,255)]">
        <div className="max-w-8xl mx-auto space-y-8 md:space-y-12">
          
          {/* Header */}
          <div className="grid grid-cols-1 px-[5vw] lg:grid-cols-2 gap-6 lg:gap-12 items-end">
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 text-white">Cohort Showcase</h2>
              <p className="text-lg sm:text-xl lg:text-2xl ibm-plex-sans text-white/90">See all works from past cohorts.</p>
            </div>
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
            {(["all", 0, 2, 3, 4] as const).map((cohort) => (
              <button key={cohort} onClick={() => setCohortFilter(cohort)}
                className={`px-6 py-2 rounded-full border border-gray-800/75 font-semibold transition-all transform hover:scale-105 ${
                  cohortFilter === cohort
                    ? "bg-[rgb(124,165,249)] text-black shadow-lg"
                    : "bg-[rgb(241,239,235)] text-gray-900 hover:bg-gray-100 shadow-sm"
                }`}>
                {cohort === "all" ? "All Cohorts" : `Cohort ${cohort}`}
              </button>
            ))}
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
                <button key={track} onClick={() => setFilter(track)}
                  className={`px-6 py-2 rounded-full border-1 border-gray-800/75 font-semibold transition-all transform hover:scale-105 ${
                    filter === track ? "text-black shadow-lg" : "bg-[rgb(241,239,235)] text-gray-900 hover:bg-gray-100 shadow-sm"
                  }`}
                  style={filter === track ? { backgroundColor: getActiveColor() } : {}}>
                  {track.charAt(0).toUpperCase() + track.slice(1)}
                </button>
              );
            })}
          </div>

          {/* Display Cohorts */}
          {cohortsToDisplay.map((cohort) => {
            const cohortProjects = projectsByCohort[cohort];
            if (!cohortProjects || cohortProjects.length === 0) return null;

            const visibleProjects = cohortProjects.slice(
              0, expandedCohorts[cohort] ? cohortProjects.length : PROJECTS_PER_COHORT
            );

            return (
              <div key={cohort} className="mb-20 px-[5vw] text-left">
                <h3 className="text-4xl font-bold text-white mb-8">Cohort {cohort}</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
                  {visibleProjects.map((project, index) => {
                    // Column within the active viewport grid (1-based)
                    const gridColumn = (index % viewportCols) + 1;
                    return (
                      <ProjectCard
                        key={`${project.projectName}-${index}`}
                        {...project}
                        index={index}
                        gridColumn={gridColumn}
                        totalColumns={viewportCols}
                        expandedWidth="48vw"
                        isExpanded={expandedIndex === index}
                        selectedGalleryImage={galleryIndexMap[index] ?? 0}
                        onGalleryChange={(newIndex) =>
                          setGalleryIndexMap((prev) => ({ ...prev, [index]: newIndex }))
                        }
                        onExpand={() => handleExpand(index)}
                        onCollapse={handleCollapse}
                        totalCards={filteredProjects.length} 
                      />
                    );
                  })}
                </div>

                {cohortProjects.length > PROJECTS_PER_COHORT && (
                  <div className="flex justify-center mt-10 space-x-4">
                    <button
                      onClick={() => setExpandedCohorts((prev) => ({ ...prev, [cohort]: !prev[cohort] }))}
                      className="px-8 py-3 rounded-full bg-white text-black font-semibold shadow-lg hover:scale-105 transition-transform"
                    >
                      {expandedCohorts[cohort] ? "View less" : "View more"}
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {filteredProjects.length === 0 && (
            <p className="text-gray-200 text-xl text-center py-12">No projects found matching your filters</p>
          )}
        </div>
      </section>
    </main>
  );
}
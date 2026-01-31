"use client"
import { useState, useEffect, useRef } from "react";
import ProjectCard from "../components/ProjectCard"
import { FaSearch } from "react-icons/fa";
import PhotoGallery from "../sections/PhotoGallery"

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
  const [cohortFilter, setCohortFilter] = useState<"all" | 0 | 1 | 2 | 3 | 4>("all");
  const [searchTerm, setSearchTerm] = useState("");

  type Track = "software" | "hardware" | "wildcard" | "creatives";
  type Cohort = 0 | 1 | 2 | 3 | 4;

  type Project = {
    projectName: string;
    creatorName: string;
    track: Track;
    cohort: Cohort;
    description: string;
    demoLink: string;
    coverImage: string;
    longDescription: string;
    details: { tech: string[] };
  };

  const projects: Project[] = [
    {
      projectName: "Jam Journal",
      creatorName: "Jenny Peng & Kelly Wang",
      track: "software" as const,
      cohort: 3,
      description: "A song annotation platform",
      demoLink: "https://drive.google.com/file/d/1vFHSItXw6BIRBEEMULdq2UdgEFEAfq6_/view",
      coverImage: "/images/projects/jamjournal.png",
      longDescription: "A platform to import YouTube music, take notes at timestamps while listening, and make notes for lyrics.",
      details: { tech: ["React", "JavaScript", "HTML", "Figma"] }
    },
    {
      projectName: "MarioKart Racecar",
      creatorName: "Mukund Senthil Kumar",
      track: "hardware",
      cohort: 3,
      description: "An automated racecar that uses different sensors to traverse the terrain.",
      demoLink: "/images/projects/racecar.mp4",
      coverImage: "/images/projects/racecar.png",
      longDescription: "An automated racecar that uses different sensors to traverse the terrain and not hit obstacles and pedestrians.",
      details: { tech: ["Wide Angled Camera", "Raspberry Pi 4", "PCA9685 PWM Servo Driver Board", "Servo Motor", "Brushed Motor"] }
    },
    {
      projectName: "2048 Agent",
      creatorName: "Brian Yao",
      track: "software",
      cohort: 3,
      description: "An Ai agent that plays the game 2048.",
      demoLink: "/images/projects/2048-2.mp4",
      coverImage: "/images/projects/2048.mp4",
      longDescription: "Using reinforcement learning (DQN and PPO), and expectimax, the agent can predict and perform the most optimal moves in 2048.",
      details: { tech: ["DQN", "PPO", "2048"] }
    },
    {
      projectName: "Verbalize",
      creatorName: "Medha Gupta",
      track: "software",
      cohort: 3,
      description: "An AI-powered multiplayer game that makes behavioral interview prep fun and approachable.",
      demoLink: "https://verbalizeprep.com/landing",
      coverImage: "/images/projects/verbalize.png",
      longDescription: "An AI-powered multiplayer game that makes behavioral interview prep fun and approachable.",
      details: { tech: ["Lucid"] },
    },
    {
      projectName: "Smile w/ me",
      creatorName: "Eva Gonzales-Bravo",
      track: "software",
      cohort: 3,
      description: "A photo booth website where you can take pics and have fun!",
      demoLink: "/images/projects/smile.mp4",
      coverImage: "/images/projects/smile.png",
      longDescription: "This is a hand-coded photo booth website, where you can take photos and add stickers and filters!",
      details: { tech: ["HTML", "CSS", "React"] }
    },
    {
      projectName: "Juicebox",
      creatorName: "Sia Razdan",
      track: "creatives",
      cohort: 3,
      description: "Rewards families for disconnecting from screens - enabling connection, learning, and fun.",
      demoLink: "/images/projects/juicebox.mp4",
      coverImage: "/images/projects/juicebox.png",
      longDescription: "This is a design speculative project to foster connection and disconnecting from screens.",
      details: { tech: ["Figma", "Design", "Wireframing"] }
    },
    {
      projectName: "CoachT",
      creatorName: "Ojas Kandhare",
      track: "software",
      cohort: 3,
      description: "Uses cameras to advance sports performance - An AI coach for martial arts.",
      demoLink: "www.coacht.xyz",
      coverImage: "/images/projects/coacht.png",
      longDescription: "Gets input from real-time camera feed, monitoring joint and angle information. Plugs in the data into DTW and gives AI feedback.",
      details: { tech: ["DTW", "LLMs", "Computer Vision"] }
    },
    {
      projectName: "Fridge Sense",
      creatorName: "Shrima & Arya",
      track: "creatives",
      cohort: 3,
      description: "An app that helps you track what's in your fridge & when it's expiring.",
      demoLink: "/images/projects/fridge.mp4",
      coverImage: "/images/projects/fridge.png",
      longDescription: "A handy tool for knowing what's in your fridge, helps with grocery shopping. Helps combat food waste at the college level!",
      details: { tech: ["React", "Google Firebase", "Sqlite", "Flask", "APIs", "Figma" ] }
    },
    {
      projectName: "Gladius",
      creatorName: "Alex Hsu",
      track: "creatives",
      cohort: 3,
      description: "A plant-themed app that motivates fitness through digital garden growth.",
      demoLink: "/images/projects/gladius.mp4",
      coverImage: "/images/projects/gladius.png",
      longDescription: "Gladius transforms your fitness journey into a motivational experience. It tracks your progress through biometric data.",
      details: { tech: ["Spline", "UX Design", "Figma" ] }
    },
    {
      projectName: "Se7en",
      creatorName: "Noah Hoang, Kshitij Rao, and Chetan Sidhu",
      track: "software",
      cohort: 3,
      description: "An app that fosters UW connectivity and community.",
      demoLink: "/images/projects/seven.mp4",
      coverImage: "/images/projects/seven.png",
      longDescription: "Se7en effortlessly organizes groups of people with similar interests for casual convos/coffee chat-like conversations.",
      details: { tech: ["ROS", "Computer Vision", "GPS", "LiDAR"] }
    },
    {
      projectName: "Nivo",
      creatorName: "Samantha Scalia",
      track: "hardware",
      cohort: 3,
      description: "Goggles designed for comfort and adaptability, delivering a clear and unobstructed view.",
      demoLink: "/images/projects/nivo.mp4",
      coverImage: "/images/projects/nivo.png",
      longDescription: "Prescription lenses, custom fit, all-weather performance, and comfort. The base model is a simple CAD model that can be adjusted to the user's measurements.",
      details: { tech: ["CAD", "Figma", "TPU"] }
    },
    {
      projectName: "Crash Out",
      creatorName: "Amina, Chloe, and Ella",
      track: "software",
      cohort: 3,
      description: "A choice-based mini game that takes place on an island the player crashes onto.",
      demoLink: "/images/projects/crash-out.png",
      coverImage: "/images/projects/crashout.png",
      longDescription: "In order to escape the island, the player must complete tasks, make the right choices, find a special item, and make it to a cave before time runs out.",
      details: { tech: ["Java", "GitHub", "Eclipse"] }
    },
    {
      projectName: "AI Boxer",
      creatorName: "Akshat Mundra",
      track: "wildcard",
      cohort: 3,
      description: "An AI boxer that you can fight against in real time.",
      demoLink: "/images/projects/boxer.mp4",
      coverImage: "/images/projects/boxer1.png",
      longDescription: "An AI boxer that you can fight against in real time.",
      details: { tech: ["Unity"] },
    }
  ];

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


  const projectsByCohort = filteredProjects.reduce<Record<number, Project[]>>(
    (acc, project) => {
      acc[project.cohort] ||= [];
      acc[project.cohort].push(project);
      return acc;
    },
    {}
  );

  return (
    <main>
      <section id="cohorts" className="py-24 px-6 bg-[rgb(57,123,255)]">
        <ScrollReveal>
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

            {/* Cohort Sections */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {["all", 0, 1, 2, 3, 4].map((cohort) => {
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

            {/* Track Filters */}
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

            {(cohortFilter === "all"
              ? [4, 3, 2, 1, 0]
              : [cohortFilter]
            ).map((cohort) => (
              <div key={cohort} className="mb-20 text-left">
                <h3 className="text-4xl font-bold text-white mb-8">
                  Cohort {cohort}
                </h3>

                {projectsByCohort[cohort]?.length ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                    {projectsByCohort[cohort].map((project, i) => (
                      <ProjectCard key={i} {...project} index={i} />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-200 text-xl text-center py-12">
                    No projects found
                  </p>
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>
   </main>
  );
}
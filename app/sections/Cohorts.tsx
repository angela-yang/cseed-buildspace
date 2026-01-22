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

  const projects: Array<{
    projectName: string;
    creatorName: string;
    track: "software" | "hardware" | "wildcard" | "creatives";
    description: string;
    demoLink: string;
    coverImage: string;
    longDescription: string;
    details: { tech: string[] };
  }> = [
    {
      projectName: "Jam Journal",
      creatorName: "Jenny Peng & Kelly Wang",
      track: "software" as const,
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
      description: "An Ai agent that plays the game 2048.",
      demoLink: "/images/projects/2048-2.mp4",
      coverImage: "/images/projects/2048.mp4",
      longDescription: "Using reinforcement learning (DQN and PPO), and expectimax, the agent can predict and perform the most optimal moves in 2048.",
      details: { tech: ["DQN", "PPO", "2048"] }
    },
    {
      projectName: "Smile w/ me",
      creatorName: "Eva Gonzales-Bravo",
      track: "software",
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
      description: "An app that helps you track what's in your fridge & when it's expiring.",
      demoLink: "/images/projects/fridge.mp4",
      coverImage: "/images/projects/fridge.png",
      longDescription: "A handy tool for knowing what's in your fridge, helps with grocery shopping. Helps combat food waste at the college level!",
      details: { tech: ["React", "Google Firebase", "Sqlite", "Flask", "APIs", "Figma" ] }
    },
    {
      projectName: "Gladius",
      creatorName: "Anonymous",
      track: "software",
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
      description: "Goggles designed for comfort and adaptability, delivering a clear and unobstructed view.",
      demoLink: "/images/projects/nivo.mp4",
      coverImage: "/images/projects/nivo.png",
      longDescription: "Prescription lenses, custom fit, all-weather performance, and comfort. The base model is a simple CAD model that can be adjusted to the user's measurements.",
      details: { tech: ["CAD", "Figma", "TPU"] }
    },
    {
      projectName: "Crash Out",
      creatorName: "Amina, Chloe, and Ella",
      track: "wildcard",
      description: "A choice-based mini game that takes place on an island the player crashes onto.",
      demoLink: "/images/projects/crash-out.png",
      coverImage: "/images/projects/crashout.png",
      longDescription: "In order to escape the island, the player must complete tasks, make the right choices, find a special item, and make it to a cave before time runs out.",
      details: { tech: ["Java", "GitHub", "Eclipse"] }
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === "all" || project.track === filter;
    const matchesSearch = project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.creatorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <main>
      <section
        id="cohorts"
        className="section py-24 px-10 relative bg-[rgb(57,123,255)]"
      >
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
              className="absolute w-36 h-36 bg-[rgb(255,231,164)] rounded-full top-[40%] left-[85%]"
              style={{ transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * 0.7}px)` }}
          />
          <div
              className="absolute w-24 h-24 bg-[rgb(133,216,186)] rounded-2xl top-[92%] left-[25%]"
              style={{ transform: `translate(${mousePos.x * -1}px, ${mousePos.y * 1}px)` }}
          />
          <div
              className="absolute w-28 h-28 bg-[rgb(216,109,255)] top-[25%] left-[5%]"
              style={{
              borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
              transform: `translate(${mousePos.x * 1}px, ${mousePos.y * -0.3}px)`
              }}
          />
        </div>

        <ScrollReveal>
          <div className="py-10 px-4 max-w-7xl mx-auto text-center">
            <h2 className="text-5xl font-bold text-center mb-6 text-white">
              Cohort Showcase
            </h2>
            <p className="text-2xl text-center mb-12 text-gray-200">
              View all works from past cohorts!
            </p>
            
            {/* Search bar */}
            <div className="max-w-md mx-auto mb-8 relative">
              <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-100/45 pointer-events-none" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-3 rounded-full border-2 border-white/55 focus:border-white text-white text-xl focus:outline-none transition-colors bg-white/25 shadow-sm"
              />
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap justify-center gap-4">
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
                      ? "text-gray-900 shadow-lg"
                      : "bg-[rgb(241,239,235)] text-gray-700 hover:bg-gray-100 shadow-sm"
                  }`}
                  style={filter === track ? { backgroundColor: getActiveColor() } : {}}
                >
                  {track.charAt(0).toUpperCase() + track.slice(1)}
                </button>
              );
            })}
          </div>
        </div>

          <h2 className="text-4xl font-bold text-left ml-[7vw] mt-10 mb-6 text-white">
            Cohort 4
          </h2>
          {/* Projects grid */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={index} {...project} index={index} />
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-20">
                <p className="text-2xl text-gray-200">No projects found</p>
              </div>
            )}
          </div>

          <PhotoGallery />

          <h2 className="text-4xl font-bold text-left ml-[7vw] mt-20 mb-6 text-white">
            Cohort 3
          </h2>
          {/* Projects grid */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={index} {...project} index={index} />
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-20">
                <p className="text-2xl text-gray-200">No projects found</p>
              </div>
            )}
          </div>

          <h2 className="text-4xl font-bold text-left ml-[7vw] mt-20 mb-6 text-white">
            Cohort 2
          </h2>
          {/* Projects grid */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={index} {...project} index={index} />
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-20">
                <p className="text-2xl text-gray-200">No projects found</p>
              </div>
            )}
          </div>
        </ScrollReveal>
      </section>
   </main>
  );
}
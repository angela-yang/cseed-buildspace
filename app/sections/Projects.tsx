"use client"
import { useState, useEffect, useRef } from "react";
import ProjectCard from "../components/ProjectCard"
import DraggableToy from "../components/DraggableToy"
import { FaSearch } from "react-icons/fa";

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
    gallery?: string[];
  }> = [
    {
      projectName: "Jam Journal",
      creatorName: "Jenny Peng & Kelly Wang",
      track: "software" as const,
      description: "A song annotation platform",
      demoLink: "https://drive.google.com/file/d/1vFHSItXw6BIRBEEMULdq2UdgEFEAfq6_/view",
      coverImage: "/images/projects/jamjournal.png",
      longDescription: "A platform to import YouTube music, take notes at timestamps while listening, and make notes for lyrics.",
      details: { tech: ["React", "Next.js", "HTML", "Figma"] }, 
      gallery: ["/images/projects/jamjournal.png", "/images/projects/jam2.png"]
    },
    {
      projectName: "MarioKart Racecar",
      creatorName: "Mukund Senthil Kumar",
      track: "hardware",
      description: "An automated racecar that uses different sensors to traverse the terrain.",
      demoLink: "/images/projects/racecar.mp4",
      coverImage: "/images/projects/racecar.png",
      longDescription: "An automated racecar that uses different sensors to traverse the terrain and not hit obstacles and pedestrians.",
      details: { tech: ["Raspberry Pi 4", "Servo Motor", "Brushed Motor", "Wide Angled Camera", "PCA9685 PWM Servo Driver Board"] },
      gallery: ["/images/projects/racecar.png", "/images/projects/racecar.mp4"]
    },
    {
      projectName: "2048 Agent",
      creatorName: "Brian Yao",
      track: "software",
      description: "An Ai agent that plays the game 2048.",
      demoLink: "/images/projects/2048-2.mp4",
      coverImage: "/images/projects/2048.mp4",
      longDescription: "Using reinforcement learning (DQN and PPO), and expectimax, the agent can predict and perform the most optimal moves in 2048.",
      details: { tech: ["DQN", "PPO", "2048"] },
      gallery: ["/images/projects/2048.png", "/images/projects/2048-2.png", "/images/projects/2048-3.png", "/images/projects/2048-4.png", "/images/projects/2048.mp4", "/images/projects/2048-2.mp4"]
    },
    {
      projectName: "Smile w/ me",
      creatorName: "Eva Gonzales-Bravo",
      track: "software",
      description: "A photo booth website where you can take pics and have fun!",
      demoLink: "/images/projects/smile.mp4",
      coverImage: "/images/projects/smile.png",
      longDescription: "This is a hand-coded photo booth website, where you can take photos and add stickers and filters!",
      details: { tech: ["HTML", "CSS", "React"] },
      gallery: ["/images/projects/smile.png", "/images/projects/smile.mp4"]
    },
    {
      projectName: "Juicebox",
      creatorName: "Sia Razdan",
      track: "creatives",
      description: "Rewards families for disconnecting from screens - enabling connection, learning, and fun.",
      demoLink: "/images/projects/juicebox.mp4",
      coverImage: "/images/projects/juicebox.png",
      longDescription: "This is a design speculative project to foster connection and disconnecting from screens.",
      details: { tech: ["Figma", "Design", "Wireframing"] },
      gallery: ["/images/projects/juicebox.png", "/images/projects/juicebox.mp4"]
    },
    {
      projectName: "CoachT",
      creatorName: "Ojas Kandhare",
      track: "software",
      description: "Uses cameras to advance sports performance - An AI coach for martial arts.",
      demoLink: "www.coacht.xyz",
      coverImage: "/images/projects/coacht.png",
      longDescription: "Gets input from real-time camera feed, monitoring joint and angle information. Plugs in the data into DTW and gives AI feedback.",
      details: { tech: ["DTW", "LLMs", "Computer Vision"] },
      gallery: ["/images/projects/coacht.png"]
    },
    {
      projectName: "Fridge Sense",
      creatorName: "Shrima & Arya",
      track: "creatives",
      description: "An app that helps you track what's in your fridge and when it's expiring.",
      demoLink: "/images/projects/fridge.mp4",
      coverImage: "/images/projects/fridge.png",
      longDescription: "A handy tool for knowing what's in your fridge, helps with grocery shopping. Helps combat food waste at the college level!",
      details: { tech: ["React", "Google Firebase", "Sqlite", "Flask", "APIs", "Figma" ] },
      gallery: ["/images/projects/fridge.png", "/images/projects/fridge.mp4"]
    },
    {
      projectName: "Gladius",
      creatorName: "Anonymous",
      track: "software",
      description: "A plant-themed app that motivates fitness through digital garden growth.",
      demoLink: "/images/projects/gladius.mp4",
      coverImage: "/images/projects/gladius.png",
      longDescription: "Gladius transforms your fitness journey into a motivational experience. It tracks your progress through biometric data.",
      details: { tech: ["Spline", "UX Design", "Figma" ] },
      gallery: ["/images/projects/gladius.png", "/images/projects/gladius.mp4"]
    },
    {
      projectName: "Se7en",
      creatorName: "Noah Hoang, Kshitij Rao, and Chetan Sidhu",
      track: "software",
      description: "An app that fosters UW connectivity and community.",
      demoLink: "/images/projects/seven.mp4",
      coverImage: "/images/projects/seven.png",
      longDescription: "Se7en effortlessly organizes groups of people with similar interests for casual convos/coffee chat-like conversations.",
      details: { tech: ["ROS", "Computer Vision", "GPS", "LiDAR"] },
      gallery: ["/images/projects/seven.png", "/images/projects/seven.mp4"]
    },
    {
      projectName: "Nivo",
      creatorName: "Samantha Scalia",
      track: "hardware",
      description: "Goggles designed for comfort and adaptability, delivering a clear and unobstructed view.",
      demoLink: "/images/projects/nivo.mp4",
      coverImage: "/images/projects/nivo.png",
      longDescription: "Prescription lenses, custom fit, all-weather performance, and comfort. The base model is a simple CAD model that can be adjusted to the user's measurements.",
      details: { tech: ["CAD", "Figma", "TPU"] },
      gallery: ["/images/projects/nivo.png", "/images/projects/nivo.mp4"]
    },
    {
      projectName: "Content Creation",
      creatorName: "Tiffany Yan",
      track: "creatives",
      description: "Building my content creation through Instagram, LinkedIn, and Notion.",
      demoLink: "https://www.instagram.com/tiffanyyan.mov/",
      coverImage: "/images/projects/content-1.png",
      longDescription: "Creativity is very important to me, including design, music, modeling, photography, maker space, and calligraphy.",
      details: { tech: ["Instagram", "LinkedIn", "Notion"] },
      gallery: ["/images/projects/content.png", "/images/projects/content-1.png", "/images/projects/content-2.png", "/images/projects/content-3.png", "/images/projects/content-4.png", "/images/projects/content-5.png"]
    },
    {
      projectName: "Bobby",
      creatorName: "Carter Swartout & Andrew Edwards",
      track: "hardware",
      description: "A homemade Alexa and digital assistant that incorporates hardware, software, and gen AI.",
      demoLink: "/images/projects/bobby.png",
      coverImage: "/images/projects/bobby.png",
      longDescription: "A homemade Alexa and digital assistant that incorporates hardware, software, and gen AI.",
      details: { tech: ["Python", ""] },
      gallery: ["/images/projects/bobby.png"]
    },
    {
      projectName: "Crash Out",
      creatorName: "Amina, Chloe, and Ella",
      track: "wildcard",
      description: "A choice-based mini game that takes place on an island the player crashes onto.",
      demoLink: "/images/projects/crash-out.png",
      coverImage: "/images/projects/crashout.png",
      longDescription: "In order to escape the island, the player must complete tasks, make the right choices, find a special item, and make it to a cave before time runs out.",
      details: { tech: ["Java", "GitHub", "Eclipse"] },
      gallery: ["/images/projects/crashout.png", "/images/projects/crash-out.png"]
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
        id="projects"
        className="section py-16 md:py-24 px-4 sm:px-6 lg:px-10 relative bg-[rgb(57,123,255)]"
      >
        <ScrollReveal>
          <div className="min-h-screen py-10">
            <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">
              
              {/* Header with Title and Search */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-end">
                
                {/* Left: Title and Description */}
                <div>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 text-white">
                    Featured Projects
                  </h2>
                  <p className="text-lg sm:text-xl lg:text-2xl text-white/90">
                    Discover amazing projects from our past cohorts
                  </p>
                </div>

                {/* Right: Search Bar */}
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
                  <p className="text-2xl text-gray-200">No projects found</p>
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
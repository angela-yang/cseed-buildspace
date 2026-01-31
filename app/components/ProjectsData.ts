export type Track = "software" | "hardware" | "wildcard" | "creatives";
export type Cohort = 0 | 1 | 2 | 3 | 4;

export type Project = {
  projectName: string;
  creatorName: string;
  track: Track;
  cohort: Cohort;
  description: string;
  demoLink: string;
  coverImage: string;
  longDescription: string;
  details: { tech: string[] };
  gallery?: string[];
  featured?: boolean;
};

// ==================== COHORT 4 ====================
export const cohort4Projects: Project[] = [
  {
    projectName: "Mindspace",
    creatorName: "Abdul Muhsin Hameed",
    track: "software" as const,
    cohort: 4,
    description: "The civilian, good guy version of tron: ares.",
    demoLink: "https://muhsinh.github.io/mind.space/",
    coverImage: "/images/projects/mindspace.png",
    longDescription: "A transparent safety layer for AI therapy.",
    details: { tech: ["React", "Vite", "TailwindCSS", "JavaScript", "Python", "Shell"] }, 
    gallery: ["/images/projects/mindspace.png", "/images/projects/mindspace1.png", "/images/projects/mindspace2.png"],
    featured: true
  },
  {
    projectName: "Checkpoint",
    creatorName: "Tisya Bhatia",
    track: "software" as const,
    cohort: 4,
    description: "Helping neurodivergent users stay focused with dopamine-boost activities and AI.",
    demoLink: "https://checkpoint-fitness-cjxvojvgz-tisya-bhatias-projects.vercel.app/",
    coverImage: "/images/projects/checkpoint.png",
    longDescription: "Uses progressive overload, overall training volume & gain strengths, and lots of exercises to help boost your fitness.",
    details: { tech: ["React", "Vite", "Vision API", "JavaScript", "Python"] }, 
    gallery: ["/images/projects/checkpoint.png", "/images/projects/checkpoint-1.png", "/images/projects/checkpoint1.png", "/images/projects/checkpoint2.png", "/images/projects/checkpoint3.png", "/images/projects/checkpoint4.png"],
    featured: true
  },
  {
    projectName: "RareCare Pipeline",
    creatorName: "Douglas Lin & Andy Hou",
    track: "software" as const,
    cohort: 4,
    description: "Medical pipeline that analyzes symptoms, runs targeted tests, and suggests potential treatments for rare diseases.",
    demoLink: "https://variant-intel.streamlit.app/",
    coverImage: "/images/projects/med2.png",
    longDescription: "Medical pipeline that analyzes symptoms, runs targeted tests, and suggests potential treatments for rare diseases.",
    details: { tech: ["Python", "Streamlit"] }, 
    gallery: ["/images/projects/med2.png", "/images/projects/med1.png", "/images/projects/med.png"],
    featured: false
  },
  {
    projectName: "dawgdig",
    creatorName: "Joshua Ton",
    track: "software" as const,
    cohort: 4,
    description: "UW student focused planner and rso/event discovery web app.",
    demoLink: "https://dawgdig.vercel.app/",
    coverImage: "/images/projects/dawg.png",
    longDescription: "A UW focused app dedicated to help students find RSOs and events that they actually care about and organize it all in one place.",
    details: { tech: ["React", "Spring Boot"] }, 
    gallery: ["/images/projects/dawg1.png", "/images/projects/dawg2-2.png", "/images/projects/dawg3-2.png", "/images/projects/dawg4-2.png", "/images/projects/dawg5-2.png"],
    featured: true
  },
  {
    projectName: "EcoScan",
    creatorName: "Nandini Khandelwal",
    track: "software" as const,
    cohort: 4,
    description: "A tool that analyzes a user’s AI usage and shows its environmental impact.",
    demoLink: "",
    coverImage: "/images/projects/eco1.png",
    longDescription: "A tool that analyzes a user’s AI usage and shows its environmental impact.",
    details: { tech: ["React", "Python"] }, 
    gallery: ["/images/projects/eco2.png", "/images/projects/eco1.png", "/images/projects/eco.png"],
    featured: false
  },
  {
    projectName: "Sensei",
    creatorName: "Sahana Narendran",
    track: "software" as const,
    cohort: 4,
    description: "A smart timesheet for self-employed side hustlers.",
    demoLink: "",
    coverImage: "/images/projects/sensei.png",
    longDescription: "A smart timesheet for self-employed side hustlers.",
    details: { tech: ["Lovable", "Cursor"] }, 
    gallery: ["/images/projects/sensei.png", "/images/projects/sensei2.png", "/images/projects/sensei3.png"],
    featured: true
  },
  {
    projectName: "Itinderary",
    creatorName: "Chloe Bogen",
    track: "software" as const,
    cohort: 4,
    description: "Swipe through Seattle activities and auto-builds a personalized itinerary, tinder-style.",
    demoLink: "/images/projects/itinderary.mp4",
    coverImage: "/images/projects/itinderary.mp4",
    longDescription: "Swipe through Seattle activities and auto-builds a personalized itinerary, tinder-style.",
    details: { tech: ["React", "Vite", "OpenAI API"] }, 
    gallery: ["/images/projects/itinderary.png", "/images/projects/itinderary2.png"],
    featured: true
  },
  {
    projectName: "Train of Thought",
    creatorName: "Dhanasri Prabhu, Devanshi Rautraya, and Rishali Vuriti",
    track: "software" as const,
    cohort: 4,
    description: "An adaptive Trolley Problem Simulator.",
    demoLink: "/images/projects/trolley.mp4",
    coverImage: "/images/projects/trolley3.png",
    longDescription: "An adaptive Trolley Problem Simulator.",
    details: { tech: ["Google Gemini", "HTML", "CSS", "JavaScript"] }, 
    gallery: ["/images/projects/trolley.png", "/images/projects/trolley2.png"],
    featured: false
  },
  {
    projectName: "LandDev Map",
    creatorName: "Advaith Vankamamidi",
    track: "software" as const,
    cohort: 4,
    description: "Interactive map that helps make land-development decisions more informed.",
    demoLink: "",
    coverImage: "/images/projects/land1.png",
    longDescription: "Interactive map that shows zoning, environmental rules, utilities to make land-development decisions more informed.",
    details: { tech: ["Python", "OpenCV", "PyVista"] }, 
    gallery: ["/images/projects/land.png", "/images/projects/land1.png"],
    featured: false
  },
  {
    projectName: "Hermopolis",
    creatorName: "Nikki Mihaylova",
    track: "software" as const,
    cohort: 4,
    description: "A community where you can upload, translate, discuss, and nerd out about quotes in any language.",
    demoLink: "https://linktr.ee/hermopolisblog",
    coverImage: "/images/projects/herm2.png",
    longDescription: "A community where you can upload, translate, discuss, and nerd out about quotes in any language.",
    details: { tech: ["Firebase", "HTML", "JavaScript", "CSS", "Figma"] }, 
    gallery: ["/images/projects/herm2.png", "/images/projects/herm1.png", "/images/projects/herm.png"],
    featured: false
  },
  {
    projectName: "You Will Always Get Through",
    creatorName: "Samvedha Basireddy",
    track: "software" as const,
    cohort: 4,
    description: "Short, personalized micro-rituals to help people reset during stressful moments.",
    demoLink: "",
    coverImage: "/images/projects/meditate1.png",
    longDescription: "Short, personalized micro-rituals to help people reset during stressful moments.",
    details: { tech: ["React", "Vite", "TailwindCSS", "TypeScript"] }, 
    gallery: ["/images/projects/meditate1.png", "/images/projects/meditate.png", "/images/projects/meditate2.png"],
    featured: false
  },
  {
    projectName: "Access Map",
    creatorName: "Neha Dubhashi, Daniel Welicki, Cady Xia, and Trisha Bhatawdekar",
    track: "software" as const,
    cohort: 4,
    description: "Accessibility details for campus events for students with disabilities.",
    demoLink: "",
    coverImage: "/images/projects/access.png",
    longDescription: "Accessibility details for campus events for students with disabilities.",
    details: { tech: ["Expo", "Android Studio"] }, 
    gallery: ["/images/projects/access2.png", "/images/projects/access1.png", "/images/projects/access.png"],
    featured: true
  },
  {
    projectName: "Plink: Piano Map",
    creatorName: "Benito Correa",
    track: "software" as const,
    cohort: 4,
    description: "Map of public pianos and with rating details like tuning, access, and condition.",
    demoLink: "/images/projects/plink.mp4",
    coverImage: "/images/projects/plink1.png",
    longDescription: "",
    details: { tech: ["React", "TailwindCSS", "Vite", "TypeScript", "Firebase", "Howler.js"] }, 
    gallery: ["/images/projects/plink1.png", "/images/projects/plink.png", "/images/projects/checkpoint-1.png"],
    featured: false
  },
  {
    projectName: "Citesy",
    creatorName: "Dulguun Uuganbaatar",
    track: "creatives" as const,
    cohort: 4,
    description: "Citation generator for written work.",
    demoLink: "/images/projects/citesy.mp4",
    coverImage: "/images/projects/citesy0.png",
    longDescription: "Citation generator for written work.",
    details: { tech: ["HTML", "Python", "API"] }, 
    gallery: ["/images/projects/citesy0.png", "/images/projects/citesy2.png", "/images/projects/citesy2.png", "/images/projects/citesy.mp4"],
    featured: false
  },
  {
    projectName: "Kyusoku App",
    creatorName: "Jake Wicke",
    track: "software" as const,
    cohort: 4,
    description: "Turns highlighted Japanese words into instant flashcards without interrupting your reading.",
    demoLink: "",
    coverImage: "/images/projects/kyu.png",
    longDescription: "Turns highlighted Japanese words into instant flashcards without interrupting your reading.",
    details: { tech: ["AWS", "Ajax", "JavaScript", "HTML", "CSS"] }, 
    gallery: ["/images/projects/kyu.png", "/images/projects/kyu2.png", "/images/projects/kyu3.png", "/images/projects/kyu4.png"],
    featured: false
  },
  {
    projectName: "Claverito Scavenger Hunt Map",
    creatorName: "Selena Liu",
    track: "creatives" as const,
    cohort: 4,
    description: "A printed scavenger hunt map for visitors to get to know Claverito, a floodplain community in Peru.",
    demoLink: "",
    coverImage: "/images/projects/peru.png",
    longDescription: "A printed scavenger hunt map for visitors to get to know Claverito, a floodplain community in Peru, better.",
    details: { tech: ["Figma", "Canva"] }, 
    gallery: ["/images/projects/peru.png", "/images/projects/peru4.png", "/images/projects/peru5.png", "/images/projects/peru2.png", "/images/projects/peru3.png"],
    featured: false
  },
  {
    projectName: "AutoFetcher",
    creatorName: "Wallace Ruan",
    track: "hardware" as const,
    cohort: 4,
    description: "A contraption that automatically shoots a ball for a dog to fetch.",
    demoLink: "/images/projects/fetch.mp4",
    coverImage: "/images/projects/fetch2.png",
    longDescription: "A contraption that automatically shoots a ball for a dog to fetch.",
    details: { tech: ["PVC Pipe", "Cardboard", "Tire", "Compression Spring"] }, 
    gallery: ["/images/projects/fetch2.png", "/images/projects/fetch.png", "/images/projects/fetch.mp4"],
    featured: false
  },
  {
    projectName: "RagaID",
    creatorName: "Suraj Shivakumar",
    track: "software" as const,
    cohort: 4,
    description: "AI tool that listens to Indian classical music and identifies the raga.",
    demoLink: "",
    coverImage: "/images/projects/raga0.png",
    longDescription: "AI tool that listens to Indian classical music and identifies the raga - like Shazam but for Carnatic compositions",
    details: { tech: ["Python", "Dunya API", "CRNN"] }, 
    gallery: ["/images/projects/raga0.png", "/images/projects/raga2.png", "/images/projects/raga3.png", "/images/projects/raga4.png", "/images/projects/raga5.png", "/images/projects/raga.png", "/images/projects/raga1.png"],
    featured: false
  },
  {
    projectName: "Graham's Youtube",
    creatorName: "Graham Cobden",
    track: "creatives" as const,
    cohort: 4,
    description: "Channel with about cool things Graham does and finds interesting.",
    demoLink: "https://www.youtube.com/shorts/M_K3L8nIwTU",
    coverImage: "/images/projects/graham.png",
    longDescription: "Channel with about cool things Graham does and finds interesting.",
    details: { tech: ["YouTube"] }, 
    gallery: ["/images/projects/graham.png", "/images/projects/yt.png", "/images/projects/yt1.png"],
    featured: false
  },
  {
    projectName: "Shui-ify - Feng Shui Your Room",
    creatorName: "Thomas Wang, Shiven Friedeman, and William Dinh",
    track: "software" as const,
    cohort: 4,
    description: "Arrange your room using feng shui principles.",
    demoLink: "https://www.youtube.com/watch?v=viFyMBvne8E&t=2s",
    coverImage: "/images/projects/feng2.png",
    longDescription: "Arrange your room using feng shui principles by generating an optimized layout based on your furniture and space.",
    details: { tech: ["PulP python"] }, 
    gallery: ["/images/projects/feng2.png", "/images/projects/feng3.png", "/images/projects/feng.png", "/images/projects/feng1.png"],
    featured: true
  },
  {
    projectName: "Silhouette",
    creatorName: "Surya Duraivenkatesh & Shiloh Dhasan",
    track: "software" as const,
    cohort: 4,
    description: "Tiny LiDAR sensors that maps how customers move in small stores.",
    demoLink: "https://colab.research.google.com/drive/1_eSzbMg9M51AQp_5JrGCWMciLskr6w2H?usp=sharing",
    coverImage: "/images/projects/sil0.png",
    longDescription: "Tiny LiDAR sensors that maps how customers move in small stores and generates heat maps with layout suggestions.",
    details: { tech: ["Google Colab", "Python"] }, 
    gallery: ["/images/projects/sil.png", "/images/projects/sil1.png", "/images/projects/sil3.png", "/images/projects/sil2.png"],
    featured: true
  },
  {
    projectName: "Smart Funds",
    creatorName: "Raika Roy Choudhury",
    track: "software" as const,
    cohort: 4,
    description: "Web app that teaches college students financial literacy.",
    demoLink: "https://v0-smart-funds-gamification-demo.vercel.app/",
    coverImage: "/images/projects/smartfunds.png",
    longDescription: "Web app that teaches college students financial literacy.",
    details: { tech: ["React", "Next.js", "TailwindCSS", "TypeScript"] }, 
    gallery: ["/images/projects/smartfunds.png", "/images/projects/fund1.png", "/images/projects/fund0.png"],
    featured: false
  },
  {
    projectName: "Talunt",
    creatorName: "Avi Agola",
    track: "software" as const,
    cohort: 4,
    description: "AI-powered recruiting platform that sources, screens, and schedules candidates with transparent feedback.",
    demoLink: "https://app.talunt.io",
    coverImage: "/images/projects/talunt.png",
    longDescription: "AI-powered recruiting platform that sources, screens, and schedules candidates with transparent feedback.",
    details: { tech: ["React", "Next.js", "TypeScripte"] }, 
    gallery: ["/images/projects/talunt0.png", "/images/projects/talunt1.png", "/images/projects/talunt2.png", "/images/projects/talunt3.png", "/images/projects/talunt4.png"],
    featured: false
  },
  {
    projectName: "Yomi Sensei",
    creatorName: "Keanu Thakalath",
    track: "software" as const,
    cohort: 4,
    description: "An e-reader that automatically tracks your reading level.",
    demoLink: "/images/projects/yomi.mp4",
    coverImage: "/images/projects/yomi0.png",
    longDescription: "An e-reader that automatically tracks your reading level.",
    details: { tech: ["Mecab", "Aozora Bunko"] }, 
    gallery: ["/images/projects/yomi0.png", "/images/projects/yomi1.png"],
    featured: true
  },
  {
    projectName: "HeartBeats",
    creatorName: "Hriesha Popat & Saachi Dhamija",
    track: "software" as const,
    cohort: 4,
    description: "Matches your real-time heart rate to music and auto-creates playlists that fit your workout energy.",
    demoLink: "/images/projects/beats.mp4",
    coverImage: "/images/projects/beats.png",
    longDescription: "Matches your real-time heart rate to music and auto-creates playlists that fit your workout energy.",
    details: { tech: ["Swift", "Python", "k-NN algorithm"] }, 
    gallery: ["/images/projects/beats.png", "/images/projects/beats1.png", "/images/projects/beats3.png", "/images/projects/beats2.png"],
    featured: true
  },
  {
    projectName: "GenreVision",
    creatorName: "Tanush Ganji",
    track: "software" as const,
    cohort: 4,
    description: "Predicts the genre of a song given an mp3/wav and gather statistics that shows visualized data.",
    demoLink: "",
    coverImage: "/images/projects/genre.png",
    longDescription: "Predicts the genre of a song given an mp3/wav and gather statistics that shows visualized data.",
    details: { tech: ["Streamlit", "Python", "Tensorflow", "PyTorch"] }, 
    gallery: ["/images/projects/genre.png", "/images/projects/genre1.png", "/images/projects/genre2.png", "/images/projects/genre2.png"],
    featured: false
  },
  {
    projectName: "Husky Space",
    creatorName: "Ahana Mangla",
    track: "software" as const,
    cohort: 4,
    description: "A platform for dorm students to help find community, stay updated on events, and manage communal spaces.",
    demoLink: "",
    coverImage: "/images/projects/space.png",
    longDescription: "A platform for dorm students to help find community, stay updated on events, and manage communal spaces.",
    details: { tech: ["Flutterflow", "Figma", "Firestore"] }, 
    gallery: ["/images/projects/space.png", "/images/projects/space1.png", "/images/projects/space2.png", "/images/projects/space2.png", "/images/projects/space3.png", "/images/projects/space4.png"],
    featured: false
  },
  {
    projectName: "Click",
    creatorName: "Kairui Cheng, Matthew Epshtein, and Rayan Rizwan",
    track: "software" as const,
    cohort: 4,
    description: "App that lets students “tap phones” to create connection bridges.",
    demoLink: "https://click-us.vercel.app/",
    coverImage: "/images/projects/click.png",
    longDescription: "App that lets students “tap phones” to create connection bridges and pairs them for short conversations to build real friendships.",
    details: { tech: ["Kotlin Compose", "Python", "Mongo", "Supabase"] }, 
    gallery: ["/images/projects/click1.png", "/images/projects/click3.png", "/images/projects/click4.png", "/images/projects/click2.png"],
    featured: true
  }
];

// ==================== COHORT 3 ====================
export const cohort3Projects: Project[] = [
  {
    projectName: "Jam Journal",
    creatorName: "Jenny Peng & Kelly Wang",
    track: "creatives" as const,
    cohort: 3,
    description: "A song annotation platform",
    demoLink: "https://drive.google.com/file/d/1vFHSItXw6BIRBEEMULdq2UdgEFEAfq6_/view",
    coverImage: "/images/projects/jamjournal.png",
    longDescription: "A platform to import YouTube music, take notes at timestamps while listening, and make notes for lyrics.",
    details: { tech: ["React", "Next.js", "HTML", "Figma"] }, 
    gallery: ["/images/projects/jamjournal.png", "/images/projects/jam2.png"],
    featured: true
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
    details: { tech: ["Raspberry Pi 4", "Servo Motor", "Brushed Motor", "Wide Angled Camera", "PCA9685 PWM Servo Driver Board"] },
    gallery: ["/images/projects/racecar.png", "/images/projects/racecar.mp4"],
    featured: true
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
    details: { tech: ["DQN", "PPO", "2048"] },
    gallery: ["/images/projects/2048.png", "/images/projects/2048-2.png", "/images/projects/2048-3.png", "/images/projects/2048-4.png", "/images/projects/2048.mp4", "/images/projects/2048-2.mp4"],
    featured: false
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
    gallery: ["/images/projects/verbalize.png", "/images/projects/verbalize1.png", "/images/projects/verbalize2.png", "/images/projects/verbalize2.png"],
    featured: true
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
    details: { tech: ["HTML", "CSS", "React"] },
    gallery: ["/images/projects/smile.png", "/images/projects/smile.mp4"],
    featured: false
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
    details: { tech: ["Figma", "Design", "Wireframing"] },
    gallery: ["/images/projects/juicebox.png", "/images/projects/juicebox.mp4"],
    featured: false
  },
  {
    projectName: "Fridge Sense",
    creatorName: "Shrima & Arya",
    track: "software",
    cohort: 3,
    description: "Smart food tracking app for your fridge, creating an easy way to track food expiry dates and reduce waste.",
    demoLink: "/images/projects/fridge.mp4",
    coverImage: "/images/projects/fridge.png",
    longDescription: "A handy tool for knowing what's in your fridge, helps with grocery shopping. Helps combat food waste at the college level!",
    details: { tech: ["React", "Google Firebase", "Sqlite", "Flask", "APIs", "Figma" ] },
    gallery: ["/images/projects/fridge.png", "/images/projects/fridge.mp4"],
    featured: true
  },
  {
    projectName: "Gladius",
    creatorName: "Alex Hsu",
    track: "creatives",
    cohort: 3,
    description: "Can't grow your plants without growing your muscles.",
    demoLink: "/images/projects/gladius.mp4",
    coverImage: "/images/projects/gladius.png",
    longDescription: "A plant-themed app that motivates fitness through digital garden growth. Gladius transforms your fitness journey into a motivational experience. It tracks your progress through biometric data.",
    details: { tech: ["Spline", "UX Design", "Figma" ] },
    gallery: ["/images/projects/gladius.png", "/images/projects/gladius.mp4"],
    featured: true
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
    details: { tech: ["ROS", "Computer Vision", "GPS", "LiDAR"] },
    gallery: ["/images/projects/seven.png", "/images/projects/seven.mp4"],
    featured: false
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
    details: { tech: ["CAD", "Figma", "TPU"] },
    gallery: ["/images/projects/nivo.png", "/images/projects/nivo.mp4"],
    featured: false
  },
  {
    projectName: "Content Creation",
    creatorName: "Tiffany Yan",
    track: "creatives",
    cohort: 3,
    description: "Building my content creation through Instagram, LinkedIn, and Notion.",
    demoLink: "https://www.instagram.com/tiffanyyan.mov/",
    coverImage: "/images/projects/content-1.png",
    longDescription: "Creativity is very important to me, including design, music, modeling, photography, maker space, and calligraphy.",
    details: { tech: ["Instagram", "LinkedIn", "Notion"] },
    gallery: ["/images/projects/content.png", "/images/projects/content-1.png", "/images/projects/content-2.png", "/images/projects/content-3.png", "/images/projects/content-4.png", "/images/projects/content-5.png"],
    featured: false
  },
  {
    projectName: "Bobby",
    creatorName: "Carter Swartout & Andrew Edwards",
    track: "hardware",
    cohort: 3,
    description: "A homemade Alexa and digital assistant that incorporates hardware, software, and gen AI.",
    demoLink: "/images/projects/bobby.png",
    coverImage: "/images/projects/bobby.png",
    longDescription: "A homemade Alexa and digital assistant that incorporates hardware, software, and gen AI.",
    details: { tech: ["Python", "Raspberry Pi"] },
    gallery: ["/images/projects/bobby.png"],
    featured: false
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
    details: { tech: ["Java", "GitHub", "Eclipse"] },
    gallery: ["/images/projects/crashout.png", "/images/projects/crash-out.png"],
    featured: false
  },
  {
    projectName: "Parallel Simulation",
    creatorName: "Benedict Wong",
    track: "hardware",
    cohort: 3,
    description: "AWS cloud architecture that enables parallel simulation applications to transform and analyze data.",
    demoLink: "/images/projects/aws.mp4",
    coverImage: "/images/projects/aws.png",
    longDescription: "AWS cloud architecture that enables parallel simulation applications to transform and analyze data.",
    details: { tech: ["AWS", "Cloud Architecture"] },
    gallery: ["/images/projects/aws.png", "/images/projects/aws.mp4"],
    featured: false
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
    gallery: ["/images/projects/boxer1.png", "/images/projects/boxer.png", "/images/projects/boxer.mp4"],
    featured: true
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
    details: { tech: ["DTW", "LLMs", "Computer Vision"] },
    featured: false
  },
];

// ==================== COHORT 2 ====================
export const cohort2Projects: Project[] = [
  {
    projectName: "Jam Journal",
    creatorName: "Jenny Peng & Kelly Wang",
    track: "creatives" as const,
    cohort: 3,
    description: "A song annotation platform",
    demoLink: "https://drive.google.com/file/d/1vFHSItXw6BIRBEEMULdq2UdgEFEAfq6_/view",
    coverImage: "/images/projects/jamjournal.png",
    longDescription: "A platform to import YouTube music, take notes at timestamps while listening, and make notes for lyrics.",
    details: { tech: ["React", "Next.js", "HTML", "Figma"] }, 
    gallery: ["/images/projects/jamjournal.png", "/images/projects/jam2.png"],
    featured: true
  },
];

// ==================== COHORT 1 ====================
export const cohort1Projects: Project[] = [
  {
    projectName: "Jam Journal",
    creatorName: "Jenny Peng & Kelly Wang",
    track: "creatives" as const,
    cohort: 3,
    description: "A song annotation platform",
    demoLink: "https://drive.google.com/file/d/1vFHSItXw6BIRBEEMULdq2UdgEFEAfq6_/view",
    coverImage: "/images/projects/jamjournal.png",
    longDescription: "A platform to import YouTube music, take notes at timestamps while listening, and make notes for lyrics.",
    details: { tech: ["React", "Next.js", "HTML", "Figma"] }, 
    gallery: ["/images/projects/jamjournal.png", "/images/projects/jam2.png"],
    featured: true
  },
];

// ==================== COHORT 0 ====================
export const cohort0Projects: Project[] = [
  {
    projectName: "Jam Journal",
    creatorName: "Jenny Peng & Kelly Wang",
    track: "creatives" as const,
    cohort: 3,
    description: "A song annotation platform",
    demoLink: "https://drive.google.com/file/d/1vFHSItXw6BIRBEEMULdq2UdgEFEAfq6_/view",
    coverImage: "/images/projects/jamjournal.png",
    longDescription: "A platform to import YouTube music, take notes at timestamps while listening, and make notes for lyrics.",
    details: { tech: ["React", "Next.js", "HTML", "Figma"] }, 
    gallery: ["/images/projects/jamjournal.png", "/images/projects/jam2.png"],
    featured: true
  },
];

// ==================== HELPER FUNCTIONS ====================

// Combined array of all projects
export const projects: Project[] = [
  ...cohort4Projects,
  ...cohort3Projects,
  ...cohort2Projects,
  ...cohort1Projects,
  ...cohort0Projects,
];

// Get only featured projects
export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.featured === true);
};

// Get projects by cohort
export const getProjectsByCohort = (cohort: Cohort): Project[] => {
  switch(cohort) {
    case 4: return cohort4Projects;
    case 3: return cohort3Projects;
    case 2: return cohort2Projects;
    case 1: return cohort1Projects;
    case 0: return cohort0Projects;
    default: return [];
  }
};
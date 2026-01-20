import { useState, useEffect } from "react";

const trackColors = {
  software: {
    gradient: "from-green-50 to-emerald-50",
    border: "border-green-200",
    badge: "bg-[rgb(19,163,122)] text-white",
    tag: "bg-green-100 text-green-700"
  },
  hardware: {
    gradient: "from-purple-50 to-blue-50",
    border: "border-purple-200",
    badge: "bg-[rgb(136,0,185)] text-white",
    tag: "bg-purple-100 text-purple-700"
  },
  wildcard: {
    gradient: "from-purple-50 to-pink-50",
    border: "border-pink-200",
    badge: "bg-[rgb(255,0,102)] text-white",
    tag: "bg-pink-100 text-pink-700"
  },
  creatives: {
    gradient: "from-yellow-50 to-orange-50",
    border: "border-yellow-200",
    badge: "bg-[rgb(239,183,27)] text-white",
    tag: "bg-yellow-100 text-yellow-700"
  }
};

export default function ProjectCard({ 
  projectName = "AI Image Generator",
  creatorName = "Jane Doe",
  description = "A powerful tool that uses machine learning to generate stunning images from text prompts.",
  demoLink = "https://demo.example.com",
  coverImage = "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
  track = "software" as keyof typeof trackColors,
  longDescription = "This project leverages state-of-the-art diffusion models to transform textual descriptions into high-quality images. Built with Python and TensorFlow, it features a user-friendly interface and supports multiple art styles. The model was trained on a diverse dataset and can generate images in various resolutions.",
  details = {
    tech: ["Python", "TensorFlow", "React", "FastAPI"],
  },
  index = 0
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hoverRotation, setHoverRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const colors = trackColors[track as keyof typeof trackColors] || trackColors.software;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Generate random rotation between -1.5 and 1.5 degrees
    const randomX = (Math.random() - 0.5) * 3;
    const randomY = (Math.random() - 0.5) * 3;
    setHoverRotation({ x: randomX, y: randomY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoverRotation({ x: 0, y: 0 });
  };

  return (
    <div 
      className={`perspective-1000 w-80 h-96 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      data-cursor="pointer"
    >
      <div 
        className={`relative w-full h-full transition-all duration-700 transform-style-3d cursor-pointer ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ 
          transformStyle: 'preserve-3d',
          transform: `
            rotateY(${isFlipped ? 180 : 0}deg)
            rotateX(${isHovered && !isFlipped ? hoverRotation.x : 0}deg)
            rotateZ(${isHovered && !isFlipped ? hoverRotation.y : 0}deg)
            scale(${isHovered && !isFlipped ? 1.05 : 1})
          `,
          transition: 'transform 0.7s'
        }}
      >
        {/* Front of card */}
        <div 
          data-cursor="pointer"
          className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="relative h-48 overflow-hidden">
            {coverImage.endsWith('.mp4') ? (
              <video 
                src={coverImage} 
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img 
                src={coverImage} 
                alt={projectName}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            {/* Track badge */}
            <div className={`absolute top-3 right-3 ${colors.badge} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide`}>
              {track}
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{projectName}</h3>
            <p className="text-sm text-gray-500 mb-3">by {creatorName}</p>
            <p className="text-gray-600 text-sm line-clamp-3 mb-4">{description}</p>
            
            <a 
              href={demoLink}
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              View Demo
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
          
          <div className="absolute bottom-4 right-4 text-gray-400 text-xs">
            Click to see more
          </div>
        </div>

        {/* Back of card */}
        <div
          data-cursor="pointer"
          className={`absolute w-full h-full backface-hidden bg-gradient-to-br ${colors.gradient} rounded-xl shadow-lg overflow-hidden border ${colors.border} p-6`}
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Project Details</h3>
            <span className={`${colors.badge} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide`}>
              {track}
            </span>
          </div>
          
          <div className="space-y-4 overflow-y-auto h-64">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Description</h4>
              <p className="text-sm text-gray-600">{longDescription}</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {details.tech.map((tech, idx) => (
                  <span 
                    key={idx}
                    className={`px-3 py-1 ${colors.tag} rounded-full text-xs font-medium`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <a 
              href={demoLink}
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-block w-full text-center ${colors.badge} hover:opacity-90 font-medium py-2 px-4 rounded-lg transition-opacity mt-4`}
            >
              View Demo
            </a>
          </div>
          
          <div className="absolute bottom-4 right-4 text-gray-400 text-xs">
            Click to flip back
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState, useEffect } from "react";

const trackColors = {
  software: {
    gradient: "from-green-50 to-emerald-50",
    border: "border-[rgb(19,163,122)]",
    badge: "bg-[rgb(19,163,122)] text-white",
    tag: "bg-green-100 text-green-700"
  },
  hardware: {
    gradient: "from-purple-50 to-blue-50",
    border: "border-[rgb(136,0,185)]",
    badge: "bg-[rgb(136,0,185)] text-white",
    tag: "bg-purple-100 text-purple-700"
  },
  wildcard: {
    gradient: "from-purple-50 to-pink-50",
    border: "border-[rgb(255,0,102)]",
    badge: "bg-[rgb(255,0,102)] text-white",
    tag: "bg-pink-100 text-pink-700"
  },
  creatives: {
    gradient: "from-yellow-50 to-orange-50",
    border: "border-[rgb(239,183,27)]",
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
  gallery = [],
  index = 0,
  onNavigateNext,
  onNavigatePrev,
  hasNext = false,
  hasPrev = false,
  gridColumn = 1
}: {
  projectName?: string;
  creatorName?: string;
  description?: string;
  demoLink?: string;
  coverImage?: string;
  track?: keyof typeof trackColors;
  longDescription?: string;
  details?: { tech: string[] };
  gallery?: string[];
  index?: number;
  onNavigateNext?: () => void;
  onNavigatePrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
  gridColumn?: number;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoverRotation, setHoverRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(0);
  
  const colors = trackColors[track as keyof typeof trackColors] || trackColors.software;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  const handleMouseEnter = () => {
    if (!isExpanded) {
      setIsHovered(true);
      const randomX = (Math.random() - 0.5) * 3;
      const randomY = (Math.random() - 0.5) * 3;
      setHoverRotation({ x: randomX, y: randomY });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoverRotation({ x: 0, y: 0 });
  };

  const handleCardClick = () => {
    if (isExpanded) {
      // If already expanded, collapse it
      setIsExpanded(false);
      setTimeout(() => setIsFlipped(false), 400);
    } else if (!isFlipped) {
      // If not flipped, flip and expand
      setIsFlipped(true);
      setTimeout(() => {
        setIsExpanded(true);
      }, 400);
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(false);
    setTimeout(() => setIsFlipped(false), 400);
  };

  const handleNavigateNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onNavigateNext) {
      onNavigateNext();
      setSelectedGalleryImage(0);
    }
  };

  const handleNavigatePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onNavigatePrev) {
      onNavigatePrev();
      setSelectedGalleryImage(0);
    }
  };

  // Determine expansion direction based on grid column
  // Columns 1-2 expand to the right, Column 3 expands to the left
  const expandToLeft = gridColumn === 3;

  return (
    <>
      <div 
        className={`perspective-1000 transition-all ease-in-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        } ${
          isExpanded 
            ? 'col-span-2 w-[60vw] h-[90vh] duration-500' 
            : 'w-90 h-100 duration-700'
        }`}
        style={{
          transformOrigin: expandToLeft ? 'top right' : 'top left'
        }}
        data-cursor="pointer"
      >
        <div 
          className={`relative w-full h-full transition-all ease-in-out ${
            isExpanded ? 'duration-500' : 'duration-700'
          } transform-style-3d cursor-pointer`}
          onClick={handleCardClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ 
            transformStyle: 'preserve-3d',
            transform: isExpanded 
              ? 'rotateY(180deg)'
              : `
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
            className={`absolute w-full h-full backface-hidden bg-white rounded-xl shadow-lg overflow-hidden border-3 ${colors.border}`}
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
              
              <div className={`absolute top-3 right-3 ${colors.badge} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide`}>
                {track}
              </div>
            </div>
            
            <div className="p-6 ibm-plex-sans">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{projectName}</h3>
              <p className="text-sm text-gray-700 mb-2">by {creatorName}</p>
              <p className="text-gray-700 text-sm line-clamp-3 mb-4">{description}</p>
              
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
            
            <div className="absolute bottom-4 right-4 text-gray-400 ibm-plex-sans text-sm">
              Click to see more
            </div>
          </div>

          {/* Back of card - Expanded view */}
          <div
            data-cursor="pointer"
            className={`absolute w-full h-full bg-gradient-to-br ${colors.gradient} rounded-xl shadow-2xl overflow-hidden border-3 ${colors.border}`}
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            {/* Close button */}
            {isExpanded && (
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors z-20 shadow-lg"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}

            {/* Navigation arrows */}
            {isExpanded && hasPrev && (
              <button
                onClick={handleNavigatePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors z-20 shadow-lg"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {isExpanded && hasNext && (
              <button
                onClick={handleNavigateNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors z-20 shadow-lg"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            <div className={`${isExpanded ? 'p-8 h-full flex flex-col' : 'p-6'}`}>
              <div className="flex items-center justify-between mb-1">
                <h3 className={`font-bold text-gray-800 ${isExpanded ? 'text-3xl' : 'text-xl'}`}>
                  {projectName}
                </h3>
                <span className={`${colors.badge} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide`}>
                  {track}
                </span>
              </div>

              {isExpanded && (
                <p className="text-lg ibm-plex-sans text-gray-700 mb-5">by {creatorName}</p>
              )}
              
              <div className={`space-y-6 ${isExpanded ? 'flex-1 overflow-y-auto pr-2' : 'overflow-y-auto h-64'}`}>
                <div>
                  <h4 className="font-bold text-xl text-gray-800 mb-2">Description</h4>
                  <p className="text-md text-gray-700 ibm-plex-sans">{longDescription}</p>
                </div>
                
                <div>
                  <h4 className="font-bold text-xl text-gray-800 mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {details.tech.map((tech, idx) => (
                      <span 
                        key={idx}
                        className={`px-3 py-1 ${colors.tag} rounded-full text-md ibm-plex-sans`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Gallery section - only if images exist */}
                {isExpanded && gallery && gallery.length > 0 && (
                  <div>
                    <h4 className="font-bold text-xl text-gray-800 mb-3">Gallery</h4>
                    <div className="space-y-4">
                      {/* Main selected image */}
                      <div className="w-full h-80 rounded-lg overflow-hidden">
                        {coverImage.endsWith('.mp4') ? (
                          <video 
                            src={gallery[selectedGalleryImage]} 
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <img 
                            src={gallery[selectedGalleryImage]} 
                            alt={`Gallery ${selectedGalleryImage + 1}`}
                            className="w-full h-full object-contain"
                          />
                        )}
                      </div>
                      {/* Thumbnail strip */}
                      <div className="flex gap-3 overflow-x-auto pb-2">
                        {gallery.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedGalleryImage(idx);
                            }}
                            className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-3 transition-all ${
                              selectedGalleryImage === idx 
                                ? colors.border
                                : 'border-transparent hover:border-gray-300'
                            }`}
                          >
                            {coverImage.endsWith('.mp4') ? (
                              <video 
                                src={img} 
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <img 
                                src={img} 
                                alt={`Thumbnail ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                <a 
                  href={demoLink}
                  onClick={(e) => e.stopPropagation()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-block w-full text-center ${colors.badge} hover:opacity-90 font-bold text-xl py-3 px-4 rounded-lg transition-opacity`}
                >
                  View Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
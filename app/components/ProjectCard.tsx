import { useState, useEffect } from "react";

const trackColors = {
  software: {
    primary: "rgb(19,163,122)",
    light: "rgb(19,163,122,0.1)",
    accent: "rgb(16,185,129)",
  },
  hardware: {
    primary: "rgb(136,0,185)",
    light: "rgb(136,0,185,0.1)",
    accent: "rgb(168,85,247)",
  },
  wildcard: {
    primary: "rgb(255,0,102)",
    light: "rgb(255,0,102,0.1)",
    accent: "rgb(244,63,94)",
  },
  creatives: {
    primary: "rgb(239,183,27)",
    light: "rgb(239,183,27,0.1)",
    accent: "rgb(251,191,36)",
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
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const colors = trackColors[track as keyof typeof trackColors];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  const handleCardClick = () => {
    if (isExpanded) {
      setIsExpanded(false);
      setTimeout(() => setIsFlipped(false), 300);
    } else if (!isFlipped) {
      setIsFlipped(true);
      setTimeout(() => {
        setIsExpanded(true);
      }, 300);
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(false);
    setTimeout(() => setIsFlipped(false), 300);
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

  const expandToLeft = gridColumn === 3;

  return (
    <>
      <div 
        className={`perspective-1000 transition-all ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        } ${
          isExpanded 
            ? 'col-span-2 w-[60vw] h-[90vh] duration-500 z-50' 
            : 'w-100 h-125 duration-700'
        }`}
        style={{
          transformOrigin: expandToLeft ? 'top right' : 'top left'
        }}
      >
        <div 
          className={`relative w-full h-full transition-all ease-out ${
            isExpanded ? 'duration-500' : 'duration-700'
          } transform-style-3d cursor-pointer group`}
          onClick={handleCardClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ 
            transformStyle: 'preserve-3d',
            transform: isExpanded 
              ? 'rotateY(180deg)'
              : `
                rotateY(${isFlipped ? 180 : 0}deg)
                translateY(${isHovered && !isFlipped ? -8 : 0}px)
              `,
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {/* Front of card */}
          <div 
            className="absolute w-full h-full backface-hidden bg-white rounded-2xl overflow-hidden"
            style={{ 
              backfaceVisibility: 'hidden',
              boxShadow: isHovered && !isFlipped 
                ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' 
                : '0 10px 30px -15px rgba(0, 0, 0, 0.3)'
            }}
          >
            {/* Image Container with Overlay */}
            <div className="relative h-56 overflow-hidden bg-gray-100">
              {coverImage.endsWith('.mp4') ? (
                <video 
                  src={coverImage} 
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <img 
                  src={coverImage} 
                  alt={projectName}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onLoad={() => setImageLoaded(true)}
                />
              )}
              
              {/* Gradient Overlay */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(to bottom, transparent 0%, ${colors.primary}15 100%)`
                }}
              />

              {/* Track Badge */}
              <div 
                className="absolute top-4 left-4 px-3 py-1.5 rounded-lg text-md font-semibold uppercase tracking-wider backdrop-blur-md"
                style={{
                  backgroundColor: `${colors.primary}`,
                  color: 'white',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              >
                {track}
              </div>
            </div>
            
            {/* Content Section */}
            <div className="p-6 space-y-3">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1 line-clamp-1">
                  {projectName}
                </h3>
                <p className="text-md font-medium ibm-plex-sans text-gray-500">
                  by {creatorName}
                </p>
              </div>
              
              <p className="text-gray-600 text-md ibm-plex-sans leading-relaxed line-clamp-3">
                {description}
              </p>
              
              {/* Tech Stack Preview */}
              <div className="flex flex-wrap gap-2 pt-2">
                {details.tech.slice(0, 3).map((tech, idx) => (
                  <span 
                    key={idx}
                    className="px-2.5 py-1 rounded-md ibm-plex-sans text-xs font-medium transition-colors"
                    style={{
                      backgroundColor: colors.light,
                      color: colors.primary
                    }}
                  >
                    {tech}
                  </span>
                ))}
                {details.tech.length > 3 && (
                  <span 
                    className="px-2.5 py-1 rounded-md text-xs ibm-plex-sans font-medium"
                    style={{
                      backgroundColor: colors.light,
                      color: colors.primary
                    }}
                  >
                    +{details.tech.length - 3}
                  </span>
                )}
              </div>
            </div>

            {/* Footer with CTA */}
            <div className="absolute bottom-0 left-0 right-0 p-6 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <button 
                  className="text-sm font-semibold flex ibm-plex-sans items-center gap-1.5 transition-all"
                  style={{ color: colors.primary }}
                >
                  View Details
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                <a 
                  href={demoLink}
                  onClick={(e) => e.stopPropagation()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg text-md font-semibold text-white transition-all cursor-pointer hover:shadow-lg"
                  style={{ 
                    backgroundColor: colors.primary,
                  }}
                >
                  Live Demo
                </a>
              </div>
            </div>
          </div>

          {/* Back of card - Expanded view with professional layout */}
          <div
            className="absolute w-full h-full bg-white rounded-2xl overflow-hidden"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)'
            }}
          >
            {/* Header Bar */}
            <div 
              className="relative h-20 flex items-center justify-between px-8 border-b"
              style={{ 
                backgroundColor: colors.light,
                borderColor: `${colors.primary}20`
              }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: colors.primary }}
                >
                  {projectName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{projectName}</h3>
                  <p className="text-lg text-gray-700">by {creatorName}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Navigation */}
                {isExpanded && hasPrev && (
                  <button
                    onClick={handleNavigatePrev}
                    className="w-9 h-9 rounded-lg bg-white hover:bg-gray-50 flex items-center justify-center transition-colors shadow-sm border border-gray-200"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}

                {isExpanded && hasNext && (
                  <button
                    onClick={handleNavigateNext}
                    className="w-9 h-9 rounded-lg bg-white hover:bg-gray-50 flex items-center justify-center transition-colors shadow-sm border border-gray-200"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}

                {/* Close */}
                <button
                  onClick={handleClose}
                  className="w-9 h-9 rounded-lg bg-white hover:bg-gray-50 flex items-center justify-center transition-colors shadow-sm border border-gray-200"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="h-[calc(100%-4rem)] overflow-y-auto">
              <div className="p-8 space-y-8">
                {/* Description Section */}
                <section>
                  <h4 className="text-lg font-bold uppercase tracking-wider text-gray-700 mb-3">
                    Overview
                  </h4>
                  <p className="text-gray-700 ibm-plex-sans leading-relaxed">
                    {longDescription}
                  </p>
                </section>
                
                {/* Technologies */}
                <section>
                  <h4 className="text-lg font-bold uppercase tracking-wider text-gray-700 mb-3">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {details.tech.map((tech, idx) => (
                      <span 
                        key={idx}
                        className="px-4 py-2 rounded-lg ibm-plex-sans text-sm font-semibold transition-all hover:shadow-md"
                        style={{
                          backgroundColor: colors.light,
                          color: colors.primary,
                          border: `1.5px solid ${colors.primary}30`
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </section>

                {/* Gallery */}
                {isExpanded && gallery && gallery.length > 0 && (
                  <section>
                    <h4 className="text-lg font-bold uppercase tracking-wider text-gray-700 mb-4">
                      Gallery
                    </h4>
                    <div className="space-y-4">
                      {/* Main Image */}
                      <div className="w-full h-80 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                        {gallery[selectedGalleryImage]?.endsWith('.mp4') ? (
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
                      
                      {/* Thumbnails */}
                      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
                        {gallery.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedGalleryImage(idx);
                            }}
                            className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all hover:scale-105"
                            style={{
                              border: selectedGalleryImage === idx 
                                ? `3px solid ${colors.primary}` 
                                : '3px solid transparent',
                              opacity: selectedGalleryImage === idx ? 1 : 0.6
                            }}
                          >
                            {img.endsWith('.mp4') ? (
                              <video 
                                src={img} 
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
                  </section>
                )}
                
                {/* CTA Button */}
                <section className="pt-4">
                  <a 
                    href={demoLink}
                    onClick={(e) => e.stopPropagation()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center font-bold text-lg py-4 px-6 rounded-xl transition-all hover:shadow-xl text-white"
                    style={{
                      backgroundColor: colors.primary,
                    }}
                  >
                    Launch Live Demo →
                  </a>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
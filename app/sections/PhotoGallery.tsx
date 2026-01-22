import { useEffect, useState, useRef } from "react";

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

export default function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Replace these with your actual photo URLs
  const photos = [
    "images/cohort-4/img1.JPG",
    "images/cohort-4/img2.JPG",
    "images/cohort-4/img3.JPG",
    "images/cohort-4/img4.JPG",
    "images/cohort-4/img5.JPG",
    "images/cohort-4/img6.JPG",
    "images/cohort-4/img7.JPG",
    "images/cohort-4/img8.jpg",
    "images/cohort-4/img9.jpg",
    "images/cohort-4/img10.JPG",
    "images/cohort-4/img11.JPG",
  ];

  const photos2 = [
    "images/cohort-3/img1.jpg",
    "images/cohort-3/img2.jpg",
    "images/cohort-3/img3.jpg",
    "images/cohort-3/img4.jpg",
    "images/cohort-3/img5.jpg",
    "images/cohort-3/img6.jpg",
    "images/cohort-3/img7.jpg",
    "images/cohort-3/img8.jpg",
    "images/cohort-3/img9.jpg",
    "images/cohort-3/img10.jpg",
    "images/cohort-3/img11.jpg",
    "images/cohort-3/img12.jpg",
    "images/cohort-3/img13.jpg",
    "images/cohort-3/img14.jpeg",
    "images/cohort-3/img15.jpeg",
    "images/cohort-3/img17.jpg",
    "images/cohort-3/img18.jpg",
    "images/cohort-3/img19.jpg",
    "images/cohort-3/img20.jpg",
    "images/cohort-3/img21.jpg",
    "images/cohort-3/img22.jpg",
    "images/cohort-3/img23.jpg",
    "images/cohort-3/img24.jpg",
    "images/cohort-3/img25.jpg",
    "images/cohort-3/img26.jpg",
    "images/cohort-3/img27.jpg",
    "images/cohort-3/img28.jpg",
    "images/cohort-3/img29.jpg",
    "images/cohort-3/img30.jpg",
    "images/cohort-3/img31.jpg",
    "images/cohort-3/img32.jpg",
    "images/cohort-3/img33.jpg",
    "images/cohort-3/img34.jpg",
    "images/cohort-3/img35.jpg",
    "images/cohort-3/img36.jpg",
    "images/cohort-3/img37.jpg",
    "images/cohort-3/img38.jpg",
    "images/cohort-3/img39.jpg",
    "images/cohort-3/img40.jpg",
    "images/cohort-3/img41.jpg",
    "images/cohort-3/img42.jpg",
    "images/cohort-3/img43.jpg",
    "images/cohort-3/img44.jpg",
    "images/cohort-3/img45.jpg",
    "images/cohort-3/img46.jpg",
    "images/cohort-3/img47.jpg",
    "images/cohort-3/img48.jpg",
  ];

  return (
    <section className="py-24 px-10 relative">
      <ScrollReveal>
        <p className="text-3xl text-center text-gray-100 mb-10">
          Photos from cohort 4!
        </p>
      </ScrollReveal>

      {/* Masonry/Cascade Grid */}
      <div className="max-w-7xl mx-auto relative">
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {photos.map((photo, index) => (
            <ScrollReveal key={index} delay={index * 50}>
              <div
                className="break-inside-avoid mb-4 cursor-pointer group relative overflow-hidden rounded-xl"
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={photo}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-auto rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-end p-4">
                  <p className="text-white font-semibold">View Image</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="absolute bg-[rgb(57,123,255)]/85 inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          
          {/* Previous button */}
          {selectedImage > 0 && (
            <button
              className="absolute left-4 px-8 py-4 text-white text-4xl rounded-full bg-white/40 hover:bg-white/60 hover:text-gray-600 transition-colors"
              data-cursor="pointer"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(selectedImage - 1);
              }}
            >
              ‹
            </button>
          )}
          
          {/* Next button */}
          {selectedImage < photos.length - 1 && (
            <button
              className="absolute right-4 px-8 py-4 text-white text-4xl rounded-full bg-white/40 hover:bg-white/60 hover:text-gray-600 transition-colors"
              data-cursor="pointer"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(selectedImage + 1);
              }}
            >
              ›
            </button>
          )}

          <img
            src={photos[selectedImage]}
            alt={`Gallery ${selectedImage + 1}`}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          
          <div className="absolute bottom-4 text-white text-2xl">
            {selectedImage + 1} / {photos.length}
          </div>
        </div>
      )}
    </section>
  );
}
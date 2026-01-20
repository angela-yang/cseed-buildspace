import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";

interface DraggableProps {
  imageSrc: string;
  initialX: number;
  initialY: number;
  size?: string;
  showHint?: boolean;
}

export default function DraggableToy({ 
  imageSrc, 
  initialX, 
  initialY, 
  size = "80px", 
  showHint = false 
}: DraggableProps) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const velocityRef = useRef({ x: 0, y: 0 });
  const lastPosRef = useRef({ x: 0, y: 0 });
  const [showDragHint, setShowDragHint] = useState(false);

  const { floatY, floatScale, duration, delay } = useMemo(() => {
    return {
      floatY: -5 - Math.random() * 10, 
      floatScale: 1 + Math.random() * 0.05,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!showHint) return;
      setShowDragHint(true);
    }, 1500); 

    return () => clearTimeout(timer);
  }, [showHint]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDragHint(false);
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - lastPosRef.current.x;
      const deltaY = e.clientY - lastPosRef.current.y;

      velocityRef.current = { x: deltaX * 0.3, y: deltaY * 0.3 }; // Reduced velocity

      setPosition(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));

      lastPosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      setIsDragging(false);

      // Apply gentle momentum
      let animationId: number;
      const applyMomentum = () => {
        velocityRef.current.x *= 0.96;
        velocityRef.current.y *= 0.96;

        setPosition(prev => ({
          x: prev.x + velocityRef.current.x,
          y: prev.y + velocityRef.current.y
        }));

        if (Math.abs(velocityRef.current.x) > 0.3 || Math.abs(velocityRef.current.y) > 0.3) {
          animationId = requestAnimationFrame(applyMomentum);
        }
      };

      animationId = requestAnimationFrame(applyMomentum);
      
      return () => cancelAnimationFrame(animationId);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setShowDragHint(false);
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    velocityRef.current = { x: 0, y: 0 }; // Reset velocity
  };

  function DragHint() {
    return (
      <>
        {/* Drag me label */}
        <motion.div
          className="absolute -top-3 -right-8 z-50 bg-white text-[rgb(57,123,255)]
                    text-sm font-semibold px-3 py-1 shadow-md rounded-full border-1 border-[rgba(57,123,255,0.60)]
                    pointer-events-none"
          transition={{
            duration: 0.6,
            ease: "easeIn",
            type: "spring",
            stiffness: 120,
          }}
        >
          drag me!
        </motion.div>
      </>
    );
  }

  return (
    <motion.div
      data-cursor="pointer"
      className="absolute cursor-grab active:cursor-grabbing select-none pointer-events-auto"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: size,
        height: size,
        transition: isDragging ? 'none' : 'transform 0.1s ease-out'
      }}
      animate={{
        y: [0, floatY, 0], // moves up floatY px and back
        scale: [1, floatScale, 1], // slightly grows and shrinks
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay,
      }}
      onMouseDown={handleMouseDown}
    >
      {showDragHint && <DragHint />}
      <img
        src={imageSrc}
        alt="draggable"
        data-cursor="pointer" 
        className="w-full h-full object-contain cursor-pointer"
        style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}
        draggable={false}
      />
    </motion.div>
  );
}
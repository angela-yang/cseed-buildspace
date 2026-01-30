"use client";

import { useState, useRef, useEffect } from "react";

type HoverWordKey = "passion" | "community" | "accountability";

export default function ValuesSection() {
  const [hovered, setHovered] = useState<HoverWordKey | null>(null);
  const [wordPos, setWordPos] = useState<{ left: number; top: number } | null>(
    null
  );

  const wordRefs = useRef<Record<HoverWordKey, HTMLSpanElement | null>>({
    passion: null,
    community: null,
    accountability: null,
  });

  const images: Record<HoverWordKey, string[]> = {
    passion: ["/images/hover-pics/p1.png", "/images/hover-pics/p2.jpg", "/images/hover-pics/p3.jpg"],
    community: ["/images/hover-pics/c3.jpg", "/images/hover-pics/c4.jpg", "/images/hover-pics/c5.jpg"],
    accountability: ["/images/hover-pics/a1.png", "/images/hover-pics/a2.jpg", "/images/hover-pics/a3.jpg"],
  };

  const highlightColors: Record<HoverWordKey, string> = {
    passion: "#D86DFF",
    community: "#FDBAD3",
    accountability: "#85D8BA",
  };

  // Update word position when hovered
  useEffect(() => {
    if (hovered) {
      const el = wordRefs.current[hovered];
      if (el) {
        const rect = el.getBoundingClientRect();
        setWordPos({ left: rect.left + rect.width / 2, top: rect.top });
      }
    } else {
      setWordPos(null);
    }
  }, [hovered]);

  return (
    <section className="relative flex flex-col items-center justify-center pb-30 px-6">
      <p className="max-w-5xl text-center text-4xl leading-tight text-gray-700 font-medium relative">
        We believe meaningful work is built through{" "}
        <HoverWord
          word="passion"
          hovered={hovered}
          setHovered={setHovered}
          ref={(el) => {
            if (el) wordRefs.current["passion"] = el;
          }}
          highlightColor={highlightColors.passion}
        />
        ,{" "}
        <HoverWord
          word="community"
          hovered={hovered}
          setHovered={setHovered}
          ref={(el) => {
            if (el) wordRefs.current["community"] = el;
          }}
          highlightColor={highlightColors.community}
        />
        , and{" "}
        <HoverWord
          word="accountability"
          hovered={hovered}
          setHovered={setHovered}
          ref={(el) => {
            if (el) wordRefs.current["accountability"] = el;
          }}
          highlightColor={highlightColors.accountability}
        />
        - values that shape how we collaborate, create, and show up for one
        another.
      </p>

      {/* IMAGES ABOVE HOVERED WORD */}
      {hovered && wordPos && (
      <div
        className="pointer-events-none fixed flex justify-center z-50"
        style={{
          left: wordPos.left,
          top: wordPos.top - 220, // fixed distance above the word
          transform: "translateX(-50%)",
        }}
      >
        {images[hovered].map((src, i) => {
          const angle = -45 + i * 45;
          return (
            <div
              key={src}
              className="w-28 h-28 rounded-full overflow-hidden shadow-lg opacity-0 animate-bounceUp"
              style={{
                animationDelay: `${i * 100}ms`,
                animationFillMode: "forwards",
                transform: `
                  translateX(${Math.sin((angle * Math.PI) / 180) * 50}px)
                  translateY(${-Math.cos((angle * Math.PI) / 180) * 30}px)
                `,
              }}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          );
        })}
      </div>
    )}

    </section>
  );
}

type HoverWordProps = {
  word: HoverWordKey;
  hovered: HoverWordKey | null;
  setHovered: (w: HoverWordKey | null) => void;
  highlightColor: string;
  ref?: (el: HTMLSpanElement | null) => void;
};

const HoverWord = ({ word, hovered, setHovered, highlightColor, ref }: HoverWordProps) => {
  const isActive = hovered === word;

  return (
    <span
      ref={ref}
      className="relative inline-block mx-1 cursor-pointer overflow-visible"
      onMouseEnter={() => setHovered(word)}
      onMouseLeave={() => setHovered(null)}
    >
      {/* HIGHLIGHT */}
      <span
        className="absolute left-0 bottom-0 h-[0.9em] transition-transform duration-500 ease-out origin-left"
        style={{
          width: "100%",
          backgroundColor: highlightColor,
          transform: isActive ? "scaleX(1)" : "scaleX(0)",
          zIndex: 0,
        }}
      />

      {/* TEXT */}
      <span className="relative z-10">{word}</span>

      {/* UNDERLINE */}
      <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-black" />
    </span>
  );
};

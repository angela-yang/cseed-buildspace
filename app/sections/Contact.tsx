"use client"
import { useState, useEffect, useRef } from "react";
import { FaDiscord, FaEnvelope, FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion, useInView } from "framer-motion";

const ScrollReveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: delay / 1000, ease: [0.25, 0.46, 0.45, 0.94] }}>
      {children}
    </motion.div>
  );
};

const TapeDivider = () => {
  const words = ["ENGINEERS", "DESIGNERS", "ARTISTS", "WRITERS", "LEADERS", "DREAMERS"];
  const repeated = [...Array(8)].flatMap(() => words);
  return (
    <div style={{
      position: "relative", width: "100vw", left: "50%", marginLeft: "-50vw",
      height: "30px", background: "rgb(245,214,141)", transform: "rotate(-0.2deg)",
      overflow: "hidden", zIndex: 10, boxShadow: "0 3px 14px rgba(0,0,0,0.13)",
    }}>
      <motion.div
        style={{ position: "absolute", top: 0, left: 0, display: "flex", alignItems: "center", height: "100%", whiteSpace: "nowrap" }}
        animate={{ x: ["0%", "-5%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}>
        {[...repeated, ...repeated].map((word, i) => (
          <span key={i} style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 700, fontSize: "13px", letterSpacing: "0.2em", color: "rgb(57,123,255)", padding: "0 14px" }}>
            {word}<span style={{ marginLeft: "14px", opacity: 0.4 }}>|</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const DeadlineBlock = ({ isPriority, targetDate }: { isPriority: boolean; targetDate: Date }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000)  / 60000),
        seconds: Math.floor((diff % 60000)    / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-10 w-full">
        {[{ label: "Priority Deadline", date: "03/19/2026" }, { label: "Final Deadline", date: "03/22/2026" }].map(({ label, date }) => (
          <div key={label} className="py-10 px-3 rounded-3xl text-center"
            style={{ background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.30)" }}>
            <div className="text-white/80 text-xl uppercase tracking-widest mb-1 ibm-plex-sans">{label}</div>
            <div className="text-white ibm-plex-sans text-xl sm:text-2xl font-semibold">{date}</div>
          </div>
        ))}
      </div>

      <p className="text-white/80 text-2xl ibm-plex-sans uppercase tracking-widest text-center mt-10">
        {isPriority ? "Time until priority deadline" : "Time until final deadline"}
      </p>

      <div className="grid grid-cols-4 gap-3 w-full">
        {(Object.entries(timeLeft) as [string, number][]).map(([unit, val]) => (
          <motion.div key={unit} className="flex flex-col items-center" whileHover={{ scale: 1.05 }}>
            <div className="w-full flex items-center justify-center rounded-3xl font-bold text-white font-mono"
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.2)",
                backdropFilter: "blur(8px)",
                fontSize: "clamp(1.15rem, 3.8vw, 1.75rem)",
                padding: "25px 0",
              }}>
              {String(val).padStart(2, "0")}
            </div>
            <span className="text-white/80 text-md mt-1.5 uppercase ibm-plex-sans tracking-widest">{unit}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const SocialIcon = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6, scale: 1.05 }} whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="flex flex-col items-center gap-2 cursor-pointer">
      <div className="flex items-center justify-center rounded-2xl text-2xl transition-all duration-300"
        style={{
          width: "clamp(25px,17vw,90px)", height: "clamp(25px,17vw,90px)",
          background: hovered ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.3)", color: "white", backdropFilter: "blur(8px)",
        }}>
        {icon}
      </div>
      <motion.span className="text-white/70 text-md tracking-wider uppercase ibm-plex-sans"
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4 }}
        transition={{ duration: 0.2 }}>
        {label}
      </motion.span>
    </motion.a>
  );
};

export default function Contact() {
  const priorityDeadline = new Date("2026-03-19T23:59:00");
  const finalDeadline    = new Date("2026-03-22T23:59:00");
  const now = new Date();
  const isPriority = now < priorityDeadline;
  const targetDate = isPriority ? priorityDeadline : finalDeadline;

  return (
    <section id="apply" className="section min-h-[100vh] py-24 relative overflow-hidden"
      style={{ background: "rgb(57,123,255)" }}>

      <div className="relative z-10 w-full max-w-[min(90vw,600px)] mx-auto px-0">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center gap-7">
            <motion.div
              className="inline-block px-5 py-1.5 rounded-full text-md ibm-plex-sans tracking-widest uppercase"
              style={{ background: "rgb(133,216,186)", border: "1.5px solid rgb(12,121,90)", color: "rgb(12,121,90)" }}
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
              Applications Open
            </motion.div>

            <div>
              <h2 className="text-6xl font-bold text-white leading-tight mb-2">Apply Now</h2>
              <p className="text-2xl text-white/75 ibm-plex-sans mb-5">Join our next cohort!</p>
            </div>

            <DeadlineBlock isPriority={isPriority} targetDate={targetDate} />

            <motion.a
              href="https://docs.google.com/forms/d/e/1FAIpQLSd6eSKEihTu4G8XdhwRt-JfFvOF1pb24-vQ1zpKdxaCZmS4VA/viewform"
              target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.06, y: -2 }} whileTap={{ scale: 0.97 }}
              className="bg-white/60 hover:bg-white/80 text-[rgb(57,123,255)] text-xl ibm-plex-sans font-bold px-12 py-4 mt-5 rounded-full inline-block"
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}
            >
              Apply Now!
            </motion.a>

            <div className="relative w-full flex justify-center items-end mt-5"
              style={{ minHeight: "clamp(250px,50vw,300px)" }}>
              <motion.img
                src="/images/graphic-5.png"
                alt="Buildspace Graphic"
                className="absolute left-[-40%] bottom-[-10%] pointer-events-none select-none hidden sm:block z-20"
                style={{ height: "45%", objectFit: "contain", filter: "drop-shadow(0 10px 24px rgba(0,0,0,0.18))" }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              <motion.img
                src="/images/apply.png"
                alt="Apply"
                className="relative z-10 rounded-2xl w-[88%] sm:w-[76%]"
                style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }}
                whileHover={{ scale: 1.03, rotate: 0.5 }}
                transition={{ type: "spring", stiffness: 200 }} 
              />

              <motion.img
                src="/images/graphic-6.png"
                alt="Buildspace Graphic"
                className="absolute right-[-35%] bottom-[-10%] pointer-events-none select-none hidden sm:block z-20"
                style={{ height: "72%", objectFit: "contain", filter: "drop-shadow(0 10px 24px rgba(0,0,0,0.18))" }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.9 }} 
              />
            </div>

          </div>
        </ScrollReveal>
      </div>

      <div className="mt-35 mb-25">
        <TapeDivider />
      </div>

      <div className="relative z-10 w-full max-w-[min(90vw,420px)] mx-auto px-0">
        <ScrollReveal delay={100}>
          <div className="text-center">
            <h2 className="text-6xl font-bold text-white mb-3">Get In Touch</h2>
            <p className="text-2xl text-white/80 mb-10 ibm-plex-sans">Follow us and stay in the loop.</p>
            <div className="flex justify-center items-start gap-4 sm:gap-10">
              <SocialIcon href="https://www.linkedin.com/company/cseeduw/posts/?feedView=all" icon={<FaLinkedin />} label="LinkedIn" />
              <SocialIcon href="https://www.instagram.com/cseeduw" icon={<FaInstagram />} label="Instagram" />
              <SocialIcon href="https://discord.com/invite/4qWcR9U7d3" icon={<FaDiscord />} label="Discord" />
              <SocialIcon href="mailto:cseed-buildspace@u.washington.edu" icon={<FaEnvelope />} label="Email" />
            </div>
          </div>
        </ScrollReveal>
      </div>

    </section>
  );
}
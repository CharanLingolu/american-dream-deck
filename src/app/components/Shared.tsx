"use client";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") gsap.registerPlugin(useGSAP);

export const VideoPlayer = ({ src, className }: { src: string; className: string }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <div className={`absolute inset-0 bg-[#0a0a0a] transition-opacity duration-700 ${loaded ? "opacity-0 pointer-events-none" : "opacity-100"}`} />
      <video autoPlay loop muted playsInline onLoadedData={() => setLoaded(true)}
        className={`${className} transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}>
        <source src={src} type="video/mp4" />
      </video>
    </>
  );
};

export const Noise = () => (
  <div className="absolute inset-0 noise-overlay mix-blend-screen opacity-[0.08] pointer-events-none z-0" />
);

export const GoldRadial = () => (
  <>
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_0%,rgba(212,175,55,0.12),transparent)] pointer-events-none z-0" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_100%,rgba(212,175,55,0.08),transparent)] pointer-events-none z-0" />
  </>
);

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.15, ease: "power2.out" });
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button") || target.closest("a") || target.closest("input") || target.closest(".interactive")) {
        gsap.to(cursor, { scale: 3, backgroundColor: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.5)", duration: 0.3 });
      } else {
        gsap.to(cursor, { scale: 1, backgroundColor: "rgba(255,255,255,1)", border: "none", duration: 0.3 });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      style={{ transform: "translate(-50%, -50%)" }}
    />
  );
};

export const MagneticButton = ({ children, onClick, className }: any) => {
  const ref = useRef<HTMLButtonElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.4;
    const y = (clientY - (top + height / 2)) * 0.4;
    
    gsap.to(ref.current, { x, y, duration: 1, ease: "power3.out" });
  };
  
  const handleMouseLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
  };

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </button>
  );
};

export const SplashIntro = ({ onComplete }: { onComplete: () => void }) => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".intro-bg", { scale: 1.1, opacity: 0, duration: 2.5, ease: "power2.out" })
      .from(".intro-text-1", { opacity: 0, filter: "blur(10px)", duration: 2, ease: "power2.out" }, "-=1.5")
      .from(".intro-text-2", { opacity: 0, filter: "blur(10px)", duration: 2, ease: "power2.out" }, "-=1.5")
      .from(".intro-sub", { opacity: 0, y: 10, duration: 1, ease: "power2.out" }, "-=1")
      .from(".intro-cta-wrap", { opacity: 0, scale: 0.8, duration: 1.5, ease: "back.out(1.2)" }, "-=0.5");

    const handleGlobalMouse = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      gsap.to(".intro-parallax", { x, y, duration: 2, ease: "power2.out" });
    };
    window.addEventListener("mousemove", handleGlobalMouse);
    return () => window.removeEventListener("mousemove", handleGlobalMouse);
  }, { scope: container });

  const handleExit = () => {
    const tl = gsap.timeline({ onComplete });
    tl.to(".intro-cta-wrap", { scale: 0, opacity: 0, duration: 0.5, ease: "power2.in" })
      .to(".intro-text-1", { opacity: 0, filter: "blur(20px)", duration: 0.8, ease: "power2.in" }, "-=0.3")
      .to(".intro-text-2", { opacity: 0, filter: "blur(20px)", duration: 0.8, ease: "power2.in" }, "-=0.6")
      .to(".intro-sub", { opacity: 0, duration: 0.5, ease: "power2.in" }, "-=0.6")
      .to(".intro-bg", { scale: 1.05, opacity: 0, duration: 1.2, ease: "power3.inOut" }, "-=0.2");
  };

  return (
    <div ref={container} className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black z-50 intro-overlay pointer-events-none opacity-0" />
      
      {/* Background Video */}
      <div className="absolute inset-0 intro-bg intro-parallax scale-[1.05]">
        <VideoPlayer src="/hero.mp4" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.2),rgba(0,0,0,0.95))]" />
      </div>

      <Noise />
      <GoldRadial />

      {/* Cinematic Text */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full pointer-events-none">
        <h1 className="intro-text-1 font-display text-[14vw] md:text-[12vw] xl:text-[9vw] font-light tracking-[0.2em] text-white leading-[0.85] text-center drop-shadow-2xl">
          AMERICAN
        </h1>
        <h1 className="intro-text-2 font-display text-[14vw] md:text-[12vw] xl:text-[9vw] font-light tracking-[0.2em] gold-text italic leading-[0.85] text-center drop-shadow-2xl mt-1">
          DREAM
        </h1>
        <p className="intro-sub mt-8 text-[9px] md:text-[11px] tracking-[0.5em] md:tracking-[0.8em] uppercase text-white/50 font-medium text-center">
          The Experience
        </p>
      </div>

      {/* Interactive Magnetic Button - absolutely positioned higher from bottom to avoid cutting off */}
      <div className="absolute bottom-[10vh] left-0 right-0 flex justify-center z-20 intro-cta-wrap">
        <MagneticButton
          onClick={handleExit}
          className="group relative flex items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-full border border-[#D4AF37]/30 bg-black/40 backdrop-blur-md hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/80 transition-colors duration-700 interactive cursor-pointer"
        >
          {/* Orbital Rings */}
          <div className="absolute inset-0 rounded-full border border-[#D4AF37]/20 scale-[1.15] animate-[spin_10s_linear_infinite]" />
          <div className="absolute inset-0 rounded-full border border-[#D4AF37]/10 scale-[1.3] animate-[spin_15s_linear_infinite_reverse]" />
          
          <div className="flex flex-col items-center">
            <span className="text-[8px] md:text-[9px] tracking-[0.4em] uppercase text-[#FCF6BA] font-medium text-center opacity-70 group-hover:opacity-100 transition-opacity">
              Tap To<br/>Enter
            </span>
            <div className="w-1 h-1 bg-[#D4AF37] rounded-full mt-3 opacity-50 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300" />
          </div>
        </MagneticButton>
      </div>
    </div>
  );
};

"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

const goldGradient =
  "text-transparent bg-clip-text bg-gradient-to-br from-[#BF953F] via-[#FCF6BA] to-[#B38728]";
const goldBorder = "border-[#BF953F]/30";

const VideoPlayer = ({
  src,
  className,
}: {
  src: string;
  className: string;
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <div
        className={`absolute inset-0 bg-[#0a0a0a] animate-pulse transition-opacity duration-700 ${
          loaded ? "opacity-0 pointer-events-none z-0" : "opacity-100 z-20"
        }`}
      ></div>
      <video
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setLoaded(true)}
        className={`${className} transition-opacity duration-1000 ${
          loaded ? "" : "opacity-0"
        }`}
      >
        <source src={src} type="video/mp4" />
      </video>
    </>
  );
};

const SplashIntro = ({ onComplete }: { onComplete: () => void }) => {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.from(".video-window", {
        scale: 0.85,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
        delay: 0.2,
      });
      gsap.fromTo(
        ".skip-btn",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 2, ease: "power2.out" }
      );
    },
    { scope: container }
  );

  const handleExit = () => {
    gsap.to(container.current, {
      opacity: 0,
      scale: 1.05,
      duration: 1.2,
      ease: "power2.inOut",
      onComplete: onComplete,
    });
  };

  return (
    <div
      ref={container}
      className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-[#D4AF37]/15 via-[#050505] to-[#020202] z-0"></div>

      <div
        className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-[0.12]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      ></div>
      <div className="absolute inset-0 z-0 pointer-events-none bg-[#D4AF37] mix-blend-overlay opacity-10"></div>

      <div className="video-window relative w-[90%] md:w-[75%] xl:w-[60%] aspect-[4/3] md:aspect-video rounded-sm overflow-hidden border border-[#D4AF37]/30 shadow-[0_0_100px_rgba(212,175,55,0.15)] z-10">
        <VideoPlayer
          src="/hero.mp4"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/30"></div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1
            className={`text-3xl md:text-5xl xl:text-7xl font-serif tracking-[0.2em] uppercase ${goldGradient} opacity-90 drop-shadow-2xl`}
          >
            The Pitch
          </h1>
        </div>
      </div>

      <button
        onClick={handleExit}
        className={`cursor-pointer skip-btn relative z-20 mt-8 xl:mt-12 px-8 md:px-12 py-4 md:py-5 border ${goldBorder} rounded-sm text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-[#FCF6BA] hover:bg-[#BF953F]/20 transition-all duration-700 backdrop-blur-md overflow-hidden group shadow-[0_0_30px_rgba(212,175,55,0.05)]`}
      >
        <span className="relative z-10 font-bold pointer-events-none">
          Enter Experience
        </span>
        <div className="absolute inset-0 w-0 bg-gradient-to-r from-[#BF953F]/20 to-transparent group-hover:w-full transition-all duration-700 ease-out pointer-events-none"></div>
      </button>
    </div>
  );
};

const VisionSlide = () => {
  const container = useRef(null);
  useGSAP(
    () => {
      gsap.from(".glass-panel", {
        scale: 0.95,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
      });
      gsap.from(".vision-text", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "expo.out",
        delay: 0.3,
      });
      gsap.fromTo(
        ".vision-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          transformOrigin: "left center",
          ease: "power3.inOut",
        }
      );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative h-full w-full flex flex-col justify-center px-6 md:px-12 xl:px-32 border-l border-[#D4AF37]/10 py-10 xl:py-0"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <VideoPlayer
          src="/hero.mp4"
          className="w-full h-full object-cover opacity-60 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 xl:via-[#050505]/50 to-transparent"></div>
      </div>

      <div className="glass-panel relative z-10 bg-[#050505]/40 backdrop-blur-md border border-[#D4AF37]/20 p-8 md:p-12 xl:p-14 max-w-lg md:max-w-2xl rounded-sm shadow-[0_0_50px_rgba(212,175,55,0.05)] mx-auto xl:mx-0">
        <div className="vision-line w-16 md:w-24 h-[1px] bg-[#D4AF37]/80 mb-6 xl:mb-8 shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
        <h2 className="vision-text text-[9px] md:text-xs uppercase tracking-[0.8em] text-[#D4AF37] mb-3 xl:mb-4 font-bold text-center xl:text-left">
          The Vision
        </h2>
        <h1 className="vision-text text-5xl md:text-7xl xl:text-[8rem] font-black uppercase tracking-tighter leading-[0.85] text-white drop-shadow-2xl text-center xl:text-left">
          Global <br />
          <span className={`italic font-light ${goldGradient}`}>Scale.</span>
        </h1>
        <p className="vision-text mt-6 xl:mt-8 text-sm md:text-lg font-light text-white/90 leading-relaxed border-l-2 border-[#D4AF37]/50 pl-4 xl:pl-6 text-center xl:text-left">
          American Dream is not a shopping center. It is a multi-billion dollar
          cultural epicenter where retail, entertainment, and global events
          converge under one magnificent roof.
        </p>
      </div>
    </section>
  );
};

const NumbersSlide = () => {
  const container = useRef(null);
  useGSAP(
    () => {
      gsap.from(".stat-card", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
      });
      const counters = gsap.utils.toArray(".number-counter");
      counters.forEach((counter: any) => {
        const target = parseFloat(counter.getAttribute("data-target"));
        gsap.fromTo(
          counter,
          { innerHTML: 0 },
          {
            innerHTML: target,
            duration: 2.5,
            snap: { innerHTML: 1 },
            ease: "power4.out",
            delay: 0.5,
          }
        );
      });
    },
    { scope: container }
  );

  const stats = [
    {
      target: 40,
      suffix: "M+",
      label: "Annual Visitors",
      video: "/crowd-loop.mp4",
    },
    {
      target: 3,
      suffix: "M+",
      label: "Square Feet",
      video: "/scale-loop.mp4",
    },
    {
      target: 5,
      prefix: "$",
      suffix: "B+",
      label: "Capital Investment",
      video: "/luxury-loop.mp4",
    },
  ];

  return (
    <section
      ref={container}
      className="relative min-h-full w-full flex items-center px-6 md:px-12 xl:px-24 py-10 xl:py-0"
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`stat-card group relative h-[25vh] md:h-[40vh] xl:h-[60vh] rounded-sm overflow-hidden border ${goldBorder} bg-[#050505] flex flex-col justify-end p-6 xl:p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)]`}
          >
            <VideoPlayer
              src={stat.video}
              className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity group-hover:scale-110 group-hover:opacity-70 transition-all duration-[2s] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent"></div>
            <div className="relative z-10">
              <span className="text-[#D4AF37]/20 text-4xl xl:text-6xl font-serif italic absolute -top-10 xl:-top-16 -left-2 xl:-left-4">
                0{i + 1}
              </span>
              <h3
                className={`text-4xl md:text-5xl xl:text-[5rem] font-light tracking-tighter mb-1 xl:mb-2 ${goldGradient} flex items-baseline drop-shadow-lg`}
              >
                {stat.prefix && (
                  <span className="text-2xl xl:text-4xl mr-1">
                    {stat.prefix}
                  </span>
                )}
                <span
                  className="number-counter font-black"
                  data-target={stat.target}
                >
                  0
                </span>
                <span className="italic ml-1">{stat.suffix}</span>
              </h3>
              <div className="w-6 xl:w-8 h-[1px] bg-[#D4AF37]/50 mb-2 xl:mb-4"></div>
              <p className="text-[8px] xl:text-[10px] uppercase tracking-[0.3em] text-white/80 font-bold">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const AudienceSlide = () => {
  const container = useRef(null);
  useGSAP(
    () => {
      gsap.from(".glass-panel", {
        scale: 0.95,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
      });
      gsap.from(".aud-img", {
        scale: 1.1,
        opacity: 0,
        duration: 2,
        ease: "power2.out",
      });
      gsap.from(".aud-text", {
        x: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        delay: 0.4,
        ease: "expo.out",
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative h-full w-full flex items-center justify-center xl:justify-end px-6 md:px-12 xl:px-32 py-10 xl:py-0"
    >
      <div
        className="absolute top-0 left-0 w-full xl:w-2/3 h-full pointer-events-none"
        style={{
          maskImage:
            "linear-gradient(to left, transparent, black 40%, black 100%)",
        }}
      >
        <VideoPlayer
          src="/audience-wealth.mp4"
          className="aud-img absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-40 xl:opacity-70"
        />
      </div>
      <div
        className={`glass-panel relative z-20 w-full max-w-lg xl:max-w-xl bg-[#050505]/60 xl:bg-[#050505]/40 backdrop-blur-md p-8 md:p-10 xl:p-14 border ${goldBorder} shadow-[0_0_40px_rgba(0,0,0,0.5)] rounded-sm flex flex-col items-center xl:items-start text-center xl:text-left`}
      >
        <h2 className="aud-text text-[9px] xl:text-[10px] font-bold tracking-[0.6em] uppercase text-[#D4AF37] mb-4 xl:mb-6">
          Demographics
        </h2>
        <h3 className="aud-text text-4xl md:text-5xl xl:text-[5rem] font-black uppercase tracking-tighter leading-[0.85] mb-6 xl:mb-8 text-white drop-shadow-xl">
          Unrivaled <br />{" "}
          <span className={`italic font-light ${goldGradient}`}>Power.</span>
        </h3>
        <p className="aud-text text-sm xl:text-base font-light text-white/80 mb-6 xl:mb-8 leading-relaxed">
          Access a highly concentrated demographic of high-net-worth
          individuals, global tourists, and international VIPs drawn by
          exclusive luxury and world-class entertainment.
        </p>
        <ul className="aud-text space-y-3 xl:space-y-4 border-t border-[#D4AF37]/20 pt-4 xl:pt-6 w-full flex flex-col items-center xl:items-start">
          <li className="flex items-center gap-3 xl:gap-4 text-xs xl:text-sm font-light text-white/70">
            <span className="w-1.5 h-1.5 xl:w-2 xl:h-2 rounded-full bg-[#D4AF37]"></span>{" "}
            $150K+ Average Household Income
          </li>
          <li className="flex items-center gap-3 xl:gap-4 text-xs xl:text-sm font-light text-white/70">
            <span className="w-1.5 h-1.5 xl:w-2 xl:h-2 rounded-full bg-[#D4AF37]"></span>{" "}
            25% International Tourists
          </li>
        </ul>
      </div>
    </section>
  );
};

const LuxurySlide = () => {
  const container = useRef(null);
  useGSAP(
    () => {
      gsap.from(".glass-panel", {
        scale: 0.95,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
      });
      gsap.fromTo(
        ".luxury-image",
        { scale: 1.05, opacity: 0 },
        { scale: 1, opacity: 0.9, duration: 2, ease: "power2.out" }
      );
      gsap.from(".luxury-text", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        delay: 0.3,
        ease: "expo.out",
      });
      gsap.fromTo(
        ".luxury-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          transformOrigin: "left center",
          ease: "power3.inOut",
        }
      );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative h-full w-full flex items-center justify-center xl:justify-start px-6 md:px-12 xl:px-32 py-10 xl:py-0"
    >
      <div
        className="absolute top-0 right-0 w-full xl:w-2/3 h-full pointer-events-none"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 40%, black 100%)",
        }}
      >
        <VideoPlayer
          src="/luxury-retail.mp4"
          className="luxury-image absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-40 xl:opacity-100"
        />
      </div>

      <div className="glass-panel relative z-20 bg-[#050505]/60 xl:bg-[#050505]/40 backdrop-blur-md border border-[#D4AF37]/20 p-8 md:p-10 xl:p-14 max-w-lg xl:max-w-2xl rounded-sm shadow-[0_0_50px_rgba(212,175,55,0.05)] flex flex-col items-center xl:items-start text-center xl:text-left">
        <div className="luxury-line w-16 xl:w-24 h-[1px] bg-[#D4AF37]/80 mb-6 xl:mb-8 shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
        <h2 className="luxury-text text-[9px] xl:text-xs font-bold tracking-[0.6em] uppercase text-[#D4AF37] mb-3 xl:mb-4">
          The Avenue
        </h2>
        <h3 className="luxury-text text-4xl md:text-5xl xl:text-[6rem] font-black uppercase tracking-tighter leading-[0.85] mb-6 xl:mb-8 text-white drop-shadow-2xl">
          Elevated <br />{" "}
          <span className={`italic font-light ${goldGradient}`}>Retail.</span>
        </h3>
        <p className="luxury-text text-sm xl:text-lg font-light text-white/90 leading-relaxed border-l-2 border-[#D4AF37]/50 pl-4 xl:pl-6">
          Position your flagship alongside the world’s most iconic houses. A
          dedicated luxury avenue designed to rival the high streets of Milan,
          flawlessly integrated with VIP valet and private styling suites.
        </p>
      </div>
    </section>
  );
};

const EntertainmentSlide = () => {
  const container = useRef(null);
  useGSAP(
    () => {
      gsap.from(".ent-text", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });
      gsap.from(".ent-img", {
        scale: 0.9,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "expo.out",
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative min-h-full w-full flex flex-col justify-center px-6 md:px-12 xl:px-32 py-10 xl:py-0"
    >
      <div className="mb-8 xl:mb-12 text-center xl:text-left">
        <h2 className="ent-text text-[9px] xl:text-[10px] font-bold tracking-[0.6em] uppercase text-[#D4AF37] mb-2 xl:mb-4">
          Attractions
        </h2>
        <h3 className="ent-text text-4xl md:text-5xl xl:text-[5rem] font-black uppercase tracking-tighter text-white leading-none drop-shadow-xl">
          Unrivaled{" "}
          <span className={`italic font-light ${goldGradient}`}>Energy.</span>
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-8 h-auto xl:h-[50vh]">
        <div
          className={`ent-img relative h-[30vh] md:h-[40vh] xl:h-full rounded-sm overflow-hidden border ${goldBorder} group shadow-2xl`}
        >
          <VideoPlayer
            src="/theme-park.mp4"
            className="absolute inset-0 w-full h-full object-cover opacity-100 transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent p-6 xl:p-8 flex flex-col justify-end text-center md:text-left pointer-events-none">
            <h4
              className={`text-xl xl:text-2xl font-serif italic ${goldGradient}`}
            >
              Nickelodeon Universe
            </h4>
            <p className="text-[9px] xl:text-xs uppercase tracking-widest text-white/50 mt-2">
              The Largest Indoor Theme Park
            </p>
          </div>
        </div>
        <div
          className={`ent-img relative h-[30vh] md:h-[40vh] xl:h-full rounded-sm overflow-hidden border ${goldBorder} group shadow-2xl`}
        >
          <VideoPlayer
            src="/water-park.mp4"
            className="absolute inset-0 w-full h-full object-cover opacity-100 transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent p-6 xl:p-8 flex flex-col justify-end text-center md:text-left pointer-events-none">
            <h4
              className={`text-xl xl:text-2xl font-serif italic ${goldGradient}`}
            >
              DreamWorks Water Park
            </h4>
            <p className="text-[9px] xl:text-xs uppercase tracking-widest text-white/50 mt-2">
              Year-Round Tropical Destination
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const DiningSlide = () => {
  const container = useRef(null);
  useGSAP(
    () => {
      gsap.from(".dining-img", {
        y: 50,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power3.out",
      });
      gsap.from(".dining-text", {
        y: -20,
        opacity: 0,
        duration: 1,
        delay: 0.5,
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative min-h-full w-full flex flex-col justify-center px-6 md:px-12 xl:px-32 py-10 xl:py-0"
    >
      <div className="flex justify-center xl:justify-between items-center xl:items-end mb-8 xl:mb-12 text-center xl:text-left">
        <div>
          <h2 className="dining-text text-[9px] xl:text-[10px] font-bold tracking-[0.6em] uppercase text-[#D4AF37] mb-2 xl:mb-4">
            Gastronomy
          </h2>
          <h3 className="dining-text text-4xl md:text-5xl xl:text-[5rem] font-black tracking-tighter uppercase text-white leading-none drop-shadow-xl">
            Curated{" "}
            <span className={`italic font-light ${goldGradient}`}>Tastes.</span>
          </h3>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto xl:h-[40vh]">
        {[
          { title: "Fine Dining", video: "/dining-fine.mp4" },
          { title: "The Food Hall", video: "/dining-hall.mp4" },
          { title: "Omakase", video: "/dining-omakase.mp4" },
        ].map((item, i) => (
          <div
            key={i}
            className={`dining-img relative h-[25vh] md:h-[35vh] xl:h-full rounded-sm overflow-hidden border ${goldBorder} group ${
              i === 1 ? "md:-translate-y-6 xl:-translate-y-8" : ""
            } shadow-[0_0_30px_rgba(0,0,0,0.5)]`}
          >
            <VideoPlayer
              src={item.video}
              className="absolute inset-0 w-full h-full object-cover opacity-100 transition-all duration-1000 group-hover:scale-110 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent p-6 flex flex-col justify-end text-center md:text-left pointer-events-none">
              <h4 className="text-white text-base xl:text-lg tracking-widest uppercase border-l-2 border-[#D4AF37] pl-3">
                {item.title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const EventsSlide = () => {
  const container = useRef(null);
  useGSAP(
    () => {
      gsap.from(".events-text", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });
      gsap.from(".events-image", {
        scale: 0.95,
        opacity: 0,
        duration: 1.5,
        delay: 0.3,
        ease: "expo.out",
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative min-h-full w-full flex items-center px-6 md:px-12 xl:px-32 border-l border-[#D4AF37]/10 py-10 xl:py-0"
    >
      <div className="w-full flex flex-col xl:flex-row items-center justify-center xl:justify-between gap-10 xl:gap-16">
        <div className="w-full xl:w-1/2 relative z-20 flex flex-col items-center xl:items-start text-center xl:text-left">
          <h2 className="events-text text-[9px] xl:text-[10px] font-bold tracking-[0.6em] uppercase text-[#D4AF37] mb-4 xl:mb-6">
            Global Platforms
          </h2>
          <h3 className="events-text text-4xl md:text-5xl xl:text-[6rem] font-black uppercase tracking-tighter leading-[0.85] mb-6 xl:mb-8 drop-shadow-2xl">
            <span className="text-white">A Stage</span> <br />
            <span className={`italic font-light ${goldGradient}`}>
              For The World.
            </span>
          </h3>
          <p className="events-text text-sm xl:text-base font-light text-white/60 mb-6 xl:mb-10 max-w-md">
            Host product drops, concerts, and brand activations that command
            international press. Your canvas is a programmable atrium built for
            billion-dollar narratives.
          </p>
        </div>

        <div className="events-image w-full xl:w-1/2 flex justify-center xl:justify-end mt-4 xl:mt-0">
          <div
            className={`relative w-full aspect-[4/5] max-w-[20rem] md:max-w-[24rem] xl:max-w-sm rounded-sm overflow-hidden border ${goldBorder} shadow-[0_0_50px_rgba(212,175,55,0.15)] group`}
          >
            <VideoPlayer
              src="/events-activation.mp4"
              className="absolute inset-0 w-full h-full object-cover opacity-100 transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute bottom-6 xl:bottom-8 left-6 xl:left-8 border-l-2 border-[#D4AF37] pl-4 text-left pointer-events-none">
              <p className="text-[8px] xl:text-[9px] uppercase tracking-[0.4em] text-[#D4AF37] mb-2 font-bold">
                Max Capacity
              </p>
              <p className="text-3xl xl:text-4xl font-light tracking-tighter text-white">
                15,000{" "}
                <span className="text-white/30 text-xs ml-1 italic">PAX</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const slides = [
    { id: "vision", name: "The Vision", component: <VisionSlide /> },
    { id: "scale", name: "The Scale", component: <NumbersSlide /> },
    { id: "audience", name: "Demographics", component: <AudienceSlide /> },
    { id: "avenue", name: "The Avenue", component: <LuxurySlide /> },
    {
      id: "attractions",
      name: "Attractions",
      component: <EntertainmentSlide />,
    },
    { id: "gastronomy", name: "Gastronomy", component: <DiningSlide /> },
    { id: "platforms", name: "Global Platforms", component: <EventsSlide /> },
  ];

  const handleNextSlide = useCallback(() => {
    setActiveSlideIndex((prev) => Math.min(prev + 1, slides.length - 1));
  }, [slides.length]);

  const handlePrevSlide = useCallback(() => {
    setActiveSlideIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showIntro) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        handleNextSlide();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrevSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showIntro, handleNextSlide, handlePrevSlide]);

  if (showIntro) {
    return <SplashIntro onComplete={() => setShowIntro(false)} />;
  }

  return (
    <main className="w-screen h-[100svh] overflow-hidden text-white flex flex-col xl:flex-row selection:bg-[#D4AF37]/40 selection:text-white font-sans relative bg-[#050505]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-[#D4AF37]/15 via-[#050505] to-[#020202] z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-[#050505] to-[#020202] z-0"></div>

      <div
        className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-[0.12]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      ></div>
      <div className="absolute inset-0 z-0 pointer-events-none bg-[#D4AF37] mix-blend-overlay opacity-10"></div>

      <nav className="w-full xl:w-[22rem] h-auto xl:h-full border-t xl:border-t-0 xl:border-r border-[#D4AF37]/20 bg-[#050505]/80 backdrop-blur-3xl flex flex-row xl:flex-col justify-between items-center xl:items-stretch py-4 px-4 xl:py-12 xl:px-10 relative z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] xl:shadow-[20px_0_50px_rgba(0,0,0,0.8)] order-last xl:order-first overflow-x-auto">
        <div>
          <div className="hidden xl:block mb-16">
            <h1 className="text-xl font-light tracking-[0.3em] uppercase text-white/90 border-l-2 border-[#D4AF37] pl-4">
              American
              <br />
              <span className={`font-bold italic ${goldGradient}`}>Dream.</span>
            </h1>
          </div>

          <ul className="flex flex-row xl:flex-col gap-6 xl:gap-8 items-center xl:items-start w-max xl:w-auto px-2 xl:px-0">
            {slides.map((slide, index) => (
              <li key={slide.id} className="flex-shrink-0">
                <button
                  onClick={() => setActiveSlideIndex(index)}
                  className={`cursor-pointer group text-[9px] xl:text-xs tracking-[0.2em] xl:tracking-[0.25em] uppercase font-bold text-left transition-all duration-500 flex items-center gap-3 xl:gap-6 w-full ${
                    activeSlideIndex === index
                      ? "text-[#FCF6BA]"
                      : "text-white/40 hover:text-[#D4AF37]"
                  }`}
                >
                  <span
                    className={`h-[1px] transition-all duration-500 bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)] ${
                      activeSlideIndex === index
                        ? "w-4 xl:w-8 opacity-100"
                        : "w-0 opacity-0 group-hover:w-2 xl:group-hover:w-4 group-hover:opacity-50"
                    }`}
                  ></span>
                  {slide.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden xl:block pt-8">
          <a
            href="mailto:leasing@americandream.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`cursor-pointer block text-center w-full py-5 border ${goldBorder} rounded-sm bg-[#D4AF37]/5 hover:bg-[#D4AF37]/20 transition-all duration-700 text-[9px] uppercase tracking-[0.3em] font-bold text-[#FCF6BA] backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.05)]`}
          >
            Initiate Contact
          </a>
        </div>
      </nav>

      <div className="flex-1 h-full relative z-10 overflow-y-auto overflow-x-hidden xl:overflow-hidden">
        {slides[activeSlideIndex].component}
      </div>

      {activeSlideIndex < slides.length - 1 && (
        <button
          onClick={handleNextSlide}
          className="cursor-pointer absolute bottom-20 xl:bottom-10 right-6 xl:right-12 z-50 flex items-center gap-4 group"
        >
          <span className="hidden xl:block text-[9px] uppercase tracking-[0.3em] font-bold text-white/50 group-hover:text-[#D4AF37] transition-colors duration-300">
            Next: {slides[activeSlideIndex + 1].name}
          </span>
          <div
            className={`w-10 h-10 rounded-full border ${goldBorder} bg-[#050505]/80 backdrop-blur-md flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-all duration-500 shadow-[0_0_15px_rgba(212,175,55,0.1)]`}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#FCF6BA] xl:group-hover:translate-x-1 transition-transform duration-300"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      )}
    </main>
  );
}

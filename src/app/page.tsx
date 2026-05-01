"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScaleModule, VisionModule } from "./components/Modules1";
import { DemographicsModule, RetailModule } from "./components/Modules2";
import { EntertainmentModule, DiningModule } from "./components/Modules3";
import { EventsModule, TakeoverModule } from "./components/Modules4";
import { CustomCursor } from "./components/Shared";

const MODULES = [
  { id: "vision", title: "The Vision", Component: VisionModule },
  { id: "scale", title: "The Scale", Component: ScaleModule },
  { id: "audience", title: "Fan Profile", Component: DemographicsModule },
  { id: "avenue", title: "The Avenue", Component: RetailModule },
  { id: "experiences", title: "Experiences", Component: EntertainmentModule },
  { id: "gastronomy", title: "Gastronomy", Component: DiningModule },
  { id: "platform", title: "Global Platform", Component: EventsModule },
  { id: "activation", title: "Activation", Component: TakeoverModule },
];

export default function Home() {
  const [phase, setPhase] = useState("landing");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Scroll lock
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (phase === "landing") {
    return (
      <main className="w-screen h-screen overflow-hidden text-white font-sans relative bg-black cursor-none">
        <CustomCursor />
        <AnimatePresence>
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            {/* Cinematic Background Video */}
            <div className="absolute inset-0 scale-[1.05] animate-[pulse_10s_ease-in-out_infinite]">
              <video src="/hero.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>

            {/* Immersive Landing Content */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
              >

                <h1 className="font-display text-6xl md:text-8xl xl:text-9xl font-light tracking-tighter leading-[0.85]">
                  AMERICAN<br />
                  <span className="font-medium italic gold-text block mt-2">DREAM</span>
                </h1>
              </motion.div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                onClick={() => setPhase("deck")}
                className="group relative mt-24 flex flex-col items-center gap-4 interactive"
              >
                <span className="text-xs tracking-widest uppercase text-white/50 group-hover:text-white transition-colors duration-500">
                  Unlock The Experience
                </span>
                <div className="w-[1px] h-12 md:h-16 bg-gradient-to-b from-white/10 via-white/50 to-transparent relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-[#D4AF37] transform -translate-y-full group-hover:translate-y-full transition-transform duration-1000" />
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/10 transition-all duration-500">
                   <div className="w-1 h-1 bg-white rounded-full group-hover:bg-[#D4AF37] group-hover:scale-150 transition-all duration-500" />
                </div>
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    );
  }

  const CurrentComponent = MODULES[currentIndex].Component;

  return (
    <main className="w-screen h-screen overflow-hidden text-white font-sans relative bg-black cursor-none">
      <CustomCursor />

      <AnimatePresence mode="wait">
        <motion.div
          key="deck"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Top Global Branding */}
          <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 md:py-8 pointer-events-none">
            <div className="flex flex-col">
              <span className="font-display text-lg md:text-xl tracking-widest text-white leading-none">AMERICAN</span>
              <span className="font-display text-sm md:text-base italic text-[#D4AF37] leading-none">DREAM</span>
            </div>
          </div>

          {/* Main Deck Container */}
          <div className="absolute inset-0 flex flex-col">
            {/* Main Content Area */}
            <div className="absolute inset-0 overflow-y-auto overflow-x-hidden md:overflow-hidden bg-[#020202]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={MODULES[currentIndex].id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <CurrentComponent />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Immersive Bottom Timeline Navigation */}
            <div className="absolute bottom-0 left-0 right-0 h-32 z-50 flex flex-col justify-end pb-8 px-4 md:px-16 xl:px-24 pointer-events-none bg-gradient-to-t from-[#020202] via-[#020202]/80 to-transparent">
              <div className="flex gap-4 md:gap-4 items-end w-full pointer-events-auto overflow-x-auto overflow-y-visible no-scrollbar snap-x snap-mandatory pt-6 pb-2">
                {MODULES.map((mod, i) => {
                   const isActive = i === currentIndex;
                   const isPast = i < currentIndex;
                   return (
                     <div 
                       key={mod.id} 
                       className="flex-none w-[140px] md:flex-1 md:w-auto flex flex-col gap-3 group interactive cursor-pointer snap-start" 
                       onClick={() => setCurrentIndex(i)}
                     >
                       <p className={`text-[8px] md:text-[9px] tracking-[0.2em] uppercase transition-all duration-700 whitespace-nowrap ${isActive ? "text-[#D4AF37] transform -translate-y-2 font-semibold" : "text-white/30 group-hover:text-white/70 group-hover:-translate-y-1"}`}>
                         {String(i + 1).padStart(2, "0")} — {mod.title}
                       </p>
                       <div className="w-full h-[2px] md:h-[3px] bg-white/10 relative overflow-hidden rounded-full">
                         <div className={`absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#BF953F] to-[#FCF6BA] transition-all duration-1000 ease-[0.22,1,0.36,1]`} style={{ width: isActive ? "100%" : isPast ? "100%" : "0%" }} />
                       </div>
                     </div>
                   );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </main>
  );
}

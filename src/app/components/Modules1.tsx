import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { VideoPlayer } from "./Shared";
import { motion, AnimatePresence } from "framer-motion";

if (typeof window !== "undefined") gsap.registerPlugin(useGSAP);

export function VisionModule() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".v-text", { y: 40, opacity: 0, stagger: 0.15, duration: 1, ease: "power3.out" });
    gsap.from(".v-line", { scaleX: 0, transformOrigin: "left", duration: 1, delay: 0.5, ease: "power3.inOut" });
  }, { scope: container });

  return (
    <div ref={container} className="relative w-full h-full flex flex-col justify-center px-6 md:px-24 pt-24 pb-40 md:pt-24 md:pb-32">
      {/* Boxed in video on mobile/desktop to give space at top and bottom */}
      <div className="absolute inset-y-16 inset-x-2 md:inset-y-20 md:inset-x-8 lg:inset-y-24 lg:inset-x-12 rounded-2xl overflow-hidden pointer-events-none opacity-60">
        <VideoPlayer src="/hero.mp4" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-black/80 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-4xl px-4 md:px-0">
        <p className="v-text text-[9px] tracking-[0.4em] uppercase text-[#D4AF37] mb-4 drop-shadow-lg">The Vision</p>
        <h2 className="v-text font-display text-4xl md:text-7xl font-light leading-[1.1] md:leading-[0.9] text-white drop-shadow-2xl mt-2 md:mt-0">
          Not A Mall.<br />
          <span className="gold-text italic font-medium">A World.</span>
        </h2>
        
        <div className="v-line w-24 h-px bg-[#D4AF37] my-8 shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
        
        <p className="v-text text-sm md:text-base text-white/90 font-light leading-relaxed max-w-2xl drop-shadow-xl">
          American Dream is a multi-billion dollar cultural epicenter — where retail, entertainment, and global events converge under one magnificent roof in the heart of the New York Metro Area.
        </p>

        {/* Interactive Highlight */}
        <div className="v-text mt-12 flex flex-col sm:flex-row gap-6 md:gap-8">
           <div className="group cursor-pointer interactive">
             <h4 className="text-2xl md:text-3xl font-display text-white group-hover:text-[#D4AF37] transition-colors drop-shadow-xl">3 Million+</h4>
             <p className="text-[9px] tracking-widest text-white/80 uppercase mt-1 drop-shadow-md">Total Square Feet</p>
           </div>
           <div className="group cursor-pointer interactive">
             <h4 className="text-2xl md:text-3xl font-display text-white group-hover:text-[#D4AF37] transition-colors drop-shadow-xl">55% / 45%</h4>
             <p className="text-[9px] tracking-widest text-white/80 uppercase mt-1 drop-shadow-md">Entertainment / Retail</p>
           </div>
        </div>
      </div>
    </div>
  );
}

const STATS = [
  { id: "visitors", value: "40 Million", label: "Annual Visitors", desc: "Drawing a massive, highly engaged audience from across the globe." },
  { id: "gla", value: "3 Million+", label: "Leasable Square Feet", desc: "A sprawling, flexible canvas for the world's best retail brands." },
  { id: "brands", value: "450+", label: "Stores & Restaurants", desc: "Curated luxury, fast fashion, and global cuisine under one roof." },
  { id: "parks", value: "15+", label: "Major Attractions", desc: "Record-breaking indoor theme parks, water parks, and experiences." },
];

export function ScaleModule() {
  const [active, setActive] = useState(0);

  return (
    <div className="relative w-full h-full flex flex-col justify-center px-6 md:px-24 pt-24 pb-40 md:pt-24 md:pb-32">
      {/* Boxed in video on mobile/desktop to give space at top and bottom */}
      <div className="absolute inset-y-16 inset-x-2 md:inset-y-20 md:inset-x-8 lg:inset-y-24 lg:inset-x-12 rounded-2xl overflow-hidden pointer-events-none opacity-90 shadow-2xl">
         <VideoPlayer src="/scale-loop.mp4" className="w-full h-full object-cover" />
         <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/20 to-black/80 pointer-events-none" />
      </div>

      <div className="relative z-10 w-full flex flex-col md:flex-row gap-8 md:gap-12 items-center px-4 md:px-0">
        {/* Left Side: Massive Animated Stat */}
        <div className="flex-1 w-full md:h-[45vh] flex flex-col justify-center mt-12 md:mt-0">
          <p className="text-[9px] tracking-[0.4em] uppercase text-[#D4AF37] mb-4 md:mb-6 drop-shadow-md">The Scale</p>
          <div className="flex flex-col justify-center min-h-[160px] md:min-h-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="font-display text-5xl sm:text-6xl md:text-8xl font-light text-white mb-2 md:mb-6 drop-shadow-2xl">
                  {STATS[active].value}
                </h2>
                <p className="text-xl md:text-2xl text-[#D4AF37] font-medium tracking-wide mb-2 md:mb-4 drop-shadow-lg">{STATS[active].label}</p>
                <p className="text-sm md:text-base text-white font-medium max-w-md leading-relaxed drop-shadow-xl">
                  {STATS[active].desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Interactive List */}
        <div className="w-full md:w-1/3 flex flex-col gap-1 md:gap-2">
          {STATS.map((stat, i) => (
            <div
              key={stat.id}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              className={`py-3 md:py-5 px-4 md:px-6 border-l-4 cursor-pointer interactive transition-all duration-300 rounded-r-[4px]
                ${active === i ? "border-[#D4AF37] bg-gradient-to-r from-[#D4AF37]/20 to-transparent scale-[1.02]" : "border-white/20 bg-transparent hover:border-white/50"}`}
            >
              <h3 className={`text-xs md:text-sm tracking-widest uppercase font-bold transition-colors drop-shadow-lg ${active === i ? "text-[#D4AF37]" : "text-white/80"}`}>
                {stat.label}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

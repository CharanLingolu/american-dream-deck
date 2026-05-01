import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VideoPlayer } from "./Shared";

const PARKS = [
  { id: "nickelodeon", name: "Nickelodeon Universe", desc: "The Western Hemisphere's largest indoor theme park.", video: "/theme-park.mp4" },
  { id: "dreamworks", name: "DreamWorks Water Park", desc: "North America's largest indoor water park.", video: "water-park.mp4" },
  { id: "bigsnow", name: "Indoor Ski Resort", desc: "North America's first and only indoor real-snow ski resort.", video: "/sky-fall.mp4" },
];

export function EntertainmentModule() {
  const [expanded, setExpanded] = useState(PARKS[0].id);

  return (
    <div className="relative w-full h-full flex flex-col justify-center px-6 md:px-16 pt-24 pb-40 md:pt-24 md:pb-32">
      <div className="relative z-20 mb-4 text-center">
        <p className="text-[9px] tracking-[0.4em] uppercase text-[#D4AF37] mb-2 drop-shadow-md">Experiences</p>
        <h2 className="font-display text-4xl md:text-5xl font-light text-white drop-shadow-2xl">
          Beyond <span className="gold-text italic">Retail</span>
        </h2>
      </div>

      {/* Interactive Horizontal Accordion */}
      <div className="relative z-10 flex w-full h-[55vh] md:h-[60vh] gap-2 md:gap-3 shadow-2xl">
        {PARKS.map((park) => {
          const isExpanded = expanded === park.id;
          return (
            <motion.div
              key={park.id}
              layout
              onClick={() => setExpanded(park.id)}
              className={`relative overflow-hidden cursor-pointer interactive rounded-xl md:rounded-2xl border border-white/10 ${isExpanded ? "flex-[4]" : "flex-1 hover:flex-[1.2]"}`}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute inset-0 bg-black">
                {/* Background Video */}
                <VideoPlayer src={park.video} className={`w-full h-full object-cover transition-opacity duration-700 ${isExpanded ? "opacity-100" : "opacity-60 grayscale"}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 flex flex-col justify-end h-full">
                {isExpanded ? (
                  <div className="mt-auto p-2 md:p-4 rounded-[4px]">
                    <h3 className="font-display font-light transition-all duration-500 drop-shadow-2xl text-2xl md:text-4xl text-[#FCF6BA] leading-tight">
                      {park.name}
                    </h3>
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-white font-medium text-xs md:text-sm mt-2 md:mt-3 max-w-sm leading-relaxed drop-shadow-xl"
                    >
                      {park.desc}
                    </motion.p>
                  </div>
                ) : (
                  <div className="absolute bottom-4 md:bottom-6 left-0 right-0 flex justify-center h-[85%] md:h-[80%]">
                    <h3
                      className="font-display font-light text-base md:text-xl text-white drop-shadow-2xl py-4 whitespace-nowrap"
                      style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                    >
                      {park.name}
                    </h3>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

const DINING_CATS = [
  { name: "Fine Dining", video: "/dining-fine.mp4" },
  { name: "Casual Dining", video: "/dining-hall.mp4" },
  { name: "International Food", video: "/dining-omakase.mp4" },
];

export function DiningModule() {
  const [active, setActive] = useState(0);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-6 md:px-24 pt-24 pb-40 md:pt-24 md:pb-32">
      {/* Boxed in Background Video */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-y-16 inset-x-2 md:inset-y-20 md:inset-x-8 lg:inset-y-24 lg:inset-x-12 rounded-2xl overflow-hidden pointer-events-none shadow-2xl"
        >
          <VideoPlayer src={DINING_CATS[active].video} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center px-4 md:px-0">
        <div className="text-center mb-10">
          <p className="text-[9px] tracking-[0.4em] uppercase text-[#D4AF37] mb-2 drop-shadow-md">Food & Dining</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white drop-shadow-2xl">
            World-Class <span className="gold-text italic">Food</span>
          </h2>
        </div>

        {/* Interactive Circle/Grid */}
        <div className="flex gap-4 w-full justify-center border-b border-white/30 pb-10">
          {DINING_CATS.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => setActive(i)}
              className={`flex flex-col items-center gap-4 group interactive w-1/3`}
            >
              <div className={`w-14 h-14 md:w-20 md:h-20 rounded-full border-2 flex items-center justify-center transition-all duration-500 bg-black/20 backdrop-blur-sm ${active === i ? "border-[#D4AF37] bg-[#D4AF37]/20 scale-110 shadow-[0_0_20px_rgba(212,175,55,0.4)]" : "border-white/40 group-hover:border-white/80"}`}>
                <span className={`text-lg md:text-2xl font-display font-medium ${active === i ? "text-[#D4AF37]" : "text-white drop-shadow-lg"}`}>{i + 1}</span>
              </div>
              <span className={`text-[9px] md:text-[10px] font-bold tracking-widest uppercase transition-colors drop-shadow-lg text-center ${active === i ? "text-[#D4AF37]" : "text-white/90 group-hover:text-white"}`}>
                {cat.name}
              </span>
            </button>
          ))}
        </div>

        <div className="w-full mt-10 text-center h-[15vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="font-display text-2xl md:text-4xl text-[#FCF6BA] mb-3 drop-shadow-2xl">{DINING_CATS[active].name}</h3>
              <p className="text-white font-medium text-xs md:text-base max-w-2xl mx-auto leading-relaxed drop-shadow-xl px-4 md:px-0">
                Delivering an unparalleled culinary journey, blending Michelin-starred concepts with vibrant, culturally rich global street fare.
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VideoPlayer } from "./Shared";

const EVENTS = [
  { month: "OCT", title: "Global Fashion Week", desc: "Exclusive runway shows across the Avenue." },
  { month: "NOV", title: "DreamWorks Gala", desc: "Red carpet premiere events and celebrity meet-ups." },
  { month: "DEC", title: "Winter Wonderland", desc: "Transforming the Ski Resort into a global holiday destination." },
];

export function EventsModule() {
  const [active, setActive] = useState(0);

  return (
    <div className="relative w-full h-full flex flex-col justify-center px-6 md:px-24 pt-24 pb-40 md:pt-24 md:pb-32">
      {/* Boxed Video Container */}
      <div className="absolute inset-y-16 inset-x-2 md:inset-y-20 md:inset-x-8 lg:inset-y-24 lg:inset-x-12 rounded-2xl overflow-hidden pointer-events-none shadow-2xl">
         <VideoPlayer src="/events-activation.mp4" className="w-full h-full object-cover opacity-90" />
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col h-full justify-center px-4 md:px-0">
        <div className="mb-10 text-center mt-12 md:mt-0">
          <p className="text-[9px] tracking-[0.4em] uppercase text-[#D4AF37] mb-2 drop-shadow-md">Global Platform</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white drop-shadow-2xl">
            A Stage for <span className="gold-text italic">The World</span>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-6 w-full">
          {EVENTS.map((ev, i) => (
            <div
              key={i}
              onMouseEnter={() => setActive(i)}
              className={`flex-1 border-t-2 pt-6 transition-all duration-500 interactive cursor-pointer flex flex-col rounded-b-[4px]
                ${active === i ? "border-[#D4AF37] bg-gradient-to-b from-[#D4AF37]/20 to-transparent px-4" : "border-white/30 hover:border-white/70"}`}
            >
              <span className={`text-[10px] font-bold tracking-widest uppercase transition-colors drop-shadow-lg ${active === i ? "text-[#D4AF37]" : "text-white/80"}`}>
                {ev.month}
              </span>
              <h3 className={`font-display text-2xl md:text-3xl mt-3 mb-2 transition-colors drop-shadow-2xl ${active === i ? "text-[#FCF6BA]" : "text-white"}`}>
                {ev.title}
              </h3>
              <AnimatePresence>
                {active === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-white font-medium text-xs md:text-sm leading-relaxed mt-2 drop-shadow-xl pb-4 md:pb-0">
                      {ev.desc}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TakeoverModule() {
  const [investment, setInvestment] = useState(500000);
  
  // Simulated ROI calculations
  const reach = Math.floor(investment * 2.5).toLocaleString();
  const impressions = Math.floor(investment * 18.4).toLocaleString();
  const roi = ((investment * 3.2) / investment * 100).toFixed(0);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center pt-24 pb-40 md:pt-24 md:pb-32 overflow-hidden px-4 md:px-0">
      {/* Boxed Video Container */}
      <div className="absolute inset-y-16 inset-x-2 md:inset-y-20 md:inset-x-8 lg:inset-y-24 lg:inset-x-12 rounded-2xl overflow-hidden pointer-events-none shadow-2xl">
        <VideoPlayer src="/crowd-loop.mp4" className="w-full h-full object-cover opacity-90" />
      </div>

      <div className="relative z-10 w-full px-2 md:px-16 flex flex-col items-center max-h-full">
        <div className="w-full max-w-4xl bg-black/40 backdrop-blur-md border border-white/10 p-4 md:p-12 relative overflow-hidden rounded-[4px] shadow-2xl">
          <div className="text-center mb-4 md:mb-8 border-b border-white/20 pb-4 md:pb-8">
            <span className="inline-block px-3 md:px-4 py-1 md:py-1.5 rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/20 text-[8px] md:text-[9px] tracking-[0.3em] text-[#FCF6BA] uppercase font-bold mb-2 md:mb-3 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              Interactive Simulator
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-light text-white drop-shadow-2xl">
              Global <span className="gold-text italic">Takeover</span>
            </h2>
          </div>

          <div className="mb-6 md:mb-8">
            <div className="flex justify-between items-end mb-3 md:mb-4">
              <label className="text-[9px] md:text-[10px] tracking-widest text-[#D4AF37] uppercase font-bold drop-shadow-md">
                Investment Tier
              </label>
              <span className="text-2xl md:text-4xl font-display font-light text-white drop-shadow-2xl">
                ${(investment / 1000).toFixed(0)}k
              </span>
            </div>
            
            <input
              type="range"
              min="100000"
              max="2000000"
              step="50000"
              value={investment}
              onChange={(e) => setInvestment(Number(e.target.value))}
              className="w-full appearance-none bg-transparent interactive cursor-pointer [&::-webkit-slider-runnable-track]:h-[3px] [&::-webkit-slider-runnable-track]:bg-white/40 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-[#D4AF37] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:-mt-[8px] [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(212,175,55,1)]"
            />
            <div className="flex justify-between text-[7px] md:text-[8px] font-bold tracking-widest text-white/90 uppercase mt-3 drop-shadow-md">
              <span>Local Presence</span>
              <span>Total Domination</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 md:gap-4 pt-4 md:pt-6 border-t border-white/20">
            <motion.div key={reach} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <h3 className="font-display text-xl sm:text-2xl md:text-4xl text-white mb-1 md:mb-2 drop-shadow-2xl">{reach}</h3>
              <p className="text-[7px] md:text-[8px] font-bold tracking-widest text-white/90 uppercase drop-shadow-md">Est. Foot Traffic</p>
            </motion.div>
            
            <motion.div key={impressions} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-center">
              <h3 className="font-display text-xl sm:text-2xl md:text-4xl text-[#FCF6BA] mb-1 md:mb-2 drop-shadow-2xl">{impressions}</h3>
              <p className="text-[7px] md:text-[8px] font-bold tracking-widest text-[#D4AF37] uppercase drop-shadow-md">Digital Impressions</p>
            </motion.div>
            
            <motion.div key={roi} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center">
              <h3 className="font-display text-xl sm:text-2xl md:text-4xl text-white mb-1 md:mb-2 drop-shadow-2xl">{roi}%</h3>
              <p className="text-[7px] md:text-[8px] font-bold tracking-widest text-white/90 uppercase drop-shadow-md">Projected ROI</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VideoPlayer } from "./Shared";

const DEMO_DATA = [
  { id: "income", title: "Wealth & Income", value: "$135K+", subtitle: "Average Household Income", desc: "A highly affluent core demographic with massive discretionary spending power." },
  { id: "tourism", title: "Tourist Access", value: "40M", subtitle: "Tourist Proximity", desc: "Direct access to NYC tourists via dedicated transit and proximity to major airports." },
  { id: "dwell", title: "Time Spent", value: "4.5 Hrs", subtitle: "Average Time Spent", desc: "Unprecedented engagement time, 3x higher than traditional retail environments." }
];

export function DemographicsModule() {
  const [active, setActive] = useState(DEMO_DATA[0].id);

  return (
    <div className="relative w-full h-full flex flex-col justify-center px-6 md:px-24 pt-24 pb-40 md:pt-24 md:pb-32">
      {/* Boxed video background */}
      <div className="absolute inset-y-16 inset-x-2 md:inset-y-20 md:inset-x-8 lg:inset-y-24 lg:inset-x-12 rounded-2xl overflow-hidden pointer-events-none opacity-90 shadow-2xl">
        <VideoPlayer src="/audience-wealth.mp4" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-black/80 pointer-events-none" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-12 items-center w-full mt-4 md:mt-0 px-4 md:px-0">
        {/* Interactive Tabs */}
        <div className="flex flex-col gap-4 w-full md:w-1/3">
          <div className="mb-6 px-2">
            <p className="text-[9px] tracking-[0.4em] uppercase text-[#D4AF37] mb-2 drop-shadow-md">Fan Profile</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white drop-shadow-xl">
              The <span className="gold-text italic">Audience</span>
            </h2>
          </div>
          {DEMO_DATA.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`text-left px-4 md:px-6 py-3 md:py-4 border-l-4 transition-all duration-300 interactive rounded-r-[4px] transform hover:scale-[1.02] ${active === item.id ? "border-[#D4AF37] bg-gradient-to-r from-[#D4AF37]/20 to-transparent scale-[1.02]" : "border-white/20 bg-transparent hover:border-[#D4AF37]/50"
                }`}
            >
              <h4 className={`text-[10px] md:text-xs tracking-widest uppercase font-semibold drop-shadow-md ${active === item.id ? "text-[#D4AF37]" : "text-white/90"}`}>
                {item.title}
              </h4>
            </button>
          ))}
        </div>

        {/* Content Display */}
        <div className="flex-1 w-full min-h-[35vh] md:min-h-[40vh] flex items-center">
          <AnimatePresence mode="wait">
            {DEMO_DATA.map((item) => item.id === active && (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="max-w-xl"
              >
                <h3 className="font-display text-5xl sm:text-6xl md:text-7xl text-white mb-2 md:mb-4 drop-shadow-2xl">{item.value}</h3>
                <h4 className="text-xs md:text-sm tracking-widest text-[#D4AF37] uppercase font-bold mb-2 md:mb-4 drop-shadow-lg">{item.subtitle}</h4>
                <p className="text-white font-medium text-sm md:text-base leading-relaxed drop-shadow-xl">{item.desc}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

const BRANDS = [
  { name: "Hermès", category: "Ultra Luxury", img: "/luxury-retail.mp4" },
  { name: "Saint Laurent", category: "Luxury Fashion", img: "/fashion.mp4" },
  { name: "Tiffany & Co.", category: "Jewelry", img: "/jewellery.mp4" },
];

export function RetailModule() {
  const [hoveredBrand, setHoveredBrand] = useState(0);

  return (
    <div className="relative w-full h-full flex flex-col justify-center px-6 md:px-24 pt-24 pb-40 md:pt-24 md:pb-32 overflow-hidden">
      {/* Boxed Background Video */}
      <div className="absolute inset-y-16 inset-x-2 md:inset-y-20 md:inset-x-8 lg:inset-y-24 lg:inset-x-12 rounded-2xl overflow-hidden pointer-events-none shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={hoveredBrand}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <VideoPlayer src={BRANDS[hoveredBrand].img} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/20 to-black/80 pointer-events-none" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 w-full flex flex-col md:flex-row items-center gap-8 md:gap-12 mt-8 md:mt-0 px-4 md:px-0">
        {/* Left Intro Text */}
        <div className="flex-1 w-full">
          <p className="text-[9px] tracking-[0.4em] uppercase text-[#D4AF37] mb-2 drop-shadow-md">The Avenue</p>
          <h2 className="font-display text-4xl md:text-6xl font-light text-white mb-4 md:mb-6 drop-shadow-2xl leading-tight">
            Curated <br className="hidden md:block" /><span className="gold-text italic font-medium">Elegance</span>
          </h2>
          <p className="text-sm text-white font-medium max-w-sm leading-relaxed drop-shadow-xl">
            An unrivaled collection of the world’s most coveted luxury brands, housed in breathtaking flagship boutiques.
          </p>
        </div>

        {/* Interactive Accordion List for Brands */}
        <div className="flex-1 w-full flex flex-col">
          {BRANDS.map((brand, i) => (
            <div
              key={brand.name}
              onClick={() => setHoveredBrand(i)}
              onMouseEnter={() => setHoveredBrand(i)}
              className={`group border-b border-white/20 py-4 md:py-8 cursor-pointer interactive flex items-center justify-between transition-all duration-500
                ${hoveredBrand === i ? "bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent px-4" : ""}`}
            >
              <h3 className={`font-display text-2xl md:text-4xl transition-all duration-500 drop-shadow-2xl ${hoveredBrand === i ? "text-white translate-x-2 md:translate-x-4" : "text-white/80"}`}>
                {brand.name}
              </h3>
              <span className={`text-[8px] md:text-[9px] tracking-widest uppercase transition-colors duration-500 font-bold drop-shadow-md ${hoveredBrand === i ? "text-[#D4AF37]" : "text-transparent"}`}>
                {brand.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

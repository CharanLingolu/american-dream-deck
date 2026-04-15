"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Home() {
  const container = useRef(null);
  const cursorRef = useRef(null);

  const [copied, setCopied] = useState(false);

  const handleContactClick = () => {
    navigator.clipboard.writeText("leasing@americandream.com");

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    window.location.href =
      "mailto:leasing@americandream.com?subject=High-Priority%20Inquiry:%20American%20Dream%20Leasing";
  };

  useEffect(() => {
    const isDesktop = window.matchMedia("(pointer: fine)").matches;
    const cursor = cursorRef.current;

    if (isDesktop && cursor) {
      const moveCursor = (e: MouseEvent) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.2,
          ease: "power3.out",
        });
      };
      window.addEventListener("mousemove", moveCursor);

      const magneticElements = document.querySelectorAll(".magnetic");
      magneticElements.forEach((el: any) => {
        el.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(el, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.4,
            ease: "power2.out",
          });
          gsap.to(cursor, {
            scale: 3,
            backgroundColor: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.4)",
          });
        });

        el.addEventListener("mouseleave", () => {
          gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.3)",
          });
          gsap.to(cursor, {
            scale: 1,
            backgroundColor: "white",
            border: "none",
          });
        });
      });

      return () => window.removeEventListener("mousemove", moveCursor);
    }
  }, []);

  useGSAP(
    () => {
      gsap.to(".hero-video", {
        yPercent: 30,
        scale: 1.1,
        opacity: 0,
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".hero-text", {
        y: -100,
        opacity: 0,
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      const counters = gsap.utils.toArray(".number-counter");
      counters.forEach((counter: any) => {
        const target = parseFloat(counter.getAttribute("data-target"));
        gsap.fromTo(
          counter,
          { innerHTML: 0 },
          {
            innerHTML: target,
            duration: 3,
            snap: { innerHTML: 1 },
            ease: "power4.out",
            scrollTrigger: {
              trigger: ".stats-section",
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      gsap.from(".stat-reveal", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.fromTo(
        ".luxury-image",
        { scale: 1.2, filter: "brightness(0)" },
        {
          scale: 1,
          filter: "brightness(1)",
          scrollTrigger: {
            trigger: ".luxury-section",
            start: "top bottom",
            end: "center center",
            scrub: 1.5,
          },
        }
      );

      gsap.from(".luxury-text", {
        x: -50,
        opacity: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".luxury-section", start: "top 60%" },
      });

      // 4. EVENTS
      gsap.to(".floating-hologram", {
        y: -15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.fromTo(
        ".events-container",
        { yPercent: 10 },
        {
          yPercent: 0,
          scrollTrigger: {
            trigger: ".events-section",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );

      gsap.from(".events-text", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".events-section", start: "top 70%" },
      });
    },
    { scope: container }
  );

  return (
    <main
      ref={container}
      className="bg-[#020202] text-white selection:bg-white selection:text-black font-sans overflow-x-hidden relative"
    >
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      <div
        ref={cursorRef}
        className="hidden md:block fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference transform -translate-x-1/2 -translate-y-1/2"
      ></div>

      <section className="hero-section relative h-[100svh] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020202]/30 via-[#020202]/50 to-[#020202] z-10"></div>
        <div className="absolute inset-0 pointer-events-none w-full h-[120%] -top-[10%]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="hero-video w-full h-full object-cover opacity-60"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-text relative z-20 flex flex-col items-center justify-center text-center px-4 mt-24 md:mt-32 w-full">
          <h2 className="text-[10px] md:text-[11px] uppercase tracking-[0.6em] md:tracking-[0.8em] text-white/50 mb-6 md:mb-8 font-medium">
            American Dream
          </h2>
          <h1 className="text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem] font-black uppercase tracking-tighter leading-[0.85] text-white drop-shadow-2xl w-full">
            Global <br />{" "}
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30">
              Scale.
            </span>
          </h1>
        </div>
      </section>

      <section className="stats-section relative z-30 py-24 md:py-40 px-6 md:px-24 bg-[#020202]">
        <div className="max-w-7xl mx-auto pt-12 md:pt-24 border-t border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24">
            <div className="stat-reveal flex flex-col relative group">
              <span
                aria-hidden="true"
                className="absolute -top-8 md:-top-12 left-0 text-white/5 text-7xl md:text-9xl font-black italic select-none transition-transform group-hover:-translate-y-4 duration-500"
              >
                01
              </span>
              <h3 className="text-6xl md:text-[7rem] font-light tracking-tighter mb-2 md:mb-4 relative z-10">
                <span className="number-counter" data-target="40">
                  0
                </span>
                <span className="text-white/30 italic">M+</span>
              </h3>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/40 font-bold relative z-10">
                Annual Visitors
              </p>
            </div>

            <div className="stat-reveal flex flex-col relative group">
              <span className="absolute -top-8 md:-top-12 left-0 text-white/5 text-7xl md:text-9xl font-black italic select-none transition-transform group-hover:-translate-y-4 duration-500">
                02
              </span>
              <h3 className="text-6xl md:text-[7rem] font-light tracking-tighter mb-2 md:mb-4 relative z-10">
                <span className="number-counter" data-target="3">
                  0
                </span>
                <span className="text-white/30 italic">M+</span>
              </h3>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/40 font-bold relative z-10">
                Square Feet
              </p>
            </div>

            <div className="stat-reveal flex flex-col relative group">
              <span className="absolute -top-8 md:-top-12 left-0 text-white/5 text-7xl md:text-9xl font-black italic select-none transition-transform group-hover:-translate-y-4 duration-500">
                03
              </span>
              <h3 className="text-6xl md:text-[7rem] font-light tracking-tighter mb-2 md:mb-4 relative z-10 flex items-baseline">
                <span className="text-white/30 italic text-4xl md:text-6xl mr-1 md:mr-2">
                  $
                </span>
                <span className="number-counter" data-target="5">
                  0
                </span>
                <span className="text-white/30 italic">B+</span>
              </h3>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/40 font-bold relative z-10">
                Capital Investment
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="luxury-section relative w-full py-32 md:py-0 md:h-[130vh] bg-[#020202] flex items-center justify-start px-6 md:px-24">
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 40%, black 100%)",
            WebkitMaskImage:
              "linear-gradient(to left, black 20%, transparent 100%)",
          }}
        >
          <Image
            src="/luxury-retail.jpg"
            alt="Luxury Retail"
            fill
            sizes="(max-width: 1024px) 100vw, 75vw"
            priority
            className="luxury-image object-cover mix-blend-luminosity opacity-20 lg:opacity-40"
          />
        </div>

        <div className="luxury-text relative z-20 w-full max-w-2xl mt-0 md:mt-32">
          <div className="w-12 md:w-16 h-px bg-white/30 mb-6 md:mb-8"></div>
          <h2 className="text-[10px] md:text-[11px] font-bold tracking-[0.4em] md:tracking-[0.6em] uppercase text-white/40 mb-6 md:mb-10">
            The Collections
          </h2>
          <h3 className="text-5xl sm:text-6xl md:text-[7rem] font-black uppercase tracking-tighter leading-[0.85] mb-8 md:mb-12 text-white">
            Elevated <br />{" "}
            <span className="italic font-light text-white/40">Retail.</span>
          </h3>
          <p className="text-base md:text-lg font-light text-white/60 mb-10 md:mb-16 leading-relaxed max-w-lg">
            Position your flagship alongside the world’s most iconic houses. A
            dedicated luxury avenue designed to rival the high streets of Milan,
            flawlessly integrated.
          </p>
          <div
            className="inline-block magnetic cursor-pointer"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <div className="px-8 md:px-12 py-5 md:py-6 border border-white/20 rounded-full bg-white/5 backdrop-blur-md hover:bg-white hover:text-black transition-colors duration-500 text-center">
              <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold">
                Explore Leasing
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="events-section relative w-full py-24 md:py-40 px-6 md:px-24 bg-[#020202] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-3/4 h-3/4 bg-blue-900/10 blur-[100px] md:blur-[150px] rounded-full pointer-events-none"></div>

        <div className="events-container max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center relative z-10 gap-16 lg:gap-0">
          <div className="w-full lg:w-7/12 relative z-20 lg:-mr-20 pointer-events-none">
            <h2 className="events-text text-[10px] md:text-[11px] font-bold tracking-[0.4em] md:tracking-[0.6em] uppercase text-white/40 mb-6 md:mb-8 flex items-center gap-4 md:gap-6">
              <span className="w-8 md:w-12 h-px bg-white/30"></span> Global
              Platforms
            </h2>

            <h3 className="events-text text-5xl sm:text-6xl md:text-[7rem] font-black uppercase tracking-tighter leading-[0.85] mb-8 md:mb-10 drop-shadow-2xl">
              <span className="text-white">A Stage</span> <br />
              <span className="italic font-light text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.7)] md:[-webkit-text-stroke:1.5px_rgba(255,255,255,0.7)]">
                For The World.
              </span>
            </h3>

            <p className="events-text text-base md:text-lg font-light text-white/70 mb-10 md:mb-16 leading-relaxed max-w-md pointer-events-auto bg-[#020202]/60 md:bg-[#020202]/40 backdrop-blur-md md:backdrop-blur-sm p-4 rounded-lg">
              Host product drops, concerts, and brand activations that command
              international press. Your canvas is a programmable atrium built
              for billion-dollar narratives.
            </p>

            <div className="events-text flex flex-col gap-2 max-w-md pointer-events-auto">
              <a
                className="group relative flex justify-between items-center text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase text-white/60 hover:text-white transition-colors py-5 md:py-6 border-t border-white/10 overflow-hidden"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <span className="relative z-10">Sponsorship Tiers</span>
                <span className="relative z-10 group-hover:translate-x-2 transition-transform duration-500">
                  ↗
                </span>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out"></div>
              </a>
              <a
                className="group relative flex justify-between items-center text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase text-white/60 hover:text-white transition-colors py-5 md:py-6 border-t border-white/10 overflow-hidden"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <span className="relative z-10">Venue Specifications</span>
                <span className="relative z-10 group-hover:translate-x-2 transition-transform duration-500">
                  ↗
                </span>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out"></div>
              </a>
            </div>
          </div>

          <div className="w-full lg:w-5/12 relative mt-10 md:mt-0 z-10 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[300px] sm:max-w-sm md:max-w-md">
              <div className="group floating-hologram relative w-full aspect-square md:aspect-[4/5] rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)] border border-white/5">
                <Image
                  src="/events-activation.jpg"
                  alt="Global Activations"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-[2000ms] ease-out opacity-80 mix-blend-lighten"
                />
                <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(2,2,2,1)] md:shadow-[inset_0_0_80px_rgba(2,2,2,1)] pointer-events-none"></div>
              </div>

              <div className="absolute -bottom-6 left-4 right-4 sm:right-auto sm:-bottom-8 sm:-left-12 bg-[#020202]/80 backdrop-blur-xl border border-white/10 p-5 md:p-8 shadow-2xl z-30 group hover:border-white/30 transition-colors">
                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-white/40 mb-2 md:mb-3 font-semibold">
                  Max Capacity
                </p>
                <p className="text-4xl md:text-5xl font-light tracking-tighter">
                  15,000
                  <span className="text-white/30 text-sm md:text-base ml-2 italic">
                    PAX
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer
        id="contact"
        className="bg-[#020202] text-white py-32 md:py-40 text-center px-6 relative overflow-hidden border-t border-white/10 mt-12 md:mt-20"
      >
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="text-5xl sm:text-7xl md:text-[8rem] font-black uppercase tracking-tighter leading-[0.85] mb-12 md:mb-20 text-white">
            The Pitch <br />{" "}
            <span className="italic font-light text-white/30">Ends Here.</span>
          </h2>

          <div className="magnetic cursor-pointer" onClick={handleContactClick}>
            <div
              className={`px-10 md:px-16 py-6 md:py-8 border rounded-full transition-all duration-500 flex items-center justify-center min-w-[250px] ${
                copied
                  ? "bg-green-500 border-green-500 text-black"
                  : "border-white/20 bg-white text-black hover:bg-transparent hover:text-white hover:border-white"
              }`}
            >
              <span className="text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase font-bold text-center">
                {copied ? "Email Copied!" : "Initiate Contact"}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default function Home() {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-black/40 z-10"></div>{" "}
        {/* Dark overlay for text readability */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
          {/* <source src="/hero.webm" type="video/webm" /> Uncomment if you have a webm version */}
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Cinematic Typography */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-6">
        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter uppercase mb-6 drop-shadow-lg">
          American Dream
        </h1>
        <p className="text-lg md:text-2xl font-light tracking-widest uppercase opacity-90 max-w-3xl">
          More than a destination. A global commercial epicenter.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <span className="text-white text-sm tracking-widest uppercase opacity-70">
          Scroll to Explore
        </span>
      </div>
    </main>
  );
}

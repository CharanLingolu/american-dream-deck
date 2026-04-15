# American Dream: Interactive Commercial Pitch Deck

Live Deployment: https://american-dream-deck-rho.vercel.app/
Repository: https://github.com/CharanLingolu/american-dream-deck

An "Awwwards-level" interactive sales tool designed for the commercial leasing team of the American Dream mega-mall. This project moves beyond static PDFs, utilizing Next.js, highly optimized GSAP scroll physics, and AI-generated architectural prototyping to drive emotional buy-in from prospective luxury flagship tenants and global event sponsors.

## 🏗 The Architecture & Tech Stack

Built for maximum visual impact without sacrificing the 90+ Lighthouse performance score.

- **Core Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS (configured for fluid typography and glassmorphism)
- **Animation Engine:** GSAP (GreenSock) + `ScrollTrigger` and `@gsap/react`
- **Typography:** Geist / Inter (via `next/font/google` for zero cumulative layout shift)

## ⚡ Technical Highlights & UX Philosophy

This deck was engineered to mimic the premium feel of an Apple or Tesla product page.

### 1. Scroll-Linked Cinematic Physics

Instead of standard "fade-in on scroll" animations, DOM elements are explicitly tied to the user's scrollbar using GSAP's `scrub: true`.

- The Hero video scales and fades precisely as the user scrolls away.
- Statistical data dynamically counts up from zero (`innerHTML` tweening) only when perfectly centered in the viewport.
- The Event atrium container features continuous sine-wave yoyo floating, breaking the static grid.

### 2. High-End UI/CSS Techniques

- **Melted Image Masks:** Standard `<img>` boundaries are erased using advanced CSS `mask-image: linear-gradient` and `radial-gradient`, melting the photography seamlessly into the `#020202` background.
- **Blend Modes & Depth:** Implementation of `mix-blend-luminosity`, deep inset CSS shadows, and hollow `-webkit-text-stroke` typography to create Z-axis depth.
- **Global Film Grain:** A raw SVG noise filter is injected via CSS at 3% opacity over the entire DOM to remove the "sterile screen" feel and introduce a cinematic, editorial texture.

### 3. Responsive & Mobile-First Execution

- **Fluid Typography:** Typography scales smoothly using Tailwind's viewport-relative breakpoints (e.g., `text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem]`), preventing text wrapping on narrow mobile devices.
- **Touch-Device Detection:** The custom GSAP cursor and magnetic button mathematics are wrapped in a `window.matchMedia("(pointer: fine)").matches` check. This prevents touchscreen bugs and saves battery life on mobile devices.
- **Bounded Layouts:** Floating glassmorphism cards are strictly bounded to the viewport on mobile to prevent accidental horizontal overflow.

## 🤖 AI Asset Prototyping

To fulfill the "Phase 2 Expandability" requirement where real-world photography was unavailable, Generative AI (Midjourney/DALL-E) was used to rapid-prototype luxury concepts:

- **The Collections:** A hyper-realistic render of a high-end, glass-walled boutique.
- **Global Activations:** A holographic tech-launch simulation to demonstrate the scale of the atrium for potential corporate sponsors.

## 💻 Local Development Setup

To run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/CharanLingolu/american-dream-deck.git
   ```

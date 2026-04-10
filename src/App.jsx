import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Manifesto from './components/Manifesto';
import TheWall from './components/TheWall';
import Gallery from './components/Gallery';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Marquee from './components/Marquee';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

import Preloader from './components/Preloader';

gsap.registerPlugin(ScrollTrigger);

// Configure ScrollTrigger for better performance and consistency
ScrollTrigger.config({
  autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
});

if (typeof window !== "undefined") {
  ScrollTrigger.normalizeScroll(true);
}

function App() {
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    if (loading) return;

    // Scroll Progress
    gsap.to("#scroll-progress", {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      }
    });

    // Refresh after a short delay to ensure everything is mounted and measured
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [loading]);

  return (
    <div className="bg-carbon-black font-body text-white selection:bg-competition-green selection:text-carbon-black overflow-x-hidden min-h-screen">
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      <div id="scroll-progress" className="fixed top-0 left-0 h-1 bg-competition-green z-[100] transition-all duration-300 shadow-[0_0_15px_#C7F700]" />
      
      <div style={{ visibility: loading ? 'hidden' : 'visible' }}>
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <Features />
          <Manifesto />
          <TheWall />
          <Gallery />
          <Pricing />
          <Contact />
        </main>
        <Footer />
        <Chatbot />
      </div>
    </div>
  );
}

export default App;



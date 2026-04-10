import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ChevronRight } from 'lucide-react';

const Hero = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const videoRef = useRef(null);

  const handleCTAClick = () => {
    window.open('https://wa.me/524495136907?text=Hola!%20Quiero%20empezar%20el%20desafío%20en%20Powersthenics', '_blank');
  };

  useEffect(() => {
    // Force video play for mobile devices
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay failed:", error);
      });
    }

    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(textRef.current, 
        { scale: 1.1, opacity: 0, y: 50 }, 
        { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: "expo.out" }
      );
      
      // Floating animation for text
      gsap.to(textRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      // Parallax Video
      gsap.to(".hero-video-container", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }, containerRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="relative min-h-screen bg-carbon-black flex items-center overflow-hidden pt-20">
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6" ref={containerRef}>
        <div ref={textRef}>
          <div className="relative z-10 w-full lg:w-2/3 2xl:w-1/2">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl 2xl:text-[12rem] font-black leading-[0.8] tracking-tighter italic uppercase text-white mb-6">
              FORJA TU <br />
              <span className="text-competition-green text-stroke-sm">LEGADO</span>
            </h1>
            <p className="text-base sm:text-lg md:text-2xl 2xl:text-3xl font-bold text-white/60 mb-12 max-w-xl 2xl:max-w-2xl uppercase tracking-widest leading-relaxed">
              Domina la gravedad. Supera tus límites. 
              Calistenia de alto rendimiento para atletas de élite.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <button 
                onClick={() => document.getElementById('precios')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-competition-green text-carbon-black px-8 sm:px-12 py-4 sm:py-5 font-black italic tracking-tighter text-lg sm:text-xl group relative overflow-hidden transition-all hover:scale-105"
              >
                <span className="relative z-10 uppercase">EMPEZAR DESAFÍO</span>
                <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
              </button>
              
              <button 
                onClick={() => window.open('https://wa.me/524495136907?text=Hola!%20Quiero%20agendar%20una%20visita%20a%20Powersthenics', '_blank')}
                className="group bg-transparent text-competition-green border-2 border-competition-green px-8 sm:px-12 py-4 sm:py-5 font-black italic tracking-tighter text-lg sm:text-base hover:bg-competition-green hover:text-carbon-black transition-all flex items-center justify-center gap-4"
              >
                AGENDAR VISITA GRATIS
                <ChevronRight className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Absolute Background Video Container */}
      <div className="absolute top-0 right-0 w-full lg:w-3/4 h-full pointer-events-none overflow-hidden select-none">
        <div className="hero-video-container absolute inset-0 bg-carbon-black h-[120%]">
          <video 
            ref={videoRef}
            autoPlay 
            muted 
            loop 
            playsInline 
            webkit-playsinline="true"
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-60"
          >
            <source src="/E1176cbd-Be69-42D3-93Ee-4255226413D2.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-carbon-black via-carbon-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-carbon-black via-transparent to-carbon-black/40" />
        </div>
      </div>

      {/* Diagonal Bottom Cut */}
      <div className="absolute bottom-0 left-0 w-full h-12 sm:h-24 bg-carbon-black" style={{ clipPath: 'polygon(0 80%, 100% 0, 100% 100%, 0 100%)' }} />
    </section>
  );
};

export default Hero;

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ChevronRight } from 'lucide-react';

const Hero = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  const handleCTAClick = () => {
    window.open('https://wa.me/524495136907?text=Hola!%20Quiero%20empezar%20el%20desafío%20en%20Powersthenics', '_blank');
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(textRef.current, 
        { scale: 1.2, opacity: 0, y: 100 }, 
        { scale: 1, opacity: 1, y: 0, duration: 1, ease: "expo.out" }
      );
      
      gsap.fromTo(".hero-btn", 
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1,
          delay: 0.5,
          ease: "power3.out"
        }
      );
    }, containerRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="relative min-h-screen bg-carbon-black flex items-center overflow-hidden pt-20">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6" ref={containerRef}>
        <div ref={textRef}>
          <div className="relative z-10 w-full lg:w-1/2">
            <h1 className="text-6xl md:text-9xl font-black leading-[0.85] tracking-tighter italic uppercase text-white mb-2">
              FORJA TU <br />
              <span className="text-competition-green text-stroke-sm">LEGADO</span>
            </h1>
            <p className="text-lg md:text-2xl font-bold text-white/60 mb-10 max-w-xl uppercase tracking-widest leading-relaxed">
              Domina la gravedad. Supera tus límites. 
              Calistenia de alto rendimiento para atletas de élite.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <button 
                onClick={() => document.getElementById('precios')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-competition-green text-carbon-black px-12 py-5 font-black italic tracking-tighter text-xl group relative overflow-hidden transition-all hover:scale-105"
              >
                <span className="relative z-10 uppercase">EMPEZAR DESAFÍO</span>
                <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
              </button>
              
              <button 
              onClick={() => window.open('https://wa.me/524495136907?text=Hola!%20Quiero%20agendar%20una%20visita%20a%20Powersthenics', '_blank')}
              className="group bg-competition-green text-carbon-black px-8 md:px-12 py-4 md:py-6 font-black italic tracking-tighter hover:bg-white transition-all transform hover:-skew-x-12 flex items-center justify-center gap-4 text-sm md:text-base border-2 border-competition-green"
            >
              AGENDAR VISITA GRATIS
              <ChevronRight className="group-hover:translate-x-2 transition-transform" />
            </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Absolute Background Image */}
      <div className="absolute top-0 right-0 w-full lg:w-3/4 h-full pointer-events-none overflow-hidden select-none">
        <div className="absolute inset-0 bg-carbon-black">
          <img 
            src="/482192604_628347950060297_162005138276367219_n.jpg"
            className="w-full h-full object-cover opacity-60 grayscale scale-110"
            alt="Powersthenics Gym"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-carbon-black via-carbon-black/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-carbon-black via-transparent to-carbon-black/40" />
        </div>
      </div>

      {/* Diagonal Bottom Cut */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-carbon-black" style={{ clipPath: 'polygon(0 80%, 100% 0, 100% 100%, 0 100%)' }} />
    </section>
  );
};

export default Hero;

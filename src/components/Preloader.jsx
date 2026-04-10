import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);
  const logoRef = useRef(null);
  const progressRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    tl.set(preloaderRef.current, { visibility: 'visible' })
      .fromTo(logoRef.current, 
        { scale: 0.8, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 1, ease: "power4.out" }
      )
      .fromTo(textRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      )
      .to(progressRef.current, {
        width: "100%",
        duration: 2,
        ease: "power2.inOut"
      }, "-=1")
      .to(preloaderRef.current, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
        delay: 0.2
      })
      .to(logoRef.current, {
        opacity: 0,
        duration: 0.3
      }, "-=0.8");

  }, [onComplete]);

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] bg-carbon-black flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative flex flex-col items-center">
        <div ref={logoRef} className="mb-8 overflow-hidden">
          <img 
            src="/logo.png" 
            alt="Powersthenics Logo" 
            className="w-32 md:w-48 h-auto object-contain brightness-110"
          />
        </div>
        
        <div ref={textRef} className="text-center mb-8">
          <h2 className="text-white font-black italic tracking-[0.5em] text-sm uppercase">
            Powersthenics
          </h2>
          <p className="text-competition-green font-bold text-[10px] tracking-[0.2em] uppercase mt-2">
            Elite Performance
          </p>
        </div>

        <div className="w-48 h-[2px] bg-white/10 relative overflow-hidden">
          <div 
            ref={progressRef}
            className="absolute top-0 left-0 h-full w-0 bg-competition-green shadow-[0_0_10px_#C7F700]"
          />
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-black italic text-white whitespace-nowrap">
          POWER STADIUM
        </div>
      </div>
    </div>
  );
};

export default Preloader;

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Manifesto = () => {
  const manifestoRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const chars = manifestoRef.current.querySelectorAll('span');
      
      gsap.to(chars, {
        color: '#4ADE80',
        stagger: 0.2,
        scrollTrigger: {
          trigger: manifestoRef.current,
          start: 'top 60%',
          end: 'bottom 20%',
          scrub: true,
        }
      });
    }, manifestoRef.current);

    return () => ctx.revert();
  }, []);

  const text = "TU CUERPO ES TU ÚNICA HERRAMIENTA.";

  return (
    <section className="py-24 bg-carbon-black flex items-center justify-center overflow-hidden border-y border-competition-green/10 bg-[url('https://www.transparenttextures.com/patterns/asphalt.png')]">
      <div ref={manifestoRef} className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-8xl lg:text-[10rem] font-black leading-tight tracking-[0.05em] flex flex-wrap justify-center gap-x-2 md:gap-x-10 pointer-events-none break-words">
          {text.split(" ").map((word, i) => (
            <span key={i} className="outline-text block text-3xl md:text-7xl lg:text-[10rem]">
              {word}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
};

export default Manifesto;

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WallCard = ({ level, desc, img, number }) => {
  const handleDetailsClick = () => {
    const text = `Hola! Quiero más detalles sobre la etapa ${number} (${level}).`;
    window.open(`https://api.whatsapp.com/send?phone=524495136907&text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="relative group w-full max-w-7xl mx-auto h-[450px] lg:h-[550px] overflow-hidden border-l-4 border-competition-green bg-cement-gray/20 transition-all duration-500 hover:bg-cement-gray/30">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={img || "/hero.png"} 
          alt={level} 
          loading="lazy"
          className="w-full h-full object-cover opacity-20 group-hover:opacity-60 transition-all duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-carbon-black via-carbon-black/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center px-10 md:px-16">
        <div className="flex-1">
          <h3 className="text-sm sm:text-base md:text-xl font-black text-competition-green tracking-[0.3em] italic mb-4">
            ETAPA {number}
          </h3>
          <h4 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white group-hover:text-competition-green transition-colors leading-none tracking-tighter uppercase">
            {level}
          </h4>
          <p className="mt-8 text-lg text-white/50 uppercase font-bold tracking-widest max-w-xl group-hover:text-white transition-colors">
            {desc}
          </p>
          
          <button 
            onClick={handleDetailsClick}
            className="mt-8 px-8 py-3 bg-competition-green/10 border-2 border-competition-green text-competition-green font-black italic tracking-tighter hover:bg-competition-green hover:text-carbon-black transition-all flex items-center gap-2"
          >
            VER DETALLES
          </button>
        </div>

        <div className="hidden md:flex absolute right-16 bottom-10 opacity-5 group-hover:opacity-100 group-hover:text-competition-green transition-all duration-500 scale-[2]">
           <span className="text-9xl font-black font-jersey leading-none">#{number}</span>
        </div>
      </div>
    </div>
  );
};

const TheWall = () => {
  const wallRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(wallRef.current, {
        backgroundColor: '#052A18', // Deep Green Ambience
        scrollTrigger: {
          trigger: wallRef.current,
          start: 'top 40%',
          end: 'bottom 60%',
          scrub: true,
        }
      });

      gsap.fromTo(".wall-card-item", 
        { opacity: 0, scale: 0.95, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wallRef.current,
            start: "top bottom",
            toggleActions: "play none none none"
          }
        }
      );
    }, wallRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section id="muro" ref={wallRef} className="py-24 md:py-32 bg-carbon-black overflow-hidden relative">
      {/* Decorative Text */}
      <div className="absolute top-1/2 -left-20 -translate-y-1/2 opacity-[0.02] pointer-events-none select-none hidden lg:block">
        <span className="text-[30rem] font-black text-white leading-none whitespace-nowrap">STADIUM POWER</span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 md:mb-32">
          <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] font-black text-white mb-6 leading-none tracking-tighter uppercase">
             EL <span className="text-competition-green italic">MURO</span>
          </h2>
          <p className="text-base sm:text-lg md:text-2xl text-white/40 uppercase font-black italic tracking-[0.2em] sm:tracking-[0.4em]">
            SUPERA TUS PROPIOS LÍMITES
          </p>
        </div>

        <div className="flex flex-col gap-12 md:gap-16">
          {[
            { number: "01", level: "FUNDAMENTOS", img: "/496530228_18020515499703592_3940582384653955375_n.jpg", desc: "Control corporal absoluto. La base de cualquier movimiento de élite comienza aquí." },
            { number: "02", level: "EXPLOSIVIDAD", img: "/466808525_17999912636703592_2781823694379013605_n.jpg", desc: "Convierte tu fuerza en potencia pura. Domina el Muscle Up y las salidas dinámicas." },
            { number: "03", level: "GRAVEDAD CERO", img: "/500097437_18022177343703592_6430570242741941642_n.jpg", desc: "El máximo nivel de dominio. Planche, Front Lever y estáticos que desafían las leyes físicas." }
          ].map((card, idx) => (
            <div key={idx} className="wall-card-item">
              <WallCard 
                number={card.number}
                level={card.level} 
                img={card.img}
                desc={card.desc} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TheWall;

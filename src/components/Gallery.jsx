import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const sectionRef = useRef(null);
  
  const images = [
    "/466795676_17999912591703592_71864999979196931_n.jpg",
    "/466808525_17999912636703592_2781823694379013605_n.jpg",
    "/482192604_628347950060297_162005138276367219_n.jpg",
    "/487114433_18016225388703592_2046897893901276383_n.jpg",
    "/496530228_18020515499703592_3940582384653955375_n.jpg",
    "/499644543_18022177340703592_8447711636911716017_n.jpg",
    "/500097437_18022177343703592_6430570242741941642_n.jpg",
    "/500386496_18022177316703592_6483592524356522261_n.jpg"
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(".gallery-item", 
        { opacity: 0, scale: 0.8, y: 50 },
        {
          opacity: 1, 
          scale: 1, 
          y: 0,
          stagger: {
            amount: 1,
            grid: [2, 4],
            from: "center"
          },
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );

      // Horizontal scroll effect for the header text
      gsap.to(".gallery-scroll-text", {
        xPercent: -20,
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: 1
        }
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section id="galeria" ref={sectionRef} className="py-24 bg-carbon-black overflow-hidden">
      <div className="relative mb-20">
        <div className="gallery-scroll-text whitespace-nowrap opacity-[0.03] select-none pointer-events-none">
          <span className="text-[15rem] font-black italic text-white uppercase tracking-tighter">
            COMMUNITY POWER STRENGTH DISCIPLINE COMMUNITY POWER STRENGTH DISCIPLINE
          </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center p-4">
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-white italic tracking-tighter z-10 text-center">
                NUESTRO <span className="text-competition-green">DOMINIO</span>
            </h2>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="columns-1 md:columns-2 lg:columns-4 gap-6 space-y-6">
          {images.map((img, idx) => (
            <div key={idx} className="gallery-item relative group overflow-hidden break-inside-avoid">
              <img 
                src={img} 
                loading="lazy"
                className="w-full h-auto object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                alt={`Gym image ${idx + 1}`}
              />
              <div className="absolute inset-0 border-2 border-competition-green/0 group-hover:border-competition-green/40 transition-all duration-500" />
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                 <span className="bg-competition-green text-carbon-black px-3 py-1 text-[10px] font-black italic tracking-tighter">
                    SHOT_{idx + 1}
                 </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;

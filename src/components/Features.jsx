import React, { useEffect, useRef, useState } from 'react';
import { Target, TrendingUp, Users } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FeatureCard = ({ title, img, icon: Icon }) => (
  <div className="relative group overflow-hidden bg-cement-gray aspect-[4/5] cursor-pointer">
    <img 
      src={img} 
      alt={title} 
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-100" 
    />
    <div className="absolute inset-0 bg-gradient-to-t from-carbon-black via-carbon-black/40 to-transparent p-10 flex flex-col justify-end">
      <div className="bg-competition-green text-carbon-black p-3 w-fit mb-6 shadow-[0_0_15px_rgba(74,222,128,0.3)]">
        <Icon size={28} strokeWidth={3} />
      </div>
      <h3 className="text-4xl font-black text-white leading-tight">
        {title}
      </h3>
      <div className="h-1 w-0 group-hover:w-full bg-competition-green transition-all duration-300 mt-4 shadow-[0_0_10px_#4ADE80]" />
    </div>
  </div>
);

const Features = () => {
  const [count, setCount] = useState(0);
  const sectionRef = useRef(null);
  const metricsRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Metrics Counter
      let obj = { val: 0 };
      gsap.to(obj, {
        val: 2500,
        duration: 3,
        scrollTrigger: {
          trigger: metricsRef.current,
          start: "top bottom",
        },
        onUpdate: () => setCount(Math.floor(obj.val)),
      });

      // Cards Entrance
      gsap.fromTo(".feature-card-anim", 
        { opacity: 0, scale: 0.9, y: 30 },
        {
          opacity: 1, 
          scale: 1, 
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            toggleActions: "play none none none"
          }
        }
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="py-24 bg-carbon-black text-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 md:mb-20 text-center md:text-left">
          <div>
            <h2 className="text-5xl md:text-7xl font-black leading-none uppercase">
              EQUIPAMIENTO<br /> <span className="text-competition-green">PARA ÉLITE</span>
            </h2>
            <div className="h-1 w-24 bg-competition-green mt-6 mx-auto md:mx-0" />
          </div>
          <p className="max-w-md text-white/50 text-center md:text-right uppercase tracking-widest font-bold mt-8 md:mt-0 text-xs md:text-sm">
            Sin excusas. Sin límites. Solo resultados tangibles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="feature-card-anim">
            <FeatureCard 
              title="COMUNIDAD DE ÉLITE" 
              img="/466795676_17999912591703592_71864999979196931_n.jpg" 
              icon={Users} 
            />
          </div>
          <div className="feature-card-anim">
            <FeatureCard 
              title="ENTRENAMIENTO REAL" 
              img="/499644543_18022177340703592_8447711636911716017_n.jpg" 
              icon={Target} 
            />
          </div>
          <div id="metrics" ref={metricsRef} className="feature-card-anim bg-cement-gray p-8 md:p-10 flex flex-col justify-center items-center text-center aspect-square md:aspect-[4/5] shadow-[0_0_50px_rgba(74,222,128,0.1)] relative overflow-hidden border-2 border-competition-green/40 group">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                <TrendingUp size={120} />
             </div>
             <div className="absolute -bottom-10 -left-10 opacity-5 pointer-events-none select-none">
                <span className="text-9xl font-black text-stroke">STATS</span>
             </div>
             
             <p className="text-lg md:text-xl font-black italic tracking-widest text-competition-green mb-4">
                AUMENTO DE FUERZA
             </p>
             <h4 className="text-7xl md:text-9xl font-[900] font-jersey leading-none text-white tracking-widest drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                +{count}%
             </h4>
             <p className="text-white/60 mt-6 uppercase tracking-[0.3em] font-bold text-xs md:text-sm">
                EN MIEMBROS VIP
             </p>
             <div className="mt-8 md:mt-10 bg-competition-green/10 px-6 py-3 border border-competition-green text-competition-green font-black italic tracking-tighter pulse-green text-sm md:text-base">
                RÉCORD DE RENDIMIENTO ★
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

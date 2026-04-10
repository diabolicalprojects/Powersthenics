import React, { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Pricing = () => {
  const sectionRef = useRef(null);
  const plans = [
    {
      name: "Student Power Pass",
      price: "500",
      period: "/mes",
      features: ["Acceso todos los días", "Válido < 25 años", "Credencial vigente", "Comunidad VIP"],
      cta: "Quiero mi pase",
      popular: false
    },
    {
      name: "Basic Membership",
      price: "660",
      period: "/mes",
      features: ["3 días por semana", "Días a elegir", "Acceso a instalaciones", "Soporte básico"],
      cta: "Empezar ya",
      popular: false
    },
    {
      name: "Full Access",
      price: "900",
      period: "/mes",
      features: ["Acceso ilimitado 24/7", "Todos los días", "Eventos exclusivos", "Mentoría grupal"],
      cta: "Go Pro Now",
      popular: true
    },
    {
      name: "Elite High",
      price: "1,400",
      period: "/4 sem",
      features: ["Rutina personalizada", "Enfoque a objetivos", "Seguimiento semanal", "Acceso total"],
      cta: "Ser Elite",
      popular: false
    },
    {
      name: "Online Coaching",
      price: "800",
      period: "/mes",
      features: ["Rutina adaptable", "Entrena donde sea", "Feedback digital", "Comunidad Online"],
      cta: "Entrenar Remoto",
      popular: false
    }
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(".pricing-card", 
        { 
          opacity: 0, 
          y: 50,
          scale: 0.95
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );
    }, sectionRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <section id="precios" ref={sectionRef} className="py-24 bg-carbon-black relative overflow-hidden">
      {/* Background Decorative Text */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] flex items-center justify-center select-none overflow-hidden">
        <span className="text-[40vw] md:text-[30vw] font-black italic text-white leading-none">MEMBERSHIP</span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-5xl sm:text-6xl md:text-8xl font-black text-white italic tracking-tighter mb-4">
            ELIGE TU <span className="text-competition-green text-stroke-sm">NIVEL</span>
          </h2>
          <div className="flex flex-col items-center gap-2">
            <p className="text-white/40 font-bold uppercase tracking-[0.4em] text-sm">Escala tu potencial</p>
            <div className="bg-competition-green text-carbon-black px-4 py-1 text-xs font-black italic tracking-tighter uppercase mt-2">
              Inscripción: $600 MXN
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`pricing-card group p-8 flex flex-col ${
                plan.popular 
                ? 'bg-competition-green ring-4 ring-competition-green/30' 
                : 'bg-cement-gray/10 border border-white/5 hover:border-competition-green/50'
              } transition-all duration-500`}
            >
              {plan.popular && (
                <span className="text-carbon-black text-[10px] font-black tracking-widest uppercase mb-4 block">
                  Most Popular ★
                </span>
              )}
              <h3 className={`text-xl font-black uppercase tracking-tighter mb-2 ${plan.popular ? 'text-carbon-black' : 'text-white'}`}>
                {plan.name}
              </h3>
              <div className="flex items-baseline mb-8">
                <span className={`text-4xl font-black ${plan.popular ? 'text-carbon-black' : 'text-competition-green'}`}>
                  ${plan.price}
                </span>
                <span className={`text-xs font-bold uppercase ml-1 ${plan.popular ? 'text-carbon-black/60' : 'text-white/40'}`}>
                  {plan.period}
                </span>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <div className={`mt-1.5 w-1.5 h-1.5 rounded-full ${plan.popular ? 'bg-carbon-black' : 'bg-competition-green'}`} />
                    <span className={`text-[11px] font-bold uppercase tracking-wider leading-tight ${plan.popular ? 'text-carbon-black/80' : 'text-white/60'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => window.open(`https://wa.me/524495136907?text=Hola,%20me%20interesa%20el%20plan%20${encodeURIComponent(plan.name)}`, '_blank')}
                className={`w-full py-4 text-xs font-black italic tracking-widest uppercase transition-all ${
                  plan.popular 
                  ? 'bg-carbon-black text-competition-green hover:bg-white hover:text-carbon-black shadow-xl' 
                  : 'bg-competition-green text-carbon-black hover:bg-white hover:shadow-[0_0_20px_rgba(199,247,0,0.2)]'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

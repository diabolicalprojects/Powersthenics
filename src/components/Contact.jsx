import React, { useEffect, useRef } from 'react';
import { Send, MapPin, Phone, Mail } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const formRef = useRef(null);
  const sectionRef = useRef(null);
  
  const handleWhatsAppClick = (e) => {
    e.preventDefault();
    const name = formRef.current.querySelector('input[type="text"]').value;
    const message = formRef.current.querySelector('textarea').value;
    const text = `*MENSAJE DESDE LA WEB*\n\n*Nombre:* ${name}\n*Mensaje:* ${message}`;
    window.open(`https://wa.me/524495136907?text=${encodeURIComponent(text)}`, '_blank');
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(".contact-info-item", 
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
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

      gsap.fromTo(".contact-form", 
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
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
    <section id="contacto" ref={sectionRef} className="py-24 bg-carbon-black border-t border-competition-green/10 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Info Side */}
          <div className="lg:w-1/3">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-none mb-10 uppercase">
              HABLEMOS DE <span className="text-competition-green">FUERZA</span>
            </h2>
            <div className="space-y-8">
              {[
                { icon: MapPin, title: 'UBICACIÓN', info: 'JORGE REYNOSO 809, AGUASCALIENTES', link: 'https://maps.app.goo.gl/r6N7cet4KCuNG1Zx6' },
                { icon: Phone, title: 'WHATSAPP', info: '+52 449 513 6907', link: 'https://wa.me/524495136907' },
                { icon: Mail, title: 'EMAIL', info: 'CONTACTO@POWERSTHENICS.MX', link: 'mailto:contacto@powersthenics.mx' }
              ].map((item, idx) => (
                <a 
                  key={idx} 
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-info-item flex items-center gap-6 group cursor-pointer"
                >
                  <div className="w-16 h-16 bg-competition-green text-carbon-black flex items-center justify-center pulse-green shrink-0">
                    <item.icon size={28} strokeWidth={3} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-competition-green tracking-widest italic">{item.title}</h4>
                    <p className="text-white/70 font-bold uppercase tracking-widest text-[10px] md:text-sm leading-tight max-w-[200px]">{item.info}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Form Side */}
          <div className="contact-form lg:w-2/3 bg-cement-gray/10 p-8 md:p-16 border-l-4 border-competition-green">
            <form ref={formRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black text-competition-green tracking-[0.3em] uppercase italic">Tu Nombre</label>
                <input
                  type="text"
                  placeholder="E.G. BRUCE WAYNE"
                  className="bg-transparent border-b-2 border-white/10 py-4 text-white font-bold placeholder:text-white/20 focus:border-competition-green outline-none transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black text-competition-green tracking-[0.3em] uppercase italic">Tu WhatsApp</label>
                <input
                  type="tel"
                  placeholder="+52..."
                  className="bg-transparent border-b-2 border-white/10 py-4 text-white font-bold placeholder:text-white/20 focus:border-competition-green outline-none transition-colors"
                />
              </div>
              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-xs font-black text-competition-green tracking-[0.3em] uppercase italic">Tu Mensaje</label>
                <textarea
                  rows="4"
                  placeholder="CUÉNTANOS TU META..."
                  className="bg-transparent border-b-2 border-white/10 py-4 text-white font-bold placeholder:text-white/20 focus:border-competition-green outline-none transition-colors resize-none"
                />
              </div>
              <div className="md:col-span-2 mt-4">
                <button 
                  onClick={handleWhatsAppClick}
                  className="w-full md:w-auto flex items-center justify-center gap-3 bg-competition-green text-carbon-black px-12 py-5 font-black italic tracking-tighter text-xl hover:bg-white transition-all pulse-green uppercase"
                >
                  ENVIAR WHATSAPP <Send size={24} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

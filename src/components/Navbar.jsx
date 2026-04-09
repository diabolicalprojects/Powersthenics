import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const smoothScroll = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(targetId);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'glass-nav py-2' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a 
          href="#home" 
          onClick={(e) => smoothScroll(e, '#home')}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <img src="/logo.png" alt="Powersthenics Logo" className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-110" />
          <span className="hidden sm:block text-xl font-[900] tracking-tighter text-white leading-none uppercase italic">
            POWER<span className="text-competition-green">STHENICS</span>
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10">
          {[
            { name: 'RUTINAS', id: '#features' },
            { name: 'MÉTRICAS', id: '#metrics' },
            { name: 'COMUNIDAD', id: '#muro' },
            { name: 'PRECIOS', id: '#precios' }
          ].map((item) => (
            <a 
              key={item.name} 
              href={item.id} 
              onClick={(e) => smoothScroll(e, item.id)}
              className="text-[10px] font-black tracking-[0.3em] text-white/50 hover:text-competition-green transition-all hover:tracking-[0.4em] uppercase"
            >
              {item.name}
            </a>
          ))}
          <button 
            onClick={() => window.open('https://wa.me/524495136907?text=Hola!%20Quiero%20empezar%20el%20desafío%20en%20Powersthenics', '_blank')}
            className="bg-competition-green text-carbon-black px-8 py-3 rounded-none font-black italic tracking-tighter hover:bg-white transition-all transform hover:-skew-x-12 pulse-green uppercase text-xs"
          >
            EMPIEZA EL DESAFÍO
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white border border-competition-green/40 p-2 hover:bg-competition-green/10" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-0 left-0 w-full h-screen bg-carbon-black flex flex-col items-center justify-center gap-10 z-[-1] animate-in fade-in slide-in-from-bottom-10 duration-500">
           {[
            { name: 'RUTINAS', id: '#features' },
            { name: 'MÉTRICAS', id: '#metrics' },
            { name: 'DOMINIO', id: '#galeria' },
            { name: 'COMUNIDAD', id: '#muro' },
            { name: 'PRECIOS', id: '#precios' }
          ].map((item) => (
            <a 
              key={item.name} 
              href={item.id} 
              className="text-4xl font-black tracking-tighter text-white uppercase italic hover:text-competition-green transition-colors"
              onClick={(e) => smoothScroll(e, item.id)}
            >
              {item.name}
            </a>
          ))}
          <button 
            onClick={() => window.open('https://wa.me/524495136907?text=Hola!%20Quiero%20empezar%20el%20desafío%20en%20Powersthenics', '_blank')}
            className="bg-competition-green text-carbon-black px-12 py-5 font-black italic tracking-tighter text-xl uppercase"
          >
            EMPIEZA EL DESAFÍO
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

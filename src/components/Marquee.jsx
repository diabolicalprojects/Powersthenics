import React from 'react';

const Marquee = () => {
  const items = [
    "DOMINA LA BARRA", 
    "SUEÑO, COMIDA, CALISTENIA", 
    "SIN EXCUSAS", 
    "CALIFORNIA VIBES", 
    "FUERZA PURA", 
    "MENTE DE ÉLITE", 
    "GRAVEDAD CERO",
    "Powersthenics"
  ];

  return (
    <div className="bg-competition-green text-carbon-black py-2 overflow-hidden flex whitespace-nowrap border-b-2 border-carbon-black select-none z-[60] relative">
      <div className="flex animate-[marquee_30s_linear_infinite] gap-10 items-center">
        {items.concat(items).map((text, i) => (
          <div key={i} className="flex items-center gap-10">
            <span className="text-sm font-black italic tracking-tighter uppercase">{text}</span>
            <span className="text-xs">★</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;

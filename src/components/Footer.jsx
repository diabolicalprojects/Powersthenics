import { Camera, Zap, Flame, Video, Target, Music } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-carbon-black border-t border-white/10 pt-24 pb-12 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-2">
            <div className="flex items-center gap-4 mb-8">
               <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
               <h2 className="text-4xl font-[900] text-white tracking-tighter leading-none italic uppercase">
                POWER<span className="text-competition-green">STHENICS</span>
              </h2>
            </div>
            <p className="text-xl text-white/40 font-bold uppercase tracking-widest max-w-lg mb-10">
              NOS VEMOS EN LA BARRA. EL PODER NO SE PIDE, SE CONSTRUYE.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://www.instagram.com/powersthenics_mx/" 
                target="_blank" 
                rel="noreferrer"
                className="px-4 py-2 border border-white/10 flex items-center gap-3 hover:bg-competition-green hover:text-carbon-black transition-all group"
              >
                <Camera size={18} className="text-competition-green group-hover:text-carbon-black" />
                <span className="text-[10px] font-black tracking-widest uppercase">Instagram</span>
              </a>
              <a 
                href="https://www.facebook.com/powersthenics.mx" 
                target="_blank" 
                rel="noreferrer"
                className="px-4 py-2 border border-white/10 flex items-center gap-3 hover:bg-competition-green hover:text-carbon-black transition-all group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-competition-green group-hover:text-carbon-black"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <span className="text-[10px] font-black tracking-widest uppercase">Facebook</span>
              </a>
              <a 
                href="https://www.tiktok.com/@powersthenics" 
                target="_blank" 
                rel="noreferrer"
                className="px-4 py-2 border border-white/10 flex items-center gap-3 hover:bg-competition-green hover:text-carbon-black transition-all group"
              >
                <Music size={18} className="text-competition-green group-hover:text-carbon-black" />
                <span className="text-[10px] font-black tracking-widest uppercase">TikTok</span>
              </a>
            </div>
          </div>

          <div>
             <h4 className="text-sm font-black text-competition-green tracking-[0.3em] mb-8 italic">ENLACES</h4>
             <div className="flex flex-col gap-4 text-white font-bold tracking-widest uppercase">
                <a href="#features" className="hover:text-competition-green transition-colors">Rutinas</a>
                <a href="#galeria" className="hover:text-competition-green transition-colors">Dominio</a>
                <a href="#muro" className="hover:text-competition-green transition-colors">Comunidad</a>
             </div>
          </div>

          <div>
             <h4 className="text-sm font-black text-competition-green tracking-[0.3em] mb-8 italic">SOPORTE</h4>
             <div className="flex flex-col gap-4 text-white font-bold tracking-widest uppercase">
                <a href="#precios" className="hover:text-competition-green transition-colors">Membresías</a>
                <a href="#" className="hover:text-competition-green transition-colors">Privacidad</a>
                <a href="#contacto" className="hover:text-competition-green transition-colors">Contacto</a>
             </div>
          </div>
        </div>

        <div className="text-center md:text-left border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">
            © 2026 POWERSTHENICS. TODOS LOS DERECHOS RESERVADOS.
          </p>
          
          <div className="flex flex-col items-center md:items-end gap-3">
             <span className="text-[9px] text-white/30 font-black tracking-[0.4em] uppercase">DESIGNED & DEVELOPED BY</span>
             <img 
              src="/LOGO-DIABOLICAL-HORIZONTAL-BLANCO@2x.png" 
              alt="Diabolical" 
              className="h-5 md:h-6 w-auto opacity-50 hover:opacity-100 transition-opacity cursor-pointer" 
             />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, User, MessageCircle, ArrowLeft, Info, ExternalLink } from 'lucide-react';
import gsap from 'gsap';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const chatRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [step, isOpen]);

  useEffect(() => {
    if (isOpen && chatRef.current) {
      const timer = setTimeout(() => {
        gsap.fromTo(chatRef.current, 
          { scale: 0.8, opacity: 0, y: 50 }, 
          { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.7)", clearProps: "all" }
        );
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const toggleChat = () => {
    if (!isOpen) {
      setIsOpen(true);
    } else {
      gsap.to(chatRef.current, {
        scale: 0.8, 
        opacity: 0, 
        y: 50, 
        duration: 0.3, 
        onComplete: () => setIsOpen(false)
      });
    }
  };

  const handleOption = (field, value, nextStep) => {
    setResponses(prev => ({ ...prev, [field]: value }));
    setStep(nextStep);
  };

  const sendToWhatsApp = () => {
    const adminPhone = "524495136907";
    // Usando pares subalternos (Surrogate Pairs) para máxima compatibilidad
    const message = `\uD83D\uDD25 *NUEVO ATLETA - POWERSTHENICS* \uD83D\uDD25\n\n` +
      `\u26A1 *Nombre:* ${name}\n` +
      `\uD83D\uDCF1 *WhatsApp:* ${phone}\n\n` +
      `\uD83C\uDFAF *Objetivo:* ${responses.objective}\n` +
      `\uD83D\uDCAA *Nivel:* ${responses.level}\n` +
      `\uD83D\uDE80 *Interés:* ${responses.interest === 'yes' ? 'EMPEZAR YA' : 'SOLO INFO'}\n\n` +
      `--- _Enviado desde el Asistente Powersthenics_ ---`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?phone=${adminPhone}&text=${encodedMessage}`, '_blank');
  };

  const steps = [
    {
      id: 0,
      message: "¡Hola! Bienvenido a Powersthenics. Soy tu asistente virtual. ¿Estás listo para llevar tu entrenamiento al siguiente nivel?",
      options: [
        { label: "¡Sí, estoy listo!", value: "yes", next: 1 },
        { label: "Solo busco info", value: "info", next: 1 }
      ],
      field: "interest"
    },
    {
      id: 1,
      message: "¡Excelente decisión! ¿Cuál es tu objetivo principal?",
      options: [
        { label: "Aumentar fuerza", value: "Fuerza", next: 2 },
        { label: "Aprender Skills", value: "Skills", next: 2 },
        { label: "Quemar grasa", value: "Perder Peso", next: 2 },
        { label: "Resistencia", value: "Resistencia", next: 2 }
      ],
      field: "objective"
    },
    {
      id: 2,
      message: "¿Cuál es tu nivel actual?",
      options: [
        { label: "Principiante", value: "Principiante", next: 3 },
        { label: "Intermedio", value: "Intermedio", next: 3 },
        { label: "Avanzado", value: "Avanzado", next: 3 }
      ],
      field: "level"
    }
  ];

  return (
    <>
      {/* Floating Demo Button */}
      <button 
        onClick={() => setIsDemoModalOpen(true)}
        className="fixed bottom-6 right-24 z-[100] px-4 py-2 bg-white text-carbon-black font-black italic tracking-tighter text-xs rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all border-2 border-competition-green"
      >
        DEMO
      </button>

      {/* Demo Modal */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-carbon-black/90 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-cement-gray p-8 md:p-12 max-w-lg w-full rounded-2xl border-2 border-competition-green shadow-[0_0_50px_rgba(199,247,0,0.2)] relative">
              <button 
                onClick={() => setIsDemoModalOpen(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              <div className="flex justify-center mb-6">
                 <div className="w-16 h-16 bg-competition-green text-carbon-black rounded-full flex items-center justify-center pulse-green">
                    <Info size={32} />
                 </div>
              </div>
              <h2 className="text-3xl font-black text-white italic tracking-tighter text-center uppercase mb-6">Información Demo</h2>
              <p className="text-white/70 font-bold tracking-widest text-center mb-8 uppercase leading-relaxed">
                Esta página es una demostración funcional de diseño y tecnología para centros deportivos de alto rendimiento.
              </p>
              <div className="space-y-4">
                <p className="text-competition-green text-[10px] font-black tracking-[0.3em] text-center uppercase italic">Si buscas implementar una solución similar:</p>
                <button 
                  onClick={() => window.open('https://wa.me/524495136907?text=Hola!%20Me%20interesa%20implementar%20una%20web%20como%20la%20de%20Powersthenics', '_blank')}
                  className="w-full bg-competition-green text-carbon-black font-black py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-white transition-all uppercase tracking-tighter italic"
                >
                  Contactar Desarrollador <ExternalLink size={20} />
                </button>
              </div>
           </div>
        </div>
      )}

      {/* Floating Chatbot Button */}
      <button 
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-competition-green text-carbon-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(199,247,0,0.5)] hover:scale-110 active:scale-95 transition-all pulse-green"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div 
          ref={chatRef}
          className="fixed bottom-24 right-6 z-[100] w-[350px] max-w-[calc(100vw-3rem)] bg-carbon-black border border-cement-gray rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[500px]"
        >
          {/* Header */}
          <div className="bg-cement-gray p-4 flex items-center justify-between border-b border-competition-green/20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-competition-green rounded-full flex items-center justify-center">
                <User size={18} className="text-carbon-black" />
              </div>
              <div>
                <h3 className="text-white text-sm font-bold tracking-tighter uppercase">Power Assistant</h3>
                <span className="text-[10px] text-competition-green flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-competition-green rounded-full animate-pulse" /> En línea
                </span>
              </div>
            </div>
            <button onClick={toggleChat} className="text-white/50 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
            {steps.map((s, idx) => step >= idx && (
              <React.Fragment key={idx}>
                <div className="flex justify-start">
                  <div className="bg-cement-gray/50 text-white p-3 rounded-2xl rounded-tl-none max-w-[85%] text-sm border border-white/5">
                    {s.message}
                  </div>
                </div>

                {step > idx && responses[s.field] && (
                  <div className="flex justify-end">
                    <div className="bg-competition-green text-carbon-black p-3 rounded-2xl rounded-tr-none max-w-[85%] text-sm font-bold">
                      {responses[s.field]}
                    </div>
                  </div>
                )}

                {step === idx && (
                  <div className="grid grid-cols-1 gap-2 pt-2">
                    {s.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleOption(s.field, opt.label, opt.next)}
                        className="text-left bg-carbon-black border border-competition-green/30 text-competition-green hover:bg-competition-green hover:text-carbon-black p-2.5 rounded-xl text-xs font-bold transition-all uppercase tracking-wider"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}

            {step === 3 && (
              <div className="space-y-4 pt-2">
                <div className="flex justify-start">
                  <div className="bg-cement-gray/50 text-white p-3 rounded-2xl rounded-tl-none max-w-[85%] text-sm border border-white/5">
                    ¡Casi terminamos! Solo necesito unos datos para pasarte con un experto.
                  </div>
                </div>
                
                <div className="space-y-3 bg-cement-gray/20 p-4 rounded-2xl border border-white/5">
                  <div>
                    <label className="text-[10px] uppercase text-white/50 mb-1 block">Tu Nombre</label>
                    <input 
                      type="text" 
                      placeholder="Ej. Juan Pérez"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-carbon-black border border-white/10 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-competition-green transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-white/50 mb-1 block">Tu WhatsApp</label>
                    <input 
                      type="tel" 
                      placeholder="Ej. +521..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-carbon-black border border-white/10 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-competition-green transition-colors"
                    />
                  </div>
                  <button 
                    onClick={sendToWhatsApp}
                    disabled={!name || !phone}
                    className="w-full bg-competition-green text-carbon-black font-black py-3 rounded-lg text-sm uppercase tracking-tighter disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_15px_rgba(199,247,0,0.4)] transition-all flex items-center justify-center gap-2"
                  >
                    Enviar al asesor <Send size={16} />
                  </button>
                </div>
                
                <button 
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1 text-[10px] text-white/30 hover:text-white transition-colors uppercase font-bold"
                >
                  <ArrowLeft size={12} /> Volver
                </button>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="p-2 bg-cement-gray/30 text-center">
            <p className="text-[8px] uppercase text-white/20 tracking-[0.2em]">Powersthenics Lead System v1.5</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;

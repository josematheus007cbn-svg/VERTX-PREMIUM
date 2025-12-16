import React, { useState } from 'react';
import { Shield, AlertTriangle, Lock, X, ShoppingCart, ShieldCheck, CreditCard, QrCode } from 'lucide-react';
import { BenefitItem } from './components/BenefitItem';
import { SupportChat } from './components/SupportChat';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenPayment = () => {
    window.location.href = 'https://pay.cakto.com.br/3ap2h3c_688091';
  };

  return (
    <div className="min-h-screen bg-black text-zinc-200 selection:bg-brand-500/30 flex flex-col font-sans">
      
      {/* Navbar Simple */}
      <nav className="border-b border-zinc-800 bg-black/50 backdrop-blur-md sticky top-0 z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-default">
            <span className="font-bold text-lg tracking-tight text-white group-hover:text-brand-400 transition-colors duration-300">VERTX <span className="text-brand-500 group-hover:text-white transition-colors duration-300">PREMIUM</span></span>
          </div>
          <div className="text-xs sm:text-sm font-medium text-zinc-400 flex items-center gap-2 px-3 py-1 rounded-full border border-transparent hover:border-zinc-800 transition-all">
            <Shield size={14} className="text-brand-500 flex-shrink-0" />
            <span className="hidden xs:inline">Compra Segura</span>
            <span className="xs:hidden">Seguro</span>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-10 lg:py-16 relative overflow-hidden">
        {/* Ambient Background Glow - Centered */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-brand-500/10 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none animate-pulse duration-[4000ms]"></div>

        <div className="relative z-10 max-w-3xl w-full flex flex-col items-center space-y-8 sm:space-y-12 animate-in slide-in-from-bottom-8 fade-in duration-700">
          
          {/* Product Info - Centered */}
          <div className="text-center space-y-4 sm:space-y-6">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight drop-shadow-xl px-2">
              Imagine ter uma ferramenta 24 horas por dia que lhe diga o <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">momento certo de entrar na operação?</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed px-4">
              Desbloqueie o poder total da análise com IA. Ferramentas profissionais para resultados profissionais.
            </p>
          </div>

          {/* Pricing Card - Centered */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md mx-auto border-zinc-800/50 ring-1 ring-white/5 hover:ring-brand-500/30 transition-all duration-500 hover:shadow-brand-500/10 hover:-translate-y-1 bg-gradient-to-b from-zinc-900/80 to-black/80 backdrop-blur-xl">
            <div className="flex justify-between items-center mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-zinc-800">
              <h3 className="text-xl sm:text-2xl font-semibold text-white">Plano Premium</h3>
              <div className="text-right">
                <span className="text-3xl sm:text-4xl font-bold text-white tracking-tight">R$ 19,90</span>
                <span className="text-zinc-500 text-xs sm:text-sm font-medium block sm:inline ml-1">/mês</span>
              </div>
            </div>

            <div className="space-y-3 mb-6 sm:mb-8">
              <BenefitItem feature={{ text: "Geração de Sinais Ilimitada", included: true }} />
              <BenefitItem feature={{ text: "Todos os Ativos Liberados", included: true }} />
              <BenefitItem feature={{ text: "Prioridade na IA", included: true }} />
              <BenefitItem feature={{ text: "Sinais de Alta Precisão em Tempo Real", included: true }} />
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-bold text-base sm:text-lg py-3.5 sm:py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 flex items-center justify-center gap-2 group"
            >
               Adquirir Código Agora
               <ShieldCheck size={18} className="text-brand-200 group-hover:text-white transition-colors" />
            </button>

            {/* Payment Methods & Security Icons */}
            <div className="mt-5 sm:mt-6 pt-5 border-t border-zinc-800/50 flex flex-col items-center gap-4">
              <div className="flex items-center justify-center gap-6 w-full opacity-80 hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-2 text-zinc-400" title="Cartão de Crédito">
                  <CreditCard size={18} className="text-zinc-500" />
                  <span className="text-xs font-medium">Cartão</span>
                </div>
                <div className="w-px h-4 bg-zinc-800"></div>
                <div className="flex items-center gap-2 text-zinc-400" title="Pagamento via Pix">
                  <QrCode size={18} className="text-zinc-500" />
                  <span className="text-xs font-medium">Pix</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 bg-zinc-900/80 px-4 py-1.5 rounded-full border border-zinc-800/50 hover:border-brand-500/20 transition-colors cursor-default">
                <ShieldCheck size={14} className="text-brand-500" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 whitespace-nowrap">Compra 100% Segura</span>
              </div>
            </div>

          </div>
          
          {/* Footer Credits */}
          <div className="pt-4 sm:pt-8 text-center animate-in fade-in duration-1000 delay-300">
            <p className="text-zinc-600 text-xs sm:text-sm font-medium tracking-wide">
              Todos os direitos reservados a <span className="text-zinc-500 font-bold hover:text-brand-500 transition-colors cursor-default">MOGIN STUDIOS LTD</span>
            </p>
          </div>

        </div>
      </main>
      
      {/* Support Chat using Gemini */}
      <SupportChat />

      {/* Warning Modal - Optimized for Mobile Scrolling */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-zinc-950/95 border border-zinc-800 rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl relative animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 ring-1 ring-white/10 max-h-[85vh] overflow-y-auto scrollbar-hide">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 sm:right-5 sm:top-5 text-zinc-500 hover:text-white transition-colors bg-zinc-900/50 p-1.5 rounded-full hover:bg-zinc-800 z-10"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 pt-2">
              <div className="p-3 sm:p-4 bg-brand-500/10 rounded-full ring-1 ring-brand-500/20 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                <ShoppingCart className="text-brand-500" size={28} />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight text-center">Finalizar Compra</h2>
            </div>

            <div className="mb-5 sm:mb-6 flex items-start sm:items-center gap-3 bg-yellow-500/5 border border-yellow-500/10 p-3 sm:p-4 rounded-xl">
              <div className="bg-yellow-500/10 p-2 rounded-lg shrink-0 mt-0.5 sm:mt-0">
                <AlertTriangle className="text-yellow-500" size={18} />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-zinc-200">Aviso Importante</h3>
            </div>

            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 px-1 sm:px-2">
              <p className="text-zinc-400 text-xs sm:text-sm flex gap-3 items-start leading-relaxed">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
                <span>O código será enviado para o <strong>e-mail</strong> informado no pagamento.</span>
              </p>
              <p className="text-zinc-400 text-xs sm:text-sm flex gap-3 items-start leading-relaxed">
                 <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
                <span>Prazo de envio de até <strong>24 horas</strong> (processamento manual).</span>
              </p>
              <p className="text-zinc-400 text-xs sm:text-sm flex gap-3 items-start leading-relaxed">
                 <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
                <span>Garantia: caso não receba em 24 horas, solicite o reembolso total ou contate nosso suporte.</span>
              </p>
            </div>

            <button
              onClick={handleOpenPayment}
              className="w-full bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-bold py-3.5 sm:py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-brand-500/25 group mb-4"
            >
              <Lock size={18} className="group-hover:text-brand-100 transition-colors" />
              Ir para Pagamento Seguro
            </button>

            <div className="mt-2 flex flex-col items-center gap-3 pb-2">
              {/* Payment Icons with Slide-in Animation */}
              <div className="flex items-center gap-4 text-zinc-500 animate-in slide-in-from-bottom-3 fade-in duration-700 delay-200 fill-mode-both">
                 <div className="flex items-center gap-1.5">
                   <CreditCard size={14} />
                   <span className="text-[10px] font-medium uppercase tracking-wide">Cartão</span>
                 </div>
                 <div className="w-px h-3 bg-zinc-800"></div>
                 <div className="flex items-center gap-1.5">
                   <QrCode size={14} />
                   <span className="text-[10px] font-medium uppercase tracking-wide">Pix</span>
                 </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-zinc-500">
                <ShieldCheck size={14} />
                <span className="text-[10px] font-bold tracking-widest uppercase">Processado por Cakto</span>
              </div>
              <p className="text-zinc-600 text-[10px] text-center max-w-[250px] leading-tight">
                Seus dados estão protegidos com criptografia de ponta a ponta.
              </p>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
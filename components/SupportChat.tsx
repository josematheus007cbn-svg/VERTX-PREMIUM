import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Loader2, Bot, ChevronRight, Send } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const FAQ_OPTIONS = [
  {
    id: 1,
    label: "Como funciona o Premium?",
    answer: "O VERTX PREMIUM desbloqueia o potencial máximo da ferramenta. \n\nBenefícios exclusivos:\n• Geração de sinais ilimitada;\n• Todos os ativos liberados;\n• Prioridade no processamento da IA;\n• Sinais de alta precisão em tempo real.\n\nTudo isso por apenas R$ 19,90/mês."
  },
  {
    id: 2,
    label: "Como ativar meu código?",
    answer: "É simples! Após o pagamento, você receberá o código no seu e-mail.\n\nPasso a passo:\n1. Copie o código recebido;\n2. Abra o app VERTX TRADING;\n3. Vá na aba Premium (ao lado de Histórico);\n4. Role até 'Código de Acesso';\n5. Cole e clique em 'Validar Código'.\n\nPronto! Acesso liberado."
  },
  {
    id: 3,
    label: "Como pedir reembolso?",
    answer: "Caso não receba seu código em até 24 horas ou ele apresente erro, contate nosso suporte nas configurações do app.\n\n⚠️ Importante: Se o código já foi ativado e utilizado, o produto é considerado consumido e o reembolso não é aplicável, conforme termos de uso."
  }
];

export const SupportChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'welcome', role: 'model', text: 'Olá! Sou o assistente virtual da VERTX. \nPosso tirar suas dúvidas sobre o Premium ou sobre o App. Como posso ajudar?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [messages, isOpen, loading]);

  const handleSendMessage = async (text: string, isOption = false) => {
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: text
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      let responseText = "";
      
      if (isOption) {
        // Simulated delay for FAQ to feel natural
        await new Promise(resolve => setTimeout(resolve, 800));
        const option = FAQ_OPTIONS.find(opt => opt.label === text);
        responseText = option ? option.answer : "Opção não encontrada.";
      } else {
        // Real Gemini Call
        responseText = await sendMessageToGemini(text);
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Desculpe, tive um problema de conexão. Tente novamente em instantes.",
        isError: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage(inputText);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end font-sans">
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-2rem)] sm:w-96 h-[65vh] sm:h-[550px] bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300 ring-1 ring-white/10 origin-bottom-right">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 p-4 border-b border-zinc-800 flex justify-between items-center shrink-0 shadow-md z-10">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-brand-500 to-brand-700 p-2 rounded-xl shadow-lg shadow-brand-500/20">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide">Suporte VERTX</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
                  <p className="text-xs text-zinc-400 font-medium">IA Online</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-zinc-500 hover:text-white transition-colors bg-white/5 p-1.5 rounded-lg hover:bg-white/10"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-950/50 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                <div 
                  className={`max-w-[85%] p-3 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap shadow-md ${
                    msg.role === 'user' 
                      ? 'bg-brand-600 text-white rounded-2xl rounded-br-none bg-gradient-to-br from-brand-500 to-brand-700' 
                      : 'bg-zinc-800 text-zinc-200 rounded-2xl rounded-bl-none border border-zinc-700/50'
                  } ${msg.isError ? 'border-red-500/50 bg-red-900/20' : ''}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start animate-in fade-in">
                <div className="bg-zinc-800 border border-zinc-700/50 p-3 rounded-2xl rounded-bl-none flex items-center gap-2 shadow-sm">
                  <Loader2 size={14} className="animate-spin text-brand-500" />
                  <span className="text-xs text-zinc-400 font-medium">Digitando...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions (only show if not loading and messages list isn't huge, or always show at top? Better: Always show above input if user hasn't typed much) */}
          <div className="bg-zinc-900 border-t border-zinc-800/50 shrink-0">
             {/* Horizontal scroll for chips if needed, or vertical list */}
             <div className="px-4 pt-3 pb-1 flex gap-2 overflow-x-auto scrollbar-hide mask-linear-gradient">
                {FAQ_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleSendMessage(option.label, true)}
                    disabled={loading}
                    className="whitespace-nowrap flex-shrink-0 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700 hover:border-brand-500/50 text-zinc-300 hover:text-brand-400 text-xs py-1.5 px-3 rounded-full transition-all duration-200 disabled:opacity-50"
                  >
                    {option.label}
                  </button>
                ))}
             </div>

            {/* Input Area */}
            <div className="p-3 flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Digite sua dúvida..."
                className="flex-1 bg-zinc-950 border border-zinc-800 text-zinc-200 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition-all placeholder:text-zinc-600"
                disabled={loading}
              />
              <button
                onClick={() => handleSendMessage(inputText)}
                disabled={!inputText.trim() || loading}
                className="p-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl transition-all shadow-lg shadow-brand-900/20 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
              >
                <Send size={18} />
              </button>
            </div>
            <div className="px-4 pb-2 text-center">
              <span className="text-[10px] text-zinc-600">IA treinada pela VERTX • Respostas podem variar.</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-white rounded-full shadow-lg shadow-brand-500/30 transition-all duration-300 hover:scale-110 active:scale-90 border border-white/10"
      >
        <div className={`transition-all duration-300 absolute ${isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}>
           <MessageSquare size={24} className="text-white/90 sm:w-[26px] sm:h-[26px]" fill="currentColor" />
        </div>
        <div className={`transition-all duration-300 absolute ${isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}>
           <X size={24} className="sm:w-[26px] sm:h-[26px]" />
        </div>
        
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-black"></span>
          </span>
        )}
      </button>
    </div>
  );
};
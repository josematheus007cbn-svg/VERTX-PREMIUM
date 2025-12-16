import React from 'react';
import { ShieldCheck, Lock, CheckCircle } from 'lucide-react';

export const SecurityBadges: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-zinc-800">
      <div className="flex flex-col items-center text-center gap-2">
        <Lock className="text-zinc-500" size={20} />
        <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Pagamento Seguro</span>
      </div>
      <div className="flex flex-col items-center text-center gap-2">
        <ShieldCheck className="text-zinc-500" size={20} />
        <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Dados Criptografados</span>
      </div>
      <div className="flex flex-col items-center text-center gap-2">
        <CheckCircle className="text-zinc-500" size={20} />
        <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Entrega Imediata</span>
      </div>
    </div>
  );
};
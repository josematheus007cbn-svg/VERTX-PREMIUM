import React from 'react';
import { Check, X } from 'lucide-react';
import { PlanFeature } from '../types';

interface BenefitItemProps {
  feature: PlanFeature;
}

export const BenefitItem: React.FC<BenefitItemProps> = ({ feature }) => {
  return (
    <div className="flex items-center space-x-3 py-2">
      <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${feature.included ? 'bg-brand-500/10 text-brand-500' : 'bg-zinc-800 text-zinc-600'}`}>
        {feature.included ? <Check size={14} strokeWidth={3} /> : <X size={14} />}
      </div>
      <span className={`text-sm ${feature.included ? 'text-zinc-200' : 'text-zinc-500'}`}>
        {feature.text}
      </span>
    </div>
  );
};
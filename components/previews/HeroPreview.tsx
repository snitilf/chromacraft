import React from 'react';
import { Palette } from '../../types';
import { ArrowRight, BarChart3, Zap } from 'lucide-react';

export const HeroPreview: React.FC<{ palette: Palette }> = ({ palette }) => {
  return (
    <div
      className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 flex flex-col h-full"
      style={{ backgroundColor: palette.background }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-black/5">
        <div className="flex items-center gap-2">
           <div className="w-6 h-6 rounded-full" style={{ backgroundColor: palette.primary }}></div>
           <span className="font-bold tracking-tight" style={{ color: palette.primary }}>ChromaCraft</span>
        </div>
        <div className="flex gap-4 text-xs font-medium opacity-60" style={{ color: palette.primary }}>
            <span>Produkty</span>
            <span>Řešení</span>
            <span>Ceny</span>
        </div>
      </div>

      {/* Hero Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-current opacity-70"
             style={{ color: palette.accent, borderColor: palette.accent, backgroundColor: `${palette.accent}15` }}>
            <Zap className="w-3 h-3 mr-1" /> Nová verze 2.0
        </div>
        
        <h2 className="text-3xl md:text-4xl font-extrabold leading-tight max-w-md" style={{ color: palette.primary }}>
          Analytika pro <span className="opacity-70">moderního tvůrce</span>.
        </h2>
        
        <p className="max-w-xs text-sm opacity-80 leading-relaxed" style={{ color: palette.primary }}>
          Získejte okamžité poznatky. Naše sofistikované nástroje vám pomohou činit lepší rozhodnutí rychleji.
        </p>

        <div className="flex gap-3 mt-2">
          <button
            className="px-5 py-2.5 rounded-lg text-sm font-semibold shadow-md transition-transform active:scale-95 flex items-center"
            style={{ backgroundColor: palette.primary, color: palette.background }}
          >
            Začít <ArrowRight className="w-4 h-4 ml-2" />
          </button>
          <button
            className="px-5 py-2.5 rounded-lg text-sm font-semibold border transition-colors hover:bg-black/5"
            style={{ borderColor: palette.secondary, color: palette.secondary }}
          >
            Živá ukázka
          </button>
        </div>
      </div>

      {/* Dashboard Mockup Placeholder */}
      <div className="px-8 mt-4 relative">
        <div
            className="w-full h-32 rounded-t-xl shadow-xl border-t border-l border-r border-white/20 relative overflow-hidden"
            style={{ backgroundColor: palette.surface }}
        >
            <div className="absolute top-0 left-0 right-0 h-8 border-b border-black/5 flex items-center px-3 gap-1.5">
                <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                <div className="w-2 h-2 rounded-full bg-slate-300"></div>
            </div>
            
            <div className="p-4 grid grid-cols-3 gap-3 mt-8">
                <div className="h-16 rounded opacity-50 flex items-center justify-center" style={{ backgroundColor: `${palette.primary}10` }}>
                    <BarChart3 className="w-6 h-6 opacity-50" style={{ color: palette.primary }}/>
                </div>
                <div className="h-16 rounded opacity-50 col-span-2 flex items-center justify-center" style={{ backgroundColor: `${palette.secondary}10` }}>
                    <div className="flex gap-2">
                         <div className="w-8 h-2 rounded-full opacity-30" style={{ backgroundColor: palette.secondary }}></div>
                         <div className="w-12 h-2 rounded-full opacity-60" style={{ backgroundColor: palette.secondary }}></div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
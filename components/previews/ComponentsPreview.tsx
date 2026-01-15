import React, { useState } from 'react';
import { Palette } from '../../types';
import { Check, Info, Settings, ToggleLeft, ToggleRight, X } from 'lucide-react';

export const ComponentsPreview: React.FC<{ palette: Palette }> = ({ palette }) => {
  const [toggle, setToggle] = useState(true);

  return (
    <div
      className="rounded-2xl shadow-lg border border-slate-200 p-8 flex flex-col justify-center space-y-8 h-full"
      style={{ backgroundColor: palette.background }}
    >
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider opacity-40 mb-4" style={{ color: palette.primary }}>Tlačítka</h4>
        <div className="flex flex-wrap gap-4">
            <button
                className="px-4 py-2 rounded-md text-sm font-medium shadow-sm active:translate-y-0.5 transition-all"
                style={{ backgroundColor: palette.primary, color: palette.background }}
            >
                Hlavní akce
            </button>
            <button
                className="px-4 py-2 rounded-md text-sm font-medium border active:translate-y-0.5 transition-all"
                style={{ borderColor: palette.primary, color: palette.primary }}
            >
                Vedlejší
            </button>
            <button
                className="px-4 py-2 rounded-md text-sm font-medium active:translate-y-0.5 transition-all opacity-80 hover:opacity-100"
                style={{ backgroundColor: palette.accent, color: '#fff' }}
            >
                Akcent
            </button>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider opacity-40 mb-4" style={{ color: palette.primary }}>Vstupy a ovládání</h4>
        <div className="flex flex-col gap-4">
            <div className="relative">
                 <input
                    type="text"
                    placeholder="Klikněte sem..."
                    className="w-full px-4 py-2.5 rounded-lg border bg-transparent text-sm outline-none transition-shadow"
                    style={{
                        borderColor: palette.secondary,
                        color: palette.primary,
                    }}
                 />
                 <span className="absolute right-3 top-2.5 opacity-50" style={{ color: palette.primary }}><Settings className="w-4 h-4"/></span>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg border border-transparent" style={{ backgroundColor: palette.surface }}>
                <span className="text-sm font-medium" style={{ color: palette.primary }}>Notifikace</span>
                <button onClick={() => setToggle(!toggle)} className="transition-colors duration-200">
                    {toggle ? (
                        <ToggleRight className="w-8 h-8" style={{ color: palette.secondary }} />
                    ) : (
                        <ToggleLeft className="w-8 h-8 opacity-40" style={{ color: palette.primary }} />
                    )}
                </button>
            </div>
        </div>
      </div>

      <div className="space-y-4">
         <h4 className="text-xs font-bold uppercase tracking-wider opacity-40 mb-4" style={{ color: palette.primary }}>Upozornění</h4>
         <div className="flex items-start gap-3 p-3 rounded-lg text-xs leading-relaxed" style={{ backgroundColor: `${palette.secondary}25`, color: palette.primary }}>
             <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: palette.secondary }} />
             <div>
                <span className="font-bold block">Úspěch</span>
                Změny byly úspěšně uloženy.
             </div>
         </div>
      </div>
    </div>
  );
};
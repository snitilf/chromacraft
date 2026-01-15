import React from 'react';
import { Palette } from '../../types';
import { Home, PieChart, User, Bell, TrendingUp } from 'lucide-react';

export const MobilePreview: React.FC<{ palette: Palette }> = ({ palette }) => {
  return (
    <div className="flex justify-center h-full items-center">
      <div
        className="w-[280px] h-[520px] rounded-[32px] border-[6px] border-slate-900 shadow-2xl overflow-hidden flex flex-col relative bg-white"
        style={{ backgroundColor: palette.background }}
      >
        {/* Notch Area */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-transparent z-20 flex justify-center">
             <div className="w-32 h-5 bg-slate-900 rounded-b-xl"></div>
        </div>

        {/* Header */}
        <div className="pt-10 px-5 pb-4 flex justify-between items-center">
             <div>
                <p className="text-xs opacity-60 font-medium" style={{ color: palette.primary }}>Dobrý den,</p>
                <h3 className="text-lg font-bold" style={{ color: palette.primary }}>Filip</h3>
             </div>
             <div className="w-8 h-8 rounded-full flex items-center justify-center relative" style={{ backgroundColor: palette.surface }}>
                <Bell className="w-4 h-4" style={{ color: palette.primary }} />
                <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full border border-white" style={{ backgroundColor: palette.accent }}></div>
             </div>
        </div>

        {/* Stats Card */}
        <div className="mx-4 p-4 rounded-2xl shadow-sm mb-6" style={{ backgroundColor: palette.primary, color: palette.background }}>
             <div className="flex justify-between items-start mb-6">
                <span className="text-xs opacity-70 bg-black/20 px-2 py-0.5 rounded">Celkový zůstatek</span>
                <TrendingUp className="w-4 h-4" style={{ color: palette.accent }} />
             </div>
             <div className="text-2xl font-bold tracking-tight">$12,450.67</div>
             <div className="text-[10px] mt-1 opacity-80">+2,4% oproti minulému měsíci</div>
        </div>

        {/* Recent Activity List */}
        <div className="flex-1 px-5 overflow-hidden">
            <h4 className="text-xs font-bold uppercase tracking-wider mb-3 opacity-50" style={{ color: palette.primary }}>Nedávné</h4>
            <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center p-3 rounded-xl hover:scale-[1.02] transition-transform duration-200 cursor-default" style={{ backgroundColor: palette.surface }}>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0" style={{ backgroundColor: `${palette.secondary}30` }}>
                             <PieChart className="w-4 h-4" style={{ color: palette.secondary }} />
                        </div>
                        <div className="flex-1">
                            <div className="text-xs font-semibold" style={{ color: palette.primary }}>Předplatné</div>
                            <div className="text-[10px] opacity-60" style={{ color: palette.primary }}>Dnes, 9:41</div>
                        </div>
                        <div className="text-xs font-bold" style={{ color: palette.primary }}>-$67.00</div>
                    </div>
                ))}
            </div>
        </div>

        {/* Bottom Nav */}
        <div className="h-16 border-t border-black/5 flex items-center justify-around px-2" style={{ backgroundColor: palette.surface }}>
             <div className="p-2 rounded-xl" style={{ backgroundColor: `${palette.primary}20` }}>
                 <Home className="w-5 h-5" style={{ color: palette.primary }} />
             </div>
             <div className="p-2 rounded-xl opacity-50">
                 <PieChart className="w-5 h-5" style={{ color: palette.primary }} />
             </div>
             <div className="p-2 rounded-xl opacity-50">
                 <User className="w-5 h-5" style={{ color: palette.primary }} />
             </div>
        </div>
      </div>
    </div>
  );
};
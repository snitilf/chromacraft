import React, { useState } from 'react';
import { Palette, DEFAULT_PALETTE } from './types';
import { ColorInput } from './components/ColorInput';
import { AIInput } from './components/AIInput';
import { HeroPreview } from './components/previews/HeroPreview';
import { MobilePreview } from './components/previews/MobilePreview';
import { ComponentsPreview } from './components/previews/ComponentsPreview';
import { ExportPanel } from './components/ExportPanel';
import { Palette as PaletteIcon, Sliders } from 'lucide-react';

const App: React.FC = () => {
  const [palette, setPalette] = useState<Palette>(DEFAULT_PALETTE);

  const updateColor = (key: keyof Palette, value: string) => {
    setPalette((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-slate-200">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-slate-900 p-1.5 rounded-lg">
                <PaletteIcon className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-slate-800">Chroma <span className="font-light text-slate-500">Sophisticate</span></h1>
          </div>
          <a href="https://github.com/google-gemini" target="_blank" rel="noreferrer" className="text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors">
            Powered by Gemini
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        
        {/* Controls Section */}
        <section className="grid lg:grid-cols-12 gap-12">
           
           {/* Left: Inputs */}
           <div className="lg:col-span-4 space-y-8">
              
              <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                      <Sliders className="w-4 h-4 text-indigo-500" />
                      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">Palette Configuration</h2>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
                    <ColorInput 
                        label="Primary" 
                        value={palette.primary} 
                        onChange={(v) => updateColor('primary', v)} 
                        description="Main brand color, headings"
                    />
                    <ColorInput 
                        label="Secondary" 
                        value={palette.secondary} 
                        onChange={(v) => updateColor('secondary', v)} 
                        description="Supporting elements, borders"
                    />
                    <ColorInput 
                        label="Accent" 
                        value={palette.accent} 
                        onChange={(v) => updateColor('accent', v)} 
                        description="Call-to-actions, highlights"
                    />
                     <div className="h-px bg-slate-100 my-4" />
                    <ColorInput 
                        label="Background" 
                        value={palette.background} 
                        onChange={(v) => updateColor('background', v)} 
                        description="Main page background"
                    />
                    <ColorInput 
                        label="Surface" 
                        value={palette.surface} 
                        onChange={(v) => updateColor('surface', v)} 
                        description="Cards, panels, containers"
                    />
                  </div>
              </div>

              <div className="space-y-4">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                      AI Generator
                  </h2>
                  <AIInput onPaletteGenerated={setPalette} />
                  <p className="text-xs text-slate-400 leading-relaxed px-1">
                      Ask for "A misty morning in Kyoto" or "Corporate fintech dark mode". Gemini generates a harmonious 5-color palette instantly.
                  </p>
              </div>

           </div>

           {/* Right: Previews */}
           <div className="lg:col-span-8 space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">Live Contextual Previews</h2>
                    <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-mono text-slate-500">Real-time Rendering</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[600px]">
                    {/* Preview 1: SaaS (Large, spans 2 cols on mobile if needed, but here we fit nicely) */}
                    <div className="md:col-span-2 h-[320px]">
                        <HeroPreview palette={palette} />
                    </div>
                    
                    {/* Preview 2: Mobile */}
                    <div className="md:col-span-1 h-[260px] md:h-auto">
                         <div className="h-full bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center p-4 overflow-hidden relative">
                            {/* Pattern Background for contrast */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                            <div className="scale-[0.85] origin-center">
                                <MobilePreview palette={palette} />
                            </div>
                         </div>
                    </div>

                    {/* Preview 3: Components */}
                    <div className="md:col-span-1 h-[260px] md:h-auto">
                        <ComponentsPreview palette={palette} />
                    </div>
                </div>
           </div>

        </section>

        {/* Export Section */}
        <section>
            <ExportPanel palette={palette} />
        </section>

      </main>
    </div>
  );
};

export default App;
import React, { useState } from 'react';
import { Palette } from '../types';
import { Copy, Check } from 'lucide-react';

export const ExportPanel: React.FC<{ palette: Palette }> = ({ palette }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const tailwindConfig = `
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '${palette.primary}',
        secondary: '${palette.secondary}',
        accent: '${palette.accent}',
        background: '${palette.background}',
        surface: '${palette.surface}',
      }
    }
  }
}`;

  const cssVariables = `
:root {
  --color-primary: ${palette.primary};
  --color-secondary: ${palette.secondary};
  --color-accent: ${palette.accent};
  --color-background: ${palette.background};
  --color-surface: ${palette.surface};
}`;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text.trim());
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="bg-slate-900 text-slate-300 rounded-2xl overflow-hidden shadow-2xl mt-12 mb-20">
      <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
         <h3 className="font-semibold text-white">Export Configuration</h3>
         <span className="text-xs font-mono opacity-50">Generated Code</span>
      </div>
      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
        
        {/* Tailwind */}
        <div className="p-6 relative group">
            <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Tailwind Config</span>
                <button
                    onClick={() => copyToClipboard(tailwindConfig, 'tailwind')}
                    className="p-1.5 rounded-md hover:bg-white/10 transition-colors text-white"
                >
                    {copied === 'tailwind' ? <Check className="w-4 h-4 text-green-400"/> : <Copy className="w-4 h-4"/>}
                </button>
            </div>
            <pre className="font-mono text-xs overflow-x-auto p-4 bg-black/30 rounded-lg text-slate-400">
                {tailwindConfig.trim()}
            </pre>
        </div>

        {/* CSS Vars */}
        <div className="p-6 relative group">
             <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-pink-400">CSS Variables</span>
                <button
                    onClick={() => copyToClipboard(cssVariables, 'css')}
                    className="p-1.5 rounded-md hover:bg-white/10 transition-colors text-white"
                >
                    {copied === 'css' ? <Check className="w-4 h-4 text-green-400"/> : <Copy className="w-4 h-4"/>}
                </button>
            </div>
             <pre className="font-mono text-xs overflow-x-auto p-4 bg-black/30 rounded-lg text-slate-400">
                {cssVariables.trim()}
            </pre>
        </div>
      </div>
    </div>
  );
};
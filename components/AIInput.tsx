import React, { useState } from 'react';
import { generatePalette } from '../services/gemini';
import { Palette } from '../types';
import { Sparkles, Loader2 } from 'lucide-react';

interface AIInputProps {
  onPaletteGenerated: (palette: Palette) => void;
}

export const AIInput: React.FC<AIInputProps> = ({ onPaletteGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const palette = await generatePalette(prompt);
      onPaletteGenerated(palette);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="relative group w-full">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl opacity-30 group-hover:opacity-100 transition duration-500 blur"></div>
      <div className="relative flex items-center bg-white rounded-xl shadow-sm p-1 w-full">
        <div className="pl-4 text-slate-400 flex-shrink-0">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
        </div>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe a vibe (e.g., 'Scandinavian forest morning' or 'Cyberpunk neon')"
          className="flex-1 p-3 bg-transparent border-none outline-none text-slate-700 placeholder-slate-400 text-sm min-w-0"
          disabled={loading}
        />
        <button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </div>
    </div>
  );
};
import React from 'react';

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  description: string;
}

export const ColorInput: React.FC<ColorInputProps> = ({ label, value, onChange, description }) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex justify-between items-end">
        <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider text-xs">
          {label}
        </label>
        <span className="text-xs text-slate-400">{description}</span>
      </div>
      <div className="flex items-center space-x-3 bg-white p-2 rounded-lg border border-slate-200 shadow-sm focus-within:ring-2 focus-within:ring-slate-400 transition-all">
        <div className="relative w-10 h-10 flex-shrink-0">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div
            className="w-full h-full rounded-md shadow-inner border border-black/10"
            style={{ backgroundColor: value }}
          />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 font-mono text-sm text-slate-600 bg-transparent outline-none uppercase"
          maxLength={7}
        />
      </div>
    </div>
  );
};
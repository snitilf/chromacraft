export interface Palette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
}

export const DEFAULT_PALETTE: Palette = {
  primary: '#64748B',   // Muted Slate Blue
  secondary: '#8CAE9E', // Sage Green
  accent: '#C27A58',    // Clay/Rust
  background: '#F5F5F0', // Oatmeal
  surface: '#E2E8F0',   // Light Grey Surface
};

export interface GeneratePaletteResponse {
  palette: Palette;
}
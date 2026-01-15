export interface Palette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
}

export const DEFAULT_PALETTE: Palette = {
  primary: '#5F7F8E',
  secondary: '#A0A5B5',
  accent: '#B8A183',
  background: '#F2F5F8',
  surface: '#FFFFFF',
};

export interface GeneratePaletteResponse {
  palette: Palette;
}
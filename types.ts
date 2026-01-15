export interface Palette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
}

export const DEFAULT_PALETTE: Palette = {
  primary: '#36454F',
  secondary: '#2C3E50',
  accent: '#463EBA',
  background: '#F6F9FC',
  surface: '#FFFFFF',
};

export interface GeneratePaletteResponse {
  palette: Palette;
}
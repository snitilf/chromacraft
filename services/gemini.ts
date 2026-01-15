import { GoogleGenAI, Type } from "@google/genai";
import { Palette, DEFAULT_PALETTE } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generatePalette = async (description: string): Promise<Palette> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a sophisticated UI color palette based on this description: "${description}".
      The palette must be harmonious and suitable for modern web design.
      - Primary: Main brand color.
      - Secondary: Supporting color.
      - Accent: For highlights/CTAs.
      - Background: Main page background (usually very light or very dark).
      - Surface: Card/Container background (contrast against background).
      Return strictly JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            primary: { type: Type.STRING, description: "Hex code for primary color" },
            secondary: { type: Type.STRING, description: "Hex code for secondary color" },
            accent: { type: Type.STRING, description: "Hex code for accent color" },
            background: { type: Type.STRING, description: "Hex code for background color" },
            surface: { type: Type.STRING, description: "Hex code for surface color" },
          },
          required: ["primary", "secondary", "accent", "background", "surface"],
        },
      },
    });

    const jsonText = response.text;
    if (!jsonText) {
        throw new Error("No response from AI");
    }
    
    const data = JSON.parse(jsonText) as Palette;
    return data;
  } catch (error) {
    console.error("Failed to generate palette:", error);
    // Return default if failure
    return DEFAULT_PALETTE;
  }
};
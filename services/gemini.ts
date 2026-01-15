import { GoogleGenerativeAI } from "@google/generative-ai";
import { Palette, DEFAULT_PALETTE } from "../types";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY || "");

export const generatePalette = async (description: string): Promise<Palette> => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            primary: { type: "string", description: "Hex code for primary color" },
            secondary: { type: "string", description: "Hex code for secondary color" },
            accent: { type: "string", description: "Hex code for accent color" },
            background: { type: "string", description: "Hex code for background color" },
            surface: { type: "string", description: "Hex code for surface color" },
          },
          required: ["primary", "secondary", "accent", "background", "surface"],
        },
      },
    });

    const prompt = `Generate a sophisticated UI color palette based on this description: "${description}".
      The palette must be harmonious and suitable for modern web design.
      - Primary: Main brand color.
      - Secondary: Supporting color.
      - Accent: For highlights/CTAs.
      - Background: Main page background (usually very light or very dark).
      - Surface: Card/Container background (contrast against background).
      Return strictly JSON.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const jsonText = response.text();
    
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
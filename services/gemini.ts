import { GoogleGenerativeAI } from "@google/generative-ai";
import { Palette } from "../types";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY || "");

export const generatePalette = async (description: string): Promise<Palette> => {
  // Check if API key is set
  const apiKey = import.meta.env.VITE_API_KEY;
  if (!apiKey || apiKey.trim() === "") {
    const isProduction = import.meta.env.PROD;
    const errorMessage = isProduction
      ? "API key not found. Please set VITE_API_KEY in your Vercel project settings (Settings > Environment Variables)."
      : "API key not found. Please set VITE_API_KEY in your .env file and restart the dev server.";
    throw new Error(errorMessage);
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
    });

    const prompt = `Generate a sophisticated UI color palette based on this description: "${description}".
      The palette must be harmonious and suitable for modern web design.
      - Primary: Main brand color (hex code).
      - Secondary: Supporting color (hex code).
      - Accent: For highlights/CTAs (hex code).
      - Background: Main page background, usually very light or very dark (hex code).
      - Surface: Card/Container background that contrasts with background (hex code).
      
      Return ONLY a valid JSON object with these exact keys: primary, secondary, accent, background, surface.
      Each value must be a hex color code starting with # (e.g., "#FF5733").
      Do not include any text before or after the JSON object.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    let jsonText = response.text();
    
    if (!jsonText) {
        throw new Error("No response from AI");
    }
    
    // Clean up the response - remove markdown code blocks if present
    jsonText = jsonText.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }
    jsonText = jsonText.trim();
    
    const data = JSON.parse(jsonText) as Palette;
    
    // Validate that all required fields are present and are valid hex colors
    const requiredKeys: (keyof Palette)[] = ["primary", "secondary", "accent", "background", "surface"];
    for (const key of requiredKeys) {
      if (!data[key] || typeof data[key] !== 'string') {
        throw new Error(`Invalid or missing color for ${key}: ${data[key]}`);
      }
      // Normalize hex color (add # if missing, uppercase)
      const color = data[key].toString().trim();
      if (!color.startsWith('#')) {
        data[key] = '#' + color;
      } else {
        data[key] = color;
      }
      // Validate hex format (allow 3 or 6 digit hex)
      if (!/^#[0-9A-Fa-f]{3}$|^#[0-9A-Fa-f]{6}$/.test(data[key])) {
        throw new Error(`Invalid hex color format for ${key}: ${data[key]}`);
      }
    }
    
    return data;
  } catch (error) {
    console.error("Failed to generate palette:", error);
    // Re-throw error so UI can handle it
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Unknown error occurred while generating palette");
  }
};
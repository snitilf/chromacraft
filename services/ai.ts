import { Palette } from "../types";

export const generatePalette = async (description: string): Promise<Palette> => {
  if (!description || description.trim() === "") {
    throw new Error("Description is required");
  }

  try {
    // Call our serverless API endpoint instead of calling Gemini directly
    // In production, use relative path. In dev, assume Vercel CLI is running on port 3000
    const apiUrl = import.meta.env.PROD 
      ? "/api/generate-palette"
      : import.meta.env.VITE_API_URL || "http://localhost:3000/api/generate-palette";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json() as Palette;
    
    // Validate that all required fields are present
    const requiredKeys: (keyof Palette)[] = ["primary", "secondary", "accent", "background", "surface"];
    for (const key of requiredKeys) {
      if (!data[key] || typeof data[key] !== 'string') {
        throw new Error(`Invalid or missing color for ${key}`);
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
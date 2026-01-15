import { GoogleGenerativeAI } from "@google/generative-ai";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { description } = req.body;

  if (!description || typeof description !== "string") {
    return res.status(400).json({ error: "Description is required" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ 
      error: "API key not configured. Please set GEMINI_API_KEY in Vercel environment variables." 
    });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
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
      return res.status(500).json({ error: "No response from AI" });
    }
    
    // Clean up the response - remove markdown code blocks if present
    jsonText = jsonText.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }
    jsonText = jsonText.trim();
    
    const data = JSON.parse(jsonText);
    
    // Validate that all required fields are present and are valid hex colors
    const requiredKeys = ["primary", "secondary", "accent", "background", "surface"];
    for (const key of requiredKeys) {
      if (!data[key] || typeof data[key] !== 'string') {
        return res.status(500).json({ error: `Invalid or missing color for ${key}` });
      }
      // Normalize hex color (add # if missing)
      const color = data[key].toString().trim();
      if (!color.startsWith('#')) {
        data[key] = '#' + color;
      } else {
        data[key] = color;
      }
      // Validate hex format (allow 3 or 6 digit hex)
      if (!/^#[0-9A-Fa-f]{3}$|^#[0-9A-Fa-f]{6}$/.test(data[key])) {
        return res.status(500).json({ error: `Invalid hex color format for ${key}` });
      }
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error("Failed to generate palette:", error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    });
  }
}

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

    const prompt = `You are a color science expert. Generate a high-conversion UI color palette based on this description: "${description}".

RESEARCH-BACKED RULES YOU MUST FOLLOW:

1. THE 50ms VISCERAL GATE (Lindgaard 2006):
   - Users judge visual appeal in 50 milliseconds
   - Ensure minimum 4.5:1 contrast ratio between text colors and backgrounds (WCAG AA)
   - Avoid chromostereopsis (visual vibration from poor color combinations like red on blue)

2. THE 60-30-10 RULE:
   - Background (60%): Should be neutral, low saturation. For light mode: luminosity >90% (e.g., #F6F9FC). For dark mode: luminosity <15%, use #121212 NOT pure black #000000 (prevents OLED smearing)
   - Secondary (30%): Brand identity color for headers, sidebars, cards
   - Accent (10%): High-contrast CTA color, used sparingly

3. THE ISOLATION EFFECT (Von Restorff):
   - The Accent color MUST be complementary (180° opposite on color wheel) to the Secondary color
   - This creates maximum visual saliency for CTAs
   - Example: If Secondary is Blue (220°), Accent should be Orange (40°)

4. CATEGORY-SPECIFIC OPTIMIZATION:
   Detect the context from the description and apply these rules:
   
   A) FINTECH/BUSINESS/CORPORATE/PROFESSIONAL:
      - Secondary MUST be in Blue/Navy hue range (200°-240°)
      - Use desaturated "Slate" tones for sophistication
      - NEVER use Red for Accent (Red = debt/error in finance). Use Electric Violet or Vibrant Green instead
      - Reference: Stripe uses #0A2540 (Deep Navy) + #635BFF (Electric Violet)
   
   B) LUXURY/MINIMALIST/HIGH-END/FASHION:
      - Cap saturation at 30% for all non-accent colors
      - Use warm neutrals: Bone/Ivory (#F2EFEA) instead of pure white
      - Use Rich Black (#0D0D0D) instead of pure black
      - Accent should be Muted Gold (#A57A03) or similar metallic tone
      - Prefer "Tones" (hue+grey) over "Tints" (hue+white)
   
   C) MODERN/GROWTH/STARTUP/TECH/SAAS:
      - Use vibrant, energetic colors
      - Pair cool Secondary (Teal/Blue) with warm Accent (Coral/Orange) for maximum conversion
      - Reference: Coral Orange (#FF7F50) on Teal (#00A9E0) = 21% conversion lift in A/B tests
   
   D) MASCULINE/DEVELOPER/CRYPTO:
      - Exclude Purple and Pink hues entirely
      - Prefer Shades (hue+black) over Tints (hue+white)
      - Use dark mode by default (#121212 background)

5. ACCESSIBILITY:
   - Primary text color must achieve 4.5:1 contrast with Background
   - Use Charcoal (#36454F) instead of pure Black for text on light backgrounds (reduces eye strain)

OUTPUT FORMAT:
Return ONLY a valid JSON object with these exact keys: primary, secondary, accent, background, surface.
Each value must be a hex color code starting with # (e.g., "#FF5733").
Do not include any text before or after the JSON object.

The colors must work together as a cohesive system optimized for both aesthetics AND conversion.`;

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

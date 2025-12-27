'use server';

import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.GOOGLE_API_KEY || process.env.API_KEY || process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error("API_KEY is missing in server environment");
    return null;
  }

  return new GoogleGenAI({ apiKey });
};

export const verifyHumanityWithWit = async (success: boolean, delta: number): Promise<string> => {
  const client = getClient();
  if (!client) return success ? "Verified. (API Key Missing)" : "Failed. (API Key Missing)";

  try {
    const prompt = success 
      ? `The user successfully solved a pixel-art screw captcha. They were off by only ${delta.toFixed(1)} degrees. Write a very short, funny, retro-futuristic "Access Granted" message (max 10 words). Tone: Cyberpunk or 8-bit RPG.`
      : `The user failed a pixel-art screw captcha. They were off by ${delta.toFixed(1)} degrees. Write a very short, sarcastic, retro-futuristic "Access Denied" message (max 10 words). Tone: Cyberpunk or 8-bit RPG helper bot.`;

    const result = await client.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
    
    return text || (success ? "ACCESS GRANTED" : "ACCESS DENIED");
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback simple messages
    return success ? "ACCESS GRANTED" : "ACCESS DENIED";
  }
};

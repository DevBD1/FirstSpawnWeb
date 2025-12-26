import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const verifyHumanityWithWit = async (success: boolean, delta: number): Promise<string> => {
  const ai = getClient();
  if (!ai) return success ? "Verified. (API Key Missing)" : "Failed. (API Key Missing)";

  const model = "gemini-3-flash-preview";
  
  const prompt = success 
    ? `The user successfully solved a pixel-art screw captcha. They were off by only ${delta.toFixed(1)} degrees. Write a very short, funny, retro-futuristic "Access Granted" message (max 10 words). Tone: Cyberpunk or 8-bit RPG.`
    : `The user failed a pixel-art screw captcha. They were off by ${delta.toFixed(1)} degrees. Write a very short, sarcastic, retro-futuristic "Access Denied" message (max 10 words). Tone: Cyberpunk or 8-bit RPG helper bot.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text || (success ? "ACCESS GRANTED" : "ACCESS DENIED");
  } catch (error) {
    console.error("Gemini API Error:", error);
    return success ? "ACCESS GRANTED" : "ACCESS DENIED";
  }
};


import { GoogleGenAI } from "@google/genai";
import { Server } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIAssistantResponse = async (query: string, availableServers: Server[]) => {
  const context = `
    You are the "FirstSpawn Assistant", a pro gamer who knows everything about Minecraft and Hytale.
    The user is looking for a server. Based on our verified server list, suggest the best one.
    Only suggest servers that exist in the provided list. 
    Be concise, use gamer slang where appropriate, but remain professional about data accuracy.
    
    Servers List:
    ${JSON.stringify(availableServers.map(s => ({ 
      name: s.name, 
      game: s.game, 
      tags: s.tags, 
      description: s.description, 
      perf: s.performanceScore 
    })))}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Context: ${context}\n\nUser Query: ${query}`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The server beacon is flickering... I couldn't process that query. Try again, nomad.";
  }
};

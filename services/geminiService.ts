import { GoogleGenAI } from "@google/genai";

/**
 * Service to fetch professional mobility insights using Gemini.
 * Follows strict Google GenAI SDK guidelines for initialization and content generation.
 */
export const getMobilityInsights = async (region: string) => {
  // Use a fallback to prevent "undefined" error during instantiation if key is missing
  const apiKey = (typeof process !== 'undefined' && process.env?.API_KEY) || "";
  
  if (!apiKey) {
    console.warn("Gemini API key is missing. live insights are disabled.");
    return "Insights currently unavailable.";
  }

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide 3 short, professional insights about cross-border recruitment and talent mobility for the ${region} region. Focus on industries like construction, welding, and high-skilled manual labor. Return as a short bulleted list.`,
      config: {
        temperature: 0.7,
      },
    });

    return response.text || "No insights found.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Unable to fetch live insights. Please try again later.";
  }
};
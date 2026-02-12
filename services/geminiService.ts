
import { GoogleGenAI } from "@google/genai";

export const getAgriTutorResponse = async (userPrompt: string, context?: string) => {
  // Always initialize GoogleGenAI inside the request handler to ensure it uses the latest process.env.API_KEY.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      // Upgraded to gemini-3-pro-preview for advanced STEM reasoning in hydroponics education.
      model: "gemini-3-pro-preview",
      contents: `Kamu adalah pakar pertanian hidroponik modern yang ramah dan edukatif. 
      Tugasmu adalah menjawab pertanyaan siswa tentang hidroponik, sistem pengairan cerdas, dan teknologi pertanian terbaru.
      
      Konteks pelajaran saat ini: ${context || 'Umum'}
      Pertanyaan Siswa: ${userPrompt}`,
      config: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      }
    });

    // Directly access .text property as per GenerateContentResponse guidelines.
    return response.text || "Maaf, saya tidak bisa memproses jawaban saat ini.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Maaf, saya sedang mengalami gangguan teknis. Mari kita coba lagi nanti.";
  }
};

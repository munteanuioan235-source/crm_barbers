
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateMarketingMessage = async (customerName: string, lastVisit: string | undefined) => {
  try {
    const prompt = `Ești un asistent de marketing pentru o frizerie de lux numită "BarberPro". 
    Creează un mesaj personalizat de SMS/WhatsApp pentru clientul ${customerName}. 
    Ultima lui vizită a fost pe data de ${lastVisit || 'necunoscută'}. 
    Dacă a trecut mult timp (peste o lună), oferă-i o reducere de 10% la următorul tuns. 
    Mesajul trebuie să fie prietenos, modern și în limba română. Limitează-te la maximum 160 de caractere.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Nu am putut genera mesajul.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Eroare la generarea mesajului AI.";
  }
};

export const getBusinessAdvice = async (stats: any) => {
  try {
    const prompt = `Analizează următoarele statistici ale frizeriei și oferă 3 sfaturi scurte pentru creșterea profitului:
    Venit total: ${stats.totalRevenue} RON
    Clienți activi: ${stats.activeCustomers}
    Valoare medie bon: ${stats.avgOrderValue} RON
    Răspunde în limba română sub formă de listă scurtă.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Nu am sfaturi momentan.";
  } catch (error) {
    return "Eroare la analiza datelor.";
  }
};

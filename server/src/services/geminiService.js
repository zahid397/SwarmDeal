import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  async detectDealIntent(message) {
    const prompt = `Analyze: "${message}". Return JSON ONLY: {"intent": "find_deal"|"chat", "productCategory": "string", "shouldCreateDeal": boolean, "price": number, "productName": "string"}`;
    try {
      const result = await this.model.generateContent(prompt);
      const text = result.response.text().replace(/```json|```/g, '').trim();
      return JSON.parse(text);
    } catch {
      return { intent: 'chat', shouldCreateDeal: false };
    }
  }

  async generateResponse(message) {
    try {
      const result = await this.model.generateContent(message);
      return result.response.text();
    } catch {
      return "AI Brain currently unavailable.";
    }
  }
}
export default new GeminiService();

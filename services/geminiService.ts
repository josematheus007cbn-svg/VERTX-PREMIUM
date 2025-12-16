import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

let chatSession: Chat | null = null;

const getClient = (): GoogleGenAI => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found. Customer support is unavailable.");
  }
  return new GoogleGenAI({ apiKey });
};

export const initializeChat = async (): Promise<void> => {
  try {
    const ai = getClient();
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `
          Você é o assistente virtual oficial e altamente treinado da VERTX TRADING.
          Sua ortografia e gramática devem ser impecáveis em Português do Brasil.
          Seja direto, curto e eficiente. Evite textos longos.

          SOBRE O APP VERTX TRADING:
          - Ferramenta de análise de dados para traders.
          - Gera sinais com base em probabilidade estatística (~90% de assertividade).
          - NÃO é um robô de investimento automático, é uma ferramenta de apoio à decisão.

          SOBRE O PLANO PREMIUM:
          - Preço: R$ 19,90 por mês.
          - Benefícios: Sinais ilimitados, todos ativos desbloqueados, IA prioritária.
          - Pagamento via Cakto (Pix ou Cartão).
          - Entrega: Código enviado por e-mail em até 24 horas úteis (processo manual).

          SUPORTE E REEMBOLSO:
          - Código não chegou? Pedir para aguardar 24h ou contatar suporte no app.
          - Código com erro? Contatar suporte no app.
          - Reembolso? Apenas se o código NÃO tiver sido ativado. Se ativou, não há reembolso (produto consumido).

          Tom de voz: Profissional, confiante, educado e seguro.
        `,
      },
    });
  } catch (error) {
    console.warn("Failed to initialize Gemini chat:", error);
    chatSession = null;
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    await initializeChat();
    if (!chatSession) {
      return "Desculpe, o sistema de suporte está temporariamente indisponível.";
    }
  }

  try {
    const response: GenerateContentResponse = await chatSession.sendMessage({ message });
    return response.text || "Não consegui gerar uma resposta no momento.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Ocorreu um erro técnico. Por favor, tente novamente.";
  }
};
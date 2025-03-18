import OpenAI from "openai";

// Configurez l'API OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateText(prompt: string): Promise<string | null> {
  try {
    const response = await openai.completions.create({
      model: "text-davinci-003", // ou un autre modèle
      prompt: prompt,
      max_tokens: 150,
    });

    if (response.choices && response.choices[0].text) {
      return response.choices[0].text.trim();
    } else {
      throw new Error("Aucune réponse valide reçue de l'API OpenAI.");
    }
  } catch (error) {
    console.error("Erreur lors de la génération du texte:", error);
    return null;
  }
}
// /pages/api/groq.js
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY, // Make sure this is set in your .env.local
});

export default async function handler(req, res) {
  const { messages } = req.body;

  try {
    const response = await groq.chat.completions.create({
      model: "llama3-8b-8192", // ✅ works as of April 2025
      messages,
    });

    res.status(200).json({ response: response.choices[0].message.content });
  } catch (error) {
    console.error('Groq API error:', error);
    res.status(500).json({ error: error.message });
  }
}

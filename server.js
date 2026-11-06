import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

const PORT = process.env.PORT || 3000;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

app.get("/", (req, res) => {
  res.send("ABUBAKAR AI TECHNOLOGY SERVER IS RUNNING");
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    company: "ABUBAKAR AI TECHNOLOGY",
    engine: "Google Gemini"
  });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message, language } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Please enter a message."
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "Gemini API key is not configured."
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
      config: {
        systemInstruction:
          `You are Abubakar AI, the official AI assistant of ABUBAKAR AI TECHNOLOGY. Respond helpfully and professionally. Use ${language || "English"} when appropriate.`
      }
    });

    res.json({
      reply: response.text || "No response generated."
    });

  } catch (error) {
    console.error("Gemini error:", error.message);

    res.status(500).json({
      error: "AI service is temporarily unavailable."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Abubakar AI server running on port ${PORT}`);
});

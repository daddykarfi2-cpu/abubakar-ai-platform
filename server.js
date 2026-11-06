
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json({ limit: "1mb" }));

// Serve the website from the root directory
app.use(express.static(path.join(__dirname, "public")));
// Gemini AI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    company: "ABUBAKAR AI TECHNOLOGY",
    engine: "Google Gemini"
  });
});

// AI Chat
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
        error: "Gemini API key is missing."
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
      config: {
        systemInstruction:
          `You are Abubakar AI, the assistant of ABUBAKAR AI TECHNOLOGY. Reply helpfully in ${language || "English"}.`
      }
    });

    res.json({
      reply: response.text
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Gemini AI service failed."
    });
  }
});

app.listen(PORT, () => {
  console.log("ABUBAKAR AI TECHNOLOGY is running on port " + PORT);
});

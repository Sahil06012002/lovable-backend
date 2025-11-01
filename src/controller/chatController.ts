import { type Request, type Response } from "express";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export const chatHandler = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const result = await generateText({
      model: google("gemini-2.5-flash"),
      prompt,
    });

    return res.json({ answer: result.text });
  } catch (error: any) {
    console.error("Chat error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

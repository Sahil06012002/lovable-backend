import { type Request, type Response } from "express";
import { handleInitialPrompt } from "../service/chatService.js";

export const projectInitHandler = async (req: Request, res: Response) => {
  const { userId, message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "message is required" });
  }
  try {
    const { answer, hostUrl } = await handleInitialPrompt(userId, message);
    if (answer && hostUrl) {
      return res.json({ answer, hostUrl });
    } else {
      return res.status(500).json({
        message: "Error while generating response",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: `Internal server error ${error}`,
    });
  }
};

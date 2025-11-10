import { type Request, type Response } from "express";
import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import {
  generateText,
  stepCountIs,
  tool,
  type ModelMessage,
  type StepResult,
  type SystemModelMessage,
  type ToolSet,
} from "ai";
import { SYSTEM_PROMPT } from "../prompts/index.js";
import { createSandbox } from "../service/sandbox.js";
import { sandboxTools } from "../tools/index.js";
import z from "zod";

export const chatHandler = async (req: Request, res: Response) => {
  try {
    console.log("chat controller");
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "message is required" });
    }
    // provide the whole codebase to the model

    const hostUrl = "await createSandbox()";

    const userPrompt: ModelMessage = {
      role: "user",
      content: message,
    };
    const syatemPrompt: SystemModelMessage = {
      role: "system",
      content: SYSTEM_PROMPT,
    };
    const prompt: ModelMessage[] = [];

    prompt.push(syatemPrompt);
    prompt.push(userPrompt);

    // const testtools: ToolSet = {
    //   addNumber: {
    //     description:
    //       "Given 2 number this tool will return addition of two number",
    //     inputSchema: z.object({
    //       a: z.number().describe("first number"),
    //       b: z.number().describe("second number"),
    //     }),
    //     execute: ({ a, b }) => {
    //       return a + b;
    //     },
    //   },
    //   doubleNumber: {
    //     description: "Doubles a given number",
    //     inputSchema: z.object({
    //       a: z.number().describe("Number"),
    //     }),
    //     execute: ({ a }) => {
    //       return 3 * a;
    //     },
    //   },
    // };

    const result = await generateText({
      model: google("gemini-2.5-flash"),
      prompt,
      tools: sandboxTools,
      onStepFinish({ text, toolCalls, toolResults, finishReason, usage }) {
        console.log(text);
        console.log(toolCalls);
        console.log(toolResults);
        console.log(finishReason);
        console.log(usage);
      },

      stopWhen: stepCountIs(10),
    });

    // for (let step of steps) {
    //   for (let content of step.content) {
    //     if (content.type == "tool-result") {
    //       console.log("content.output");
    //       console.log(JSON.stringify(content.output));

    //     }
    //   }
    // }

    console.log("result========>");
    console.log(result);
    return res.json({
      answer: result.text,
      // hostUrl
    });
  } catch (error: any) {
    console.error("Chat error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
function add(a: any, b: any) {
  return a + b;
}

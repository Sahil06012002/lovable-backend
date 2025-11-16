import {
  generateText,
  stepCountIs,
  type ModelMessage,
  type SystemModelMessage,
} from "ai";
import { createSandbox } from "./sandbox.js";
import { SYSTEM_PROMPT } from "../prompts/index.js";
// import { google } from "@ai-sdk/google";
import { sandboxTools } from "../tools/index.js";
import { openai } from "@ai-sdk/openai";

export async function handleInitialPrompt(userId: string, message: string) {
  try {
    console.log("chat controller");

    const { hostUrl, sandboxId } = await createSandbox();

    const userPrompt: ModelMessage = {
      role: "user",
      content: `${message} , heres is the sandboxId which can be used for tool calling : ${sandboxId}`,
    };
    const syatemPrompt: SystemModelMessage = {
      role: "system",
      content: SYSTEM_PROMPT,
    };
    const prompt: ModelMessage[] = [];

    prompt.push(syatemPrompt);
    prompt.push(userPrompt);

    const result = await generateText({
      model: openai("gpt-5"),
      prompt,
      tools: sandboxTools,
      stopWhen: stepCountIs(30),
    });

    console.log("result========>");
    console.log(result);
    return {
      answer: result.text,
      hostUrl: hostUrl,
    };
  } catch (error: any) {
    console.error("Chat error:", error.message);
    throw error;
  }
}

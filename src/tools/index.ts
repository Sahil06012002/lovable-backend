import { Sandbox } from "@e2b/code-interpreter";
import type { ToolSet } from "ai";
import { z } from "zod";


async function createFile(sandboxId: string, relativePath: string, fileContent: string) {
  const sb = await Sandbox.connect(sandboxId);
  const result = await sb.files.write(relativePath, fileContent);
  return result;
}

async function readFile(sandboxId: string, relativePath: string) {
  const sb = await Sandbox.connect(sandboxId);
  const fileContent = await sb.files.read(relativePath);
  return fileContent;
}

async function updateFile(sandboxId: string, relativePath: string, newContent: string) {
  const sb = await Sandbox.connect(sandboxId);
  const result = await sb.files.write(relativePath, newContent);
  return result;
}



async function runCommand(sandboxId: string, command: string) {
  const sb = await Sandbox.connect(sandboxId);
  const result = await sb.commands.run(command);
  return result;
}

//Sandbox ToolSet 

export const sandboxTools: ToolSet = {
  createFile: {
    description: "Create a new file in a sandbox",
    inputSchema: z.object({
      sandboxId: z.string().describe("Sandbox ID in which to create the file"),
      relativePath: z.string().describe("Relative path of the new file"),
      fileContent: z.string().describe("Content of the new file"),
    }),
    execute: async ({ sandboxId, relativePath, fileContent }) => {
      return await createFile(sandboxId, relativePath, fileContent);
    },
  },

  readFile: {
    description: "Read a file's content from a sandbox",
    inputSchema: z.object({
      sandboxId: z.string().describe("Sandbox ID in which the file exists"),
      relativePath: z.string().describe("Relative path of the file to read"),
    }),
    execute: async ({ sandboxId, relativePath }) => {
      return await readFile(sandboxId, relativePath);
    },
  },

  updateFile: {
    description: "Update the contents of an existing file in a sandbox",
    inputSchema: z.object({
      sandboxId: z.string().describe("Sandbox ID in which the file exists"),
      relativePath: z.string().describe("Relative path of the file to update"),
      newContent: z.string().describe("New content to replace the existing file"),
    }),
    execute: async ({ sandboxId, relativePath, newContent }) => {
      return await updateFile(sandboxId, relativePath, newContent);
    },
  },

  runCommand: {
    description: "Run a shell command inside the sandbox",
    inputSchema: z.object({
      sandboxId: z.string().describe("Sandbox ID where the command should run"),
      command: z.string().describe("The shell command to execute"),
    }),
    execute: async ({ sandboxId, command }) => {
      return await runCommand(sandboxId, command);
    },
  },
};


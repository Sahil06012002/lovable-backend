import { Sandbox } from "@e2b/code-interpreter";
import { z } from "zod";


async function createFile(sandboxId, relativePath, fileContent) {
  const sb = await Sandbox.connect(sandboxId);
  const result = await sb.files.write(relativePath, fileContent);
  return result;
}


createFile
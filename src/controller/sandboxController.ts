import{ Sandbox } from "@e2b/code-interpreter";
import { createSandbox } from "../service/sandbox.js";

export const sandboxHandler = async (req: Request, res: Response) => {
  try {
    const body : any = req.body;
    const userId = body.id
    const sandboxId : string   = await createSandbox()

    return sandboxId

  }catch(error){

  }
}
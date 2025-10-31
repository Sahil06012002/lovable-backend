import express from "express"
import dotenv from "dotenv"

dotenv.config()

import {openai} from "@ai-sdk/openai"
import {streamText, type ModelMessage} from "ai"

const app = express()

app.use(express.json())

app.get("/",(req,res)=>{
    return res.json({
        "health" : "runnig"
    })
})




app.post("/chat",async (req,res)=>{
    const reqBody = req.body;

    const prompt = "set up a react js project using vite"


    const userMessage : Array<ModelMessage> = [{ role : 'user', content  : prompt}]

    const result = streamText({
    model: openai('gpt-4o'),
    messages : userMessage,
  });

  const content = await result.content
  console.log(content)
  let finalOutput = ""

  for await (const delta of result.textStream) {
finalOutput += delta
  }
  console.log(finalOutput)

    return res.json({
        "answer" : finalOutput
    })
})


app.listen(3000,()=>{
    console.log("server running")
})

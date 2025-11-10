import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chatRoute.js";
import userRouter from "./routes/userRoute.js";

export const app = express();

app.use(cors());
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.json({ health: "running" });
});

// Chat routes
app.use("/chat", chatRoutes);
app.use("/user",userRouter)

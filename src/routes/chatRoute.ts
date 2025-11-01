import express from "express";
import { chatHandler } from "../controller/chatController.js";

const router = express.Router();

router.post("/", chatHandler);

export default router;

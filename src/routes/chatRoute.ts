import express from "express";
import { projectInitHandler } from "../controller/chatController.js";

const router = express.Router();

router.post("/", projectInitHandler);

export default router;

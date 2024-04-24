import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validation.js";
import { deleteChats, generateChatCompletion, sendChats } from "../controllers/chat-controllers.js";

const chatRoutes = Router();
chatRoutes.post("/new",validate(chatCompletionValidator),verifyToken,generateChatCompletion)
chatRoutes.get("/all",verifyToken,sendChats)
chatRoutes.delete("/delete",verifyToken,deleteChats)

export default chatRoutes;
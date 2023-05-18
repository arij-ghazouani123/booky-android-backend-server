import  express  from "express";
import {
    getAllConversations, getAllMessages, getMyMessages, creerNouvelleConversation, envoyerMessage, deleteConversation, deleteAll, getMyConversations
} from "../controllers/chat.controller.js"


const router = express.Router();


router.get("/", getAllConversations)
router.get("/tout-messages", getAllMessages)
router.post("/my-conversations", getMyConversations)
router.post("/my-messages", getMyMessages)
router.post("/creer-conversation", creerNouvelleConversation)
router.post("/envoyer-message", envoyerMessage)
router.delete("/", deleteConversation)
router.delete("/deleteAll", deleteAll)

export default router;
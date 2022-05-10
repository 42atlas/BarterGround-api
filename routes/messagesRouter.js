import { Router } from "express";
import {
  getAllMessages,
  getMessagesByUser,
  createMessage,
  deleteMessage,
  updateMessageByUser,
} from "../controllers/messages.js";
import verifyToken from "../middlewares/verifyToken.js";

const messagesRouter = Router();

messagesRouter.route("/").get(getAllMessages).post(
  verifyToken,
  /* validateJOI(message), */
  createMessage
);

messagesRouter.route("/:id").delete(verifyToken, deleteMessage);

messagesRouter
  .route("/user/:userId")
  .get(getMessagesByUser)
  .put(updateMessageByUser)
  .delete(verifyToken, deleteMessage);

export default messagesRouter;

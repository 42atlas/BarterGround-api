import { Router } from "express";
import {
  getAllMessages,
  getMessagesByUser,
  createMessage,
  deleteMessage,
} from "../controllers/messages.js";
/* import validateJOI from "../middlewares/validateJOI.js"; */
import verifyToken from "../middlewares/verifyToken.js";
import { message } from "../joi/schemas.js";

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
  .delete(verifyToken, deleteMessage);

export default messagesRouter;

import { Router } from "express";
import {
  getAllMessages,
  getMessagesByUser,
  createMessage,
  deleteMessage,
  updateMessageByUser,
  getMessagesReceivedByUser,
  getMessagesSentByUser,
  updateMessage,
  getSingleMessage,
} from "../controllers/messages.js";
import verifyToken from "../middlewares/verifyToken.js";
import validateJOI from "../middlewares/validateJOI.js";
import { message } from "../joi/schemas.js";

const messagesRouter = Router();

messagesRouter.route("/").get(getAllMessages).post(
  verifyToken,
  /* validateJOI(message), */
  createMessage
);

messagesRouter.route("/:id").delete(verifyToken, deleteMessage).put(
  verifyToken,
  /* validateJOI(message), */
  updateMessage
);

messagesRouter.route("/message/:id").get(getSingleMessage);

messagesRouter
  .route("/received")
  .get(verifyToken, /* validateJOI(offer), */ getMessagesReceivedByUser);

messagesRouter
  .route("/sent")
  .get(verifyToken, /* validateJOI(offer), */ getMessagesSentByUser);

messagesRouter
  .route("/user/:userId")
  .get(getMessagesByUser)
  .put(updateMessageByUser)
  .delete(verifyToken, deleteMessage)
  .post(
    verifyToken,
    /* validateJOI(message), */
    createMessage
  );

export default messagesRouter;

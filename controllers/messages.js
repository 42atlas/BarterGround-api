import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import Message from "../models/Message.js";

export const getAllMessages = asyncHandler(async (req, res, next) => {
  const messages = await Message.find().populate("author");
  res.json(messages);
});

export const getMessagesByUser = asyncHandler(async (req, res, next) => {
  const {
    params: { userId },
  } = req;
  const messages = await Message.find({ author: userId });
  res.json(messages);
});

export const createMessage = asyncHandler(async (req, res) => {
  const {
    body: { title, body },
    user: { _id: author },
  } = req;
  let newMessage = await Message.create({
    body,
    title,
    author,
  });
  newMessage = await newMessage.populate("author");
  res.status(201).json(newMessage);
});

export const deleteMessage = asyncHandler(async (req, res) => {
  const {
    params: { id },
    user: { _id: userId },
  } = req;
  const found = await Message.findById(id);
  await Message.deleteOne({ _id: id });
  res.json({ success: `Message with id of ${id} was deleted` });
});

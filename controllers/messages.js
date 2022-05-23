import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import Message from '../models/Message.js';
import jwt from 'jsonwebtoken';

export const getAllMessages = asyncHandler(async (req, res, next) => {
    const messages = await Message.find().populate('author');
    res.json(messages);
});

export const getMessagesByUser = asyncHandler(async (req, res, next) => {
    const {
        params: { userId },
    } = req;
    const messages = await Message.find({ receiver: userId });
    res.json(messages);
});

export const createMessage = asyncHandler(async (req, res) => {
    const {
        params: { userId },
        body: { title, body },
        user: { _id: author },
    } = req;

    let newMessage = await Message.create({
        body,
        title,
        author,
        receiver: userId,
    });
    newMessage = await newMessage.populate('author');
    res.status(201).json(newMessage);
});

export const updateMessage = asyncHandler(async (req, res) => {
    const {
        params: { id },
        body: { data },
        user: { _id: userId },
    } = req;

    const formattedData = JSON.parse(data);
    // const message = await Message.findOne({ _id: id });
    const updateMessage = await Message.findOneAndUpdate(
        { _id: id },
        {
            body: formattedData.subject,
            //receiver: userId,
        },
        { new: true },
    ).populate('author');
    // console.log('receiver', userId);
    // console.log('author', message.author);
    // console.log('Message receiver', message.receiver);
    // console.log('Message Id', message._id);

    // const updateMessage = await Message.updateOne(
    //     { _id: message._id },
    //     {
    //         body: formattedData.subject,
    //         receiver: userId,
    //         author: message.receiver,
    //     },
    //     { timestamps: true },
    // );
    console.log('updateMessage', updateMessage);
    if (updateMessage?._id) {
        let newMessage;
        const message = await Message.findOne({ author: updateMessage.receiver }).populate('author');
        console.log('message', message);
        if (message?.author) {
            newMessage = await Message.findOneAndUpdate(
                { receiver: updateMessage.receiver },
                {
                    body: updateMessage.body,
                    title: updateMessage.title,
                    author: updateMessage.receiver,
                    receiver: updateMessage.author?._id,
                },
                { new: true },
            ).populate('author');
        } else {
            newMessage = await Message.create({
                body: updateMessage.body,
                title: updateMessage.title,
                author: updateMessage.receiver,
                receiver: updateMessage.author._id,
            });
            console.log({ newMessage });
        }
        return res.json(newMessage);
    }
    return res.status(201).send({ updateMessage });
});

export const deleteMessage = asyncHandler(async (req, res) => {
    const {
        params: { id },
        /* user: { _id: userId }, */
    } = req;
    const found = await Message.findById(id);

    await Message.deleteOne({ _id: id });
    res.json({ success: `Message with id of ${id} was deleted` });
});

export const updateMessageByUser = asyncHandler(async (req, res, next) => {
    const {
        body: { message },
    } = req;
    try {
        await Message.findOneAndUpdate({ _id: message._id }, { title: message.title });
        res.status(201).json({ data: 'message updated successfully' });
    } catch (err) {
        res.status(500).json({ err: 'Something went wrong ' + err });
    }
});

export const getMessagesReceivedByUser = asyncHandler(async (req, res, next) => {
    const { user } = req;
    const messagesByUser = await Message.find({ receiver: user._id }).populate('title', 'body');
    //console.log('messagesByUser', messagesByUser);
    res.json(messagesByUser);
});

export const getMessagesSentByUser = asyncHandler(async (req, res, next) => {
    const { user } = req;
    const messagesByUser = await Message.find({ author: user._id }).populate('title', 'body');
    res.json(messagesByUser);
});

export const getSingleMessage = asyncHandler(async (req, res) => {
    const {
        params: { id },
    } = req;
    const message = await Message.findById(id).populate('author');
    if (!message) throw new ErrorResponse(`Message with id of ${id} doesn't exist`, 404);
    res.send(message);
});

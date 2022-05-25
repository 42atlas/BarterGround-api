import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import Post from "../models/Post.js";
import jwt from "jsonwebtoken";

export const getAllPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find().populate("author");
  res.json(posts);
});

export const retrieveAllPosts = asyncHandler(async (req, res) => {
  const token = req.headers["authorization"];
  const userData = jwt.verify(token, process.env.JWT_SECRET);
  var loggedInUserId = userData._id;
  var emptyArr = [];
  const posts = await Post.find();
  posts.forEach((post) => {
    if (post.author != loggedInUserId && post.isListed === true) {
      emptyArr.push(post);
    }
  });
  res.json(emptyArr);
});

export const getPostsByUser = asyncHandler(async (req, res, next) => {
  const {
    params: { userId },
  } = req;
  const posts = await Post.find({ author: userId });
  res.json(posts);
});

export const createPost = asyncHandler(async (req, res) => {
  const {
    body: { title, body, category, isListed },
    file,
    user: { _id: author },
  } = req;

  if (!file)
    throw new ErrorResponse(`Please upload an image for the item`, 400);
  let newPost = await Post.create({
    body,
    title,
    image: file.publicUrl,
    category,
    author,
    isListed,
  });
  newPost = await newPost.populate("author");
  res.status(201).json(newPost);
});

export const updatePost = asyncHandler(async (req, res) => {
  const {
    body: { title, body, category, isListed },
    file,
    params: { id },
    user: { _id: userId },
  } = req;
  const found = await Post.findById(id);
  if (!found)
    throw new ErrorResponse(`Post with id of ${id} doesn't exist`, 404);
  if (found.author.toString() !== userId.toString())
    throw new ErrorResponse(`Only the owner of the post can edit`, 403);
  const updatedPost = file
    ? await Post.findOneAndUpdate(
        { _id: id },
        {
          title,
          body,
          image: file && file.publicUrl,
          category,
          isListed,
        },
        { new: true }
      ).populate("author")
    : await Post.findOneAndUpdate(
        { _id: id },
        {
          title,
          body,
          category,
          isListed,
        },
        { new: true }
      ).populate("author");
  res.json(updatedPost);
});

export const getSinglePost = asyncHandler(async (req, res) => {
  const {
    params: { id },
  } = req;
  const post = await Post.findById(id).populate("author");
  if (!post)
    throw new ErrorResponse(`Post with id of ${id} doesn't exist`, 404);
  res.send(post);
});

export const deletePost = asyncHandler(async (req, res) => {
  const {
    params: { id },
    user: { _id: userId },
  } = req;
  const found = await Post.findById(id);
  if (!found)
    throw new ErrorResponse(`Post with id of ${id} doesn't exist`, 404);
  if (found.author.toString() !== userId.toString())
    throw new ErrorResponse(`Only the owner of the post can delete`, 403);
  await Post.deleteOne({ _id: id });
  res.json({ success: `Post with id of ${id} was deleted` });
});

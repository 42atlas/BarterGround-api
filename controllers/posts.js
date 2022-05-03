import Post from "../models/Post.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getAllPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find().populate("author");
  res.json(posts);
});

export const createPost = asyncHandler(async (req, res) => {
  const {
    title,
    body,
    image,
    category,
    user: { _id: author },
  } = req;
  let newPost = await Post.create({
    ...body,
    ...title,
    ...image,
    ...category,
    author,
  });
  newPost = await newPost.populate("author");
  res.status(201).json(newPost);
});

export const getSinglePost = asyncHandler(async (req, res) => {
  const {
    params: { id },
  } = req;
  const post = await Post.findById(id);
  if (!post)
    throw new ErrorResponse(`Post with id of ${id} doesn't exist`, 404);
  res.send(post);
});

export const updatePost = asyncHandler(async (req, res) => {
  const {
    title,
    body,
    image,
    category,
    params: { id },
    user: { _id: userId },
  } = req;
  const found = await Post.findById(id);
  if (!found)
    throw new ErrorResponse(`Post with id of ${id} doesn't exist`, 404);
  if (found.author.toString() !== userId.toString())
    throw new ErrorResponse(`Only the owner of the post can edit`, 403);
  const updatedPost = await Post.findOneAndUpdate(
    { _id: id },
    title,
    body,
    image,
    category,
    { new: true }
  );
  res.json(updatedPost);
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
  found.des;
  await Post.deleteOne({ _id: id });
  res.json({ success: `Post with id of ${id} was deleted` });
});

export const listPost = asyncHandler(async (req, res) => {
  const {
    isListed,
    params: { id },
    user: { _id: userId },
  } = req;
  const found = await Post.findById(id);
  if (!found)
    throw new ErrorResponse(`Post with id of ${id} doesn't exist`, 404);
  if (found.author.toString() !== userId.toString())
    throw new ErrorResponse(`Only the owner of the post can list`, 403);
  const listedPost = await Post.findOneAndUpdate({ _id: id }, isListed, {
    new: true,
  });
  res.json(listedPost);
});

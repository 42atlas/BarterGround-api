import {Router} from "express";

import {
  createPost,
  deletePost,
  getAllPosts,
  getSinglePost,
  listPost,
  updatePost,
} from "../controllers/posts.js";
import {post} from "../joi/schemas.js";
import validateJOI from "../middlewares/validateJOI.js";
import verifyToken from "../middlewares/verifyToken.js";

const postsRouter = Router();

postsRouter.route("/")
    .get(getAllPosts)
    .post(verifyToken, validateJOI(post), createPost);

postsRouter.route("/:id")
    .get(getSinglePost)
    .put(verifyToken, validateJOI(post), updatePost, listPost)
    .delete(verifyToken, deletePost);

export default postsRouter;

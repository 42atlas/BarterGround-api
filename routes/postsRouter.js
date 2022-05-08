import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostsByUser,
  getSinglePost,
  retrieveAllPosts,
  updatePost,
} from "../controllers/posts.js";
import validateJOI from "../middlewares/validateJOI.js";
import verifyToken from "../middlewares/verifyToken.js";
import firebaseUploader from "../middlewares/firebaseUploader.js";
import { post } from "../joi/schemas.js";

const postsRouter = Router();

postsRouter
  .route("/")
  .get(getAllPosts)
  .post(
    verifyToken,
    firebaseUploader.single("image"),
    validateJOI(post),
    createPost
  );

postsRouter.route("/all-posts").get(retrieveAllPosts);

postsRouter
  .route("/:id")
  .get(getSinglePost)
  .put(
    verifyToken,
    firebaseUploader.single("image"),
    validateJOI(post),
    updatePost
  )
  .delete(verifyToken, deletePost);

postsRouter.route("/user/:userId").get(getPostsByUser);

export default postsRouter;

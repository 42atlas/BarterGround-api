import { Router } from 'express';
import { createPost, deletePost, getAllPosts, getSinglePost, updatePost } from '../controllers/posts.js';
import validateJOI from '../middlewares/validateJOI.js';
import verifyToken from '../middlewares/verifyToken.js';
import { post } from '../joi/schemas.js';

const postsRouter = Router();

postsRouter.route('/').get(getAllPosts).post(verifyToken, validateJOI(post), createPost);

postsRouter.route('/:id').get(getSinglePost).put(verifyToken, validateJOI(post), updatePost).delete(verifyToken, deletePost);

export default postsRouter;

import { Router } from 'express';
import { getUser, signInUser, signUpUser } from '../controllers/auth.js';
import validateJOI from '../middlewares/validateJOI.js';
import verifyToken from '../middlewares/verifyToken.js';
import { signUp, signIn } from '../joi/schemas.js';

const authRouter = Router();

authRouter.post('/signup', validateJOI(signUp), signUpUser);
authRouter.post('/signin', validateJOI(signIn), signInUser);
authRouter.get('/me', verifyToken, getUser);

export default authRouter;

import express from 'express';
import { authUserMiddleware } from './controllers/AuthenticationControllers/signInUser';
import { getSignedInUser } from './controllers/AuthenticationControllers/getSignedInUser';
import { isUserSignedInMiddleware } from './middlewares/isUserSignedIn';
import { signUpUser } from './controllers/AuthenticationControllers/signUpUser';

const router = express.Router();
router.post('/signin', authUserMiddleware);
router.get('/signin', isUserSignedInMiddleware, getSignedInUser);
router.post('/signup', signUpUser);

export default router;

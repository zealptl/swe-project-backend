import express from 'express';
import { authUserMiddleware } from './controllers/signInUser';
import { getSignedInUserMiddleware } from './controllers/getSignedInUser';
import { isUserSignedInMiddleware } from './middlewares/isUserSignedIn';
import { signUpUserMiddleware } from './controllers/signUpUser';

const router = express.Router();
router.post('/signin', authUserMiddleware);
router.get('/signin', isUserSignedInMiddleware, getSignedInUserMiddleware);
router.post('/signup', signUpUserMiddleware);

export default router;

import express from 'express';
import { authUserMiddleware } from './controllers/AuthenticationControllers/signInUser';
import { getSignedInUserMiddleware } from './controllers/AuthenticationControllers/getSignedInUser';
import { isUserSignedInMiddleware } from './middlewares/isUserSignedIn';
import { signUpUserMiddleware } from './controllers/AuthenticationControllers/signUpUser';

const router = express.Router();
router.post('/signin', authUserMiddleware);
router.get('/signin', isUserSignedInMiddleware, getSignedInUserMiddleware);
router.post('/signup', signUpUserMiddleware);

export default router;

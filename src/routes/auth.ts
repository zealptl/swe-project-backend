import express from 'express';
import { signInUser } from './controllers/AuthenticationControllers/signInUser';
import { isUserSignedInMiddleware } from './middlewares/isUserSignedIn';
import { signUpUser } from './controllers/AuthenticationControllers/signUpUser';
import { getSignedInUser } from './controllers/AuthenticationControllers/getSignedInUser';

const router = express.Router();
router.post('/signin', signInUser);
router.post('/signup', signUpUser);
router.get('/signin', isUserSignedInMiddleware, getSignedInUser);

export default router;

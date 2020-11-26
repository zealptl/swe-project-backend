import express from 'express';
import { signInUser } from './controllers/AuthenticationControllers/signInUser';
// import { getSignedInUser } from './controllers/AuthenticationControllers/getSignedInUser';
import { isUserSignedInMiddleware } from './middlewares/isUserSignedIn';
import { signUpUser } from './controllers/AuthenticationControllers/signUpUser';

const router = express.Router();
router.post('/signin', signInUser);
// router.get('/signin', isUserSignedInMiddleware, getSignedInUser);
router.post('/signup', signUpUser);

export default router;

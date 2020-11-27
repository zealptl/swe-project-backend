import express from 'express';
import { signInUser } from './controllers/AuthenticationControllers/signInUser';
import { signUpUser } from './controllers/AuthenticationControllers/signUpUser';

const router = express.Router();
router.post('/signin', signInUser);
router.post('/signup', signUpUser);

export default router;

import express from 'express';
import { healthMiddleware } from './middlewares/health';

const router = express.Router();
router.get('/', healthMiddleware);

export default router;

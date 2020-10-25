import express from 'express';
import { healthMiddleware } from './controllers/health';

const router = express.Router();
router.get('/', healthMiddleware);

export default router;

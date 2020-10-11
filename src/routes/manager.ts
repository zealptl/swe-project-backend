import express from 'express';
import { approveCustomerMiddleware } from './middlewares/approveCustomer';

const router = express.Router();
router.post('/approve/:customerId', approveCustomerMiddleware);

export default router;

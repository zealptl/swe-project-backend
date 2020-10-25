import express from 'express';
import { approveCustomer } from './controllers/ManagerControllers/approveCustomer';

const router = express.Router();
router.post('/approve/:customerId', approveCustomer);

export default router;

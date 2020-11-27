import express from 'express';
import { createManager } from './controllers/ManagerControllers/createManager';
import { getManager } from './controllers/ManagerControllers/getManager';
import { approveCustomer } from './controllers/ManagerControllers/approveCustomer';

const router = express.Router();
router.post('/', createManager);
router.get('/:managerId', getManager);
router.post('/approve/:customerId', approveCustomer);

export default router;
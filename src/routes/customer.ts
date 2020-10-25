import express from 'express';
import { createCustomerMiddleware } from './controllers/createCustomer';
import { getCustomersMiddleware } from './controllers/getCustomers';
import { getCustomerMiddleware } from './controllers/getCustomer';

const router = express.Router();
router.post('/', createCustomerMiddleware);
router.get('/', getCustomersMiddleware); // get all customers
router.get('/:customerId', getCustomerMiddleware); // get particular customer

export default router;

import express from 'express';
import { createCustomerMiddleware } from './middlewares/createCustomer';
import { getCustomersMiddleware } from './middlewares/getCustomers';
import { getCustomerMiddleware } from './middlewares/getCustomer';

const router = express.Router();
router.post('/', createCustomerMiddleware);
router.get('/', getCustomersMiddleware); // get all customers
router.get('/:customerId', getCustomerMiddleware); // get particular customer

export default router;

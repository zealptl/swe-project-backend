import express from 'express';
import { createCustomer } from './controllers/CustomerControllers/createCustomer';
import { getCustomersMiddleware } from './controllers/ManagerControllers/getCustomers';
import { getCustomerMiddleware } from './controllers/ManagerControllers/getCustomer';

const router = express.Router();
router.post('/', createCustomer);
router.get('/', getCustomersMiddleware); // get all customers
router.get('/:customerId', getCustomerMiddleware); // get particular customer

export default router;

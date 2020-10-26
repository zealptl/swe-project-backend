import express from 'express';
import { createCustomer } from './controllers/CustomerControllers/createCustomer';
import { getCustomers } from './controllers/CustomerControllers/getCustomers';
import { getCustomer } from './controllers/CustomerControllers/getCustomer';

const router = express.Router();
router.post('/', createCustomer);
router.get('/', getCustomers); // get all customers
router.get('/:customerId', getCustomer); // get particular customer

export default router;

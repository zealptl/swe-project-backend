import express from 'express';
import { createCustomer } from './controllers/CustomerControllers/createCustomer';
import { getCustomers } from './controllers/CustomerControllers/getCustomers';
import { getCustomer } from './controllers/CustomerControllers/getCustomer';
import { updateCustomer } from './controllers/CustomerControllers/updateCustomer';
import { deleteCustomer } from './controllers/CustomerControllers/deleteCustomer';

const router = express.Router();
router.post('/', createCustomer);
router.get('/', getCustomers); // get all customers
router.get('/:customerId', getCustomer); // get particular customer
router.patch('/:customerId', updateCustomer); // endpoint to change password
router.delete('/:customerId', deleteCustomer);
export default router;

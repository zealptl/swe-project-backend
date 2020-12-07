import express from 'express';
import { createCustomer } from './controllers/CustomerControllers/createCustomer';
import { getCustomers } from './controllers/CustomerControllers/getCustomers';
import { getCustomer } from './controllers/CustomerControllers/getCustomer';
import { updatePassword } from './controllers/CustomerControllers/updatePassword';
import { addBalance } from './controllers/CustomerControllers/addBalance';
import { deleteCustomer } from './controllers/CustomerControllers/deleteCustomer';

const router = express.Router();
router.post('/', createCustomer);
router.get('/', getCustomers); // get all customers
router.get('/:customerId', getCustomer); // get particular customer
router.patch('/:customerId', updatePassword); // endpoint to change password
router.patch('/balance/:customerId', addBalance); // endpoint to add balance
router.delete('/:customerId', deleteCustomer);
export default router;
